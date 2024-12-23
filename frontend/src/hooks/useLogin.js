import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useLogin = () => {
   const [loading, setLoading] = useState(false);
   const { setAuthUser } = useAuthContext();

   const login = async (username, password) => {
      const success = handleInputErrors(username, password);
      if (!success) return; // Prevent login if fields are empty

      setLoading(true);
      try {
         // Send login request
         const res = await fetch("/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
         });

         // If response status is not OK, handle it
         if (!res.ok) {
            const data = await res.json(); // Parse the error response
            throw new Error(data.message || "Login failed"); // Show the error message from the response
         }

         // Parse the successful response
         const data = await res.json();

         // Store user data in localStorage
         localStorage.setItem("chat-user", JSON.stringify(data));

         // Update the Auth Context
         setAuthUser(data);
      } catch (error) {
         toast.error(error.message); // Show error message to the user
      } finally {
         setLoading(false); // Disable the loading spinner
      }
   };

   return { loading, login };
};

// Input validation
function handleInputErrors(username, password) {
   if (!username || !password) {
      toast.error("Please fill in all fields");
      return false;
   }
   return true;
}

export default useLogin;
