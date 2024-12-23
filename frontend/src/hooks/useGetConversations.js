import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const useGetConversations = () => {
   const [loading, setLoading] = useState(false);
   const [conversation, setConversation] = useState([]);

   useEffect(() => {
      async function getConversations() {
         const res = await fetch("/api/users");
         const data = await res.json();

         if (data.error) {
            throw new Error(data.message);
         }

         setConversation(data);
         console.log("data is", data);

         setLoading(true);
         try {
         } catch (error) {
            toast.error(error.message);
         } finally {
            setLoading(false);
         }
      }
      getConversations();
   }, []);

   return { loading, conversation };
};

export default useGetConversations;
