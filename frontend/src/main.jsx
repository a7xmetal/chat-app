import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import { SocketContextProvider } from "./context/SocketContext.jsx";

createRoot(document.getElementById("root")).render(
   <StrictMode>
      <BrowserRouter>
         <AuthContextProvider>
            <SocketContextProvider>
               <App />
            </SocketContextProvider>
         </AuthContextProvider>
      </BrowserRouter>
   </StrictMode>
);
