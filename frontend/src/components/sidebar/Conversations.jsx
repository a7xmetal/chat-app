// Importing required components, hooks, and utility functions
import Conversation from "./Conversation"; // Component that displays individual conversations
import useGetConversations from "../../hooks/useGetConversations"; // Custom hook to fetch conversations
import { getRandomEmoji } from "../../utils/emojis"; // Utility function to get a random emoji

// Functional component that represents the Conversations section
const Conversations = () => {
   // Destructuring the result of the useGetConversations hook
   // loading: indicates if conversations are being fetched
   // conversation: contains the list of conversation data
   const { loading, conversation } = useGetConversations();

   // Log the conversation data for debugging
   console.log("conversation is", conversation);

   return (
      // A container div that holds the list of conversations
      <div className="py-2 flex flex-col overflow-auto">
         {/* Mapping through each conversation and rendering a Conversation component */}
         {conversation.map((conversation, idx) => (
            <Conversation
               key={conversation._id} // Unique key for each conversation item
               conversation={conversation} // Passing the current conversation data
               emoji={getRandomEmoji()} // Assigning a random emoji to each conversation
               lastIdx={idx === conversation.length - 1} // Check if it's the last conversation in the list
            />
         ))}

         {/* Loading spinner shown while conversations are being fetched */}
         {loading ? <span className="loading loading-spinner"></span> : null}
      </div>
   );
};

// Exporting the Conversations component as the default export
export default Conversations;
