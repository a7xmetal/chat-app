import { create } from "zustand";

const useConversation = create((set) => ({
   selectedConversation: null,
   setSelectedConversation: (selectedConversation) =>
      set({ selectedConversation }),
   messages: [],
   setMessages: (messages) => {
      console.log("New messages:", messages); // Logs the new messages
      set({ messages }); // Updates the messages state
   },
}));

export default useConversation;
