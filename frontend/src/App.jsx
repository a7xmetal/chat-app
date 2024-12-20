import React from "react";
import SignUp from "./pages/signup/SignUp";
import "./index.css";
import Home from "./pages/home/Home";

const App = () => {
   return (
      <div className="p-4 h-screen flex justify-center items-center">
         {/* <Login /> */}
         {/* <SignUp /> */}
         <Home />
      </div>
   );
};

export default App;
