import { IoSearchSharp } from "react-icons/io5";
import { useState } from "react";
import useConversation from "../../zustand/useConversation";
import useGetConversations from "../../hooks/useGetConversations";
import toast from "react-hot-toast";

const SearchInput = () => {
   const [search, setSearch] = useState("");
   const { setSelectedConversation } = useConversation(); //zustand
   const { conversation } = useGetConversations();
   const handleSubmit = (e) => {
      e.preventDefault();
      if (!search) return;
      if (search < 3)
         return toast.error("Search must be at least 3 characters long.");

      const convo = conversation.find((c) =>
         c.fullName.toLowerCase().includes(search.toLowerCase())
      );
      if (convo) {
         setSelectedConversation(convo);
         setSearch("");
      } else toast.error("No conversation found.");
   };
   return (
      <form className="flex items-center gap-2" onSubmit={handleSubmit}>
         <input
            type="text"
            placeholder="Search…"
            className="input input-bordered rounded-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
         />
         <button type="submit" className="btn btn-circle bg-sky-500 text-white">
            <IoSearchSharp className="w-6 h-6 outline-none" />
         </button>
      </form>
   );
};
export default SearchInput;
