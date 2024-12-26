import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getRecieverSocketId, io } from "../socket/socket.js";
export const sendMessage = async (req, res) => {
   try {
      const { message } = req.body;
      const { id: receiverId } = req.params;
      const senderId = req.user._id; // Extract the sender ID from the protected route i.e we written there req.user = user

      // Check if a conversation already exists between the sender and receiver
      // We perform this check to avoid creating duplicate conversation threads between the same users
      // If a conversation exists, we will reuse it for the new message, otherwise, we will create a new conversation.
      let conversation = await Conversation.findOne({
         participants: { $all: [senderId, receiverId] }, // Ensure both senderId and receiverId are in the participants array of an existing conversation
      });

      // If no conversation is found (conversation is null or undefined), it means this is the first interaction between the two users
      if (!conversation) {
         // No conversation exists between the sender and receiver, so we create a new conversation
         conversation = await Conversation.create({
            participants: [senderId, receiverId], // Add sender and receiver as the only participants of the new conversation
         });
      }

      // Create a new message in the database with the provided sender, receiver, and message content
      // This is necessary to persist the message so that it can be stored and later retrieved for display or processing
      const newMessage = new Message({
         senderId,
         receiverId,
         message,
      });

      // After the new message is successfully created, we need to associate it with the conversation
      // This is important because we want to keep track of all messages exchanged in the conversation
      if (newMessage) {
         // Add the new message's _id to the conversation's 'messages' array
         // This links the message to the conversation, ensuring the conversation stores all the messages it contains
         conversation.messages.push(newMessage._id);
      }

      // Save the updated conversation in the database
      //   await conversation.save();
      //   await newMessage.save();

      //this will run in parallel
      await Promise.all([conversation.save(), newMessage.save()]);

      //socket to funcality to send message to the user
      const receiverSocketId = getRecieverSocketId(receiverId); //calling this function that we created in socket.js
      if (receiverSocketId) {
         //io.to is used to send message to a specific user
         io.to(receiverSocketId).emit("newMessage", newMessage); //this will send the message to the receiver
         //now its done now catch this message in the frontend
      }

      res.status(200).json(newMessage);
   } catch (error) {
      console.log("error in sendMessage controller", error.message);
      res.status(500).json({ message: error.message });
   }
};

export const getMessage = async (req, res) => {
   try {
      const { id: userToChatId } = req.params;
      const senderId = req.user._id;

      const conversation = await Conversation.findOne({
         participants: { $all: [senderId, userToChatId] }, // Ensure both senderId and receiverId are in the participants array of an existing conversation
      }).populate("messages"); // Populate with this we can get the messages of the conversation and not just the id

      if (!conversation) {
         return res.status(404).json([]);
      }

      res.status(200).json(conversation.messages);
   } catch (error) {
      console.log("error in getMessages controller", error.message);
      res.status(500).json({ message: error.message });
   }
};
