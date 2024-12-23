import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
// Custom hook for handling user signup logic
const useSignup = () => {
   // State to manage the loading status (whether the signup process is in progress)
   const [loading, setLoading] = useState(false);
   const { setAuthUser } = useAuthContext(); //from AuthContext.jsx file

   // The signup function that handles the user registration process
   const signup = async ({
      fullName,
      username,
      password,
      confirmPassword,
      gender,
   }) => {
      // Validate input values using the handleInputErrors function
      const success = handleInputErrors({
         fullName,
         username,
         password,
         confirmPassword,
         gender,
      });

      // If input validation fails, return early and don't proceed with the signup request
      if (!success) return;

      // Set loading state to true to indicate that the signup request is in progress
      setLoading(true);

      try {
         // Send a POST request to the backend API with the signup data
         const res = await fetch("/api/auth/signup", {
            method: "POST", // HTTP method for creating a new resource
            headers: {
               "Content-Type": "application/json", // Ensure the body is JSON
            },
            // Send the signup data as a JSON string in the request body
            body: JSON.stringify({
               fullName,
               username,
               password,
               confirmPassword,
               gender,
            }),
         });

         // Parse the response from the server
         const data = await res.json();

         if (data.error) {
            throw new Error(data.error);
         }
         //localstorage
         localStorage.setItem("chat-app", JSON.stringify(data));

         setAuthUser(data);
         // console.log(data);

         // Handle the server response (you could add additional logic here)
         // For example, show success toast if needed or navigate to a different page
      } catch (error) {
         // If an error occurs during the request, show an error message using toast
         toast.error(error.message); // Assumes you have a toast notification setup
      } finally {
         // Set loading state to false once the request is complete (success or failure)
         setLoading(false);
      }
   };

   // Return the signup function and loading state so they can be used in components
   return { signup, loading };
};

export default useSignup;

// Helper function to handle input validation logic
const handleInputErrors = ({
   fullName,
   username,
   password,
   confirmPassword,
   gender,
}) => {
   // Check if any of the required fields are empty
   if (!fullName || !username || !password || !confirmPassword || !gender) {
      toast.error("All fields are required");
      return false; // Return false if any field is missing
   }

   // Check if the password and confirmPassword match
   if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return false; // Return false if passwords don't match
   }

   // Check if the password is at least 6 characters long
   if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return false; // Return false if password is too short
   }

   // If all validation checks pass, return true to indicate valid input
   return true;
};
