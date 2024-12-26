import { create } from "zustand";

const useConversation = create((set) => ({
   selectedConversation: null,
   setSelectedConversation: (selectedConversation) =>
      set({ selectedConversation }),
   messages: [],
   setMessages: (msg) => {
      console.log("New messages:", msg); // Logs the new messages
      set({ msg }); // Updates the messages state
   },
}));

export default useConversation;
