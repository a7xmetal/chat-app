import toast from "react-hot-toast";
import useConversation from "../zustand/useConversation";
import { useEffect, useState } from "react";
const useGetMessage = () => {
   const [loading, setLoading] = useState(false);
   const { messages, setMessages, selectedConversation } = useConversation(); //from zustand

   useEffect(() => {
      async function getMessages() {
         setLoading(true);

         try {
            const res = await fetch(
               `/api/messages/${selectedConversation._id}`
            );
            const data = await res.json();

            if (data.error) {
               throw new Error(data.error);
            }

            setMessages(data);
         } catch (error) {
            toast.error(error.message);
            setMessages([]); // Reset messages on error
         } finally {
            setLoading(false);
         }
      }
      if (selectedConversation && selectedConversation._id) {
         getMessages();
      } else {
         setMessages([]); // Reset messages when no conversation is selected
      }
   }, [selectedConversation._id, setMessages]);
   // return { loading, messages };
   return { loading, messages: messages || [] }; // Ensure messages is always an array
};

export default useGetMessage;
