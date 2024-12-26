// Importing necessary modules
import { createContext, useContext } from "react";
import { io } from "socket.io-client";
import { useState, useEffect } from "react";
import { useAuthContext } from "./AuthContext";

// Create a SocketContext to manage the WebSocket connection across the app
export const SocketContext = createContext();

// Custom hook to easily access the SocketContext in any component
export const useSocketContext = () => {
   return useContext(SocketContext); // Returns the context value (socket and online users)
};

// SocketContextProvider is a component that manages the WebSocket connection
export const SocketContextProvider = ({ children }) => {
   const [socket, setSocket] = useState(null); // State to hold the socket object
   const [onlineUsers, setOnlineUsers] = useState([]); // State to store the list of online users
   const { authUser } = useAuthContext(); // Accessing authenticated user info from AuthContext

   // useEffect hook runs when the authUser changes
   useEffect(() => {
      // If the user is authenticated (authUser is truthy)
      if (authUser) {
         // Establish a new socket connection to the server with the user's ID as a query parameter
         const socket = io("http://localhost:5050", {
            // it's used to establish a connection with the Socket.IO server.
            query: {
               //The query object allows you to send query parameters when establishing the WebSocket connection.
               // In this case, you're passing userId as a query parameter. This userId is taken from the authUser._id, which means you're sending
               // the ID of the currently authenticated user to the server when the socket is created.
               userId: authUser._id, // Pass the user's ID to the server for identification
            },
         });

         // Update the socket state to hold the created socket instance
         setSocket(socket);

         // Listen for 'getOnlineUsers' event from the server
         // When received, update the onlineUsers state with the list of users
         socket.on("getOnlineUsers", (users) => {
            setOnlineUsers(users);
         });

         // Cleanup function: runs when the component is unmounted or authUser changes
         return () => {
            socket.close(); // Close the socket connection
         };
      } else {
         // If no authenticated user (authUser is falsy), close the existing socket connection if any
         if (socket) {
            socket.close(); // Close the socket connection
            setSocket(null); // Reset the socket state
         }
      }
   }, [authUser]); // Re-run this effect when authUser changes

   // Provide the socket and onlineUsers states to the components that consume this context
   return (
      <SocketContext.Provider value={{ socket, onlineUsers }}>
         {children} {/* Render any children inside the provider */}
      </SocketContext.Provider>
   );
};
