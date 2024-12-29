import toast from "react-hot-toast";
import useConversation from "../zustand/useConversation";
import { useEffect, useState } from "react";
const useGetMessage = () => {
   const [loading, setLoading] = useState(false);
   const { messages, setMessages, selectedConversation } = useConversation(); //from zustand

   useEffect(() => {
      const getMessages = async () => {
         setLoading(true);

         try {
            const res = await fetch(
               `/api/messages/${selectedConversation._id}`
            );
            const data = await res.json();

            if (data.error) throw new Error(data.error);

            setMessages(data);

            // setMessages(data);
         } catch (error) {
            toast.error(error.message);
         } finally {
            setLoading(false);
         }
      };
      if (selectedConversation?._id) getMessages();
   }, [selectedConversation?._id, setMessages]);
   // return { loading, messages };
   return { loading, messages }; // Ensure messages is always an array
};

export default useGetMessage;
