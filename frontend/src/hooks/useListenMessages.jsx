import { useEffect } from "react";

import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";

import notificationSound from "../assets/notification.mp3";

const useListenMessages = () => {
   const { socket } = useSocketContext();
   const { messages, setMessages } = useConversation();

   useEffect(() => {
      // Listen for 'newMessage' event from the server
      // When received, update the messages state with the new message
      socket?.on("newMessage", (newMessage) => {
         const sound = new Audio(notificationSound); // Create a new audio element to play the notification sound
         sound.play();
         // setMessages((prevMessages) => [...prevMessages, newMessage]);
         setMessages([...messages, newMessage]);
      });

      // Cleanup function: runs when the component is unmounted
      return () => socket.off("newMessage"); // Remove the event listener
   }, [socket, setMessages, messages]);
};

export default useListenMessages;
