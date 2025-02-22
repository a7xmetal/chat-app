// import useConversation from "../../zustand/useConversation";
// import { useAuthContext } from "../../context/AuthContext";
// import { extractTime } from "../../utils/extractTime";
// import useListenMessages from "../../hooks/useListenMessages";

// export const Message = ({ message }) => {
//    const { authUser } = useAuthContext(); // Access the useAuthContext hook
//    const { selectedConversation } = useConversation(); //from zustand

//    const fromMe = message.senderId === authUser._id;
//    const chatClassName = fromMe ? "chat-end" : "chat-start";
//    const profilePic = fromMe
//       ? authUser.profilePic
//       : selectedConversation?.profilePic;

//    const bubbleBgColor = fromMe ? "bg-blue-500" : "";
//    const formattedTime = extractTime(message.createdAt);
//    return (
//       <div className={`chat ${chatClassName}`}>
//          <div className="chat-image avatar">
//             <div className="w-10 rounded-full">
//                <img alt="Tailwind CSS chat bubble component" src={profilePic} />
//             </div>
//          </div>
//          <div className={`chat-bubble text-white ${bubbleBgColor}`}>
//             {message.message}
//          </div>
//          <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
//             {formattedTime}
//          </div>
//       </div>
//    );
// };

import useConversation from "../../zustand/useConversation";
import { useAuthContext } from "../../context/AuthContext";
import { extractTime } from "../../utils/extractTime";
import useListenMessages from "../../hooks/useListenMessages";

export const Message = ({ message }) => {
   const { authUser } = useAuthContext(); // Access the useAuthContext hook
   const { selectedConversation } = useConversation(); //from zustand

   const fromMe = message.senderId === authUser._id;
   const chatClassName = fromMe ? "chat-end" : "chat-start";
   const profilePic = fromMe
      ? authUser.profilePic
      : selectedConversation?.profilePic || "defaultProfilePicUrl"; // Fallback for missing profile picture

   const bubbleBgColor = fromMe ? "bg-blue-500" : "";
   const formattedTime = extractTime(message.createdAt) || "Unknown time"; // Fallback for time

   return (
      <div className={`chat ${chatClassName}`}>
         <div className="chat-image avatar">
            <div className="w-10 rounded-full">
               <img alt="User Avatar" src={profilePic} />
            </div>
         </div>
         <div className={`chat-bubble text-white ${bubbleBgColor}`}>
            {message.message || "No message content"}{" "}
            {/* Fallback for empty message */}
         </div>
         <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
            {formattedTime}
         </div>
      </div>
   );
};
