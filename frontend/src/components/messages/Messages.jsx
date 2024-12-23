import { Message } from "./Message";
import useGetMessage from "../../hooks/useGetMessage";
import MessageSkeleton from "../skeleton/MessageSkeleton";
import { useEffect, useRef } from "react";
import { set } from "mongoose";

const Messages = () => {
   const { loading, messages } = useGetMessage();

   const lastMessageRef = useRef();
   useEffect(() => {
      setTimeout(() => {
         lastMessageRef.current?.scrollIntoView({ behavior: "smooth" }); //to scroll to the last message
      }, [messages]);
   });
   return (
      //overflow coz if msg over flows you will have scroll bar
      <div className="px-4 flex-1 overflow-auto">
         {!loading &&
            messages.length > 0 &&
            messages.map((message) => (
               <div key={message._id} ref={lastMessageRef}>
                  <Message message={message} />
               </div>
            ))}
         {loading &&
            //to get three loading skeletons

            [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}{" "}
         {!loading && messages.length === 0 && (
            <p className="text-center">
               Send a message to start the conversation
            </p>
         )}
      </div>
   );
};
export default Messages;
