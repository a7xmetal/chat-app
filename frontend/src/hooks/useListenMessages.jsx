import { useEffect } from "react";

import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";

const useListenMessages = () => {
   const { socket } = useSocketContext();
   const { messages, setMessages } = useConversation();

   useEffect(() => {
      // Listen for 'newMessage' event from the server
      // When received, update the messages state with the new message
      socket?.on("newMessage", (newMessage) => {
         console.log("newMessage", newMessage);
         setMessages((prevMessages) => [...prevMessages, newMessage]);
      });

      // Cleanup function: runs when the component is unmounted
      return () => socket.off("newMessage"); // Remove the event listener
   }, [socket, setMessages, messages]);
};

export default useListenMessages;
