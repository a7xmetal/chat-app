import React from "react";
import SignUp from "./pages/signup/SignUp";
import "./index.css";
import Home from "./pages/home/Home";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login/Login";
import { Toaster } from "react-hot-toast";
import { AuthContext, useAuthContext } from "./context/AuthContext";

const App = () => {
   const { authUser } = useAuthContext();
   return (
      <div className="p-4 h-screen flex justify-center items-center">
         {/* <Login /> */}
         {/* <SignUp /> */}
         {/* <Home /> */}
         <Routes>
            <Route
               path="/"
               element={authUser ? <Home /> : <Navigate to="/login" />}
            />
            <Route
               path="/signup"
               element={authUser ? <Navigate to="/" /> : <SignUp />}
            />
            <Route
               path="/login"
               element={authUser ? <Navigate to="/" /> : <Login />}
            />
         </Routes>
         <Toaster />
      </div>
   );
};

export default App;
