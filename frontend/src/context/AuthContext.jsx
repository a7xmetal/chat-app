import { createContext, useState, useContext } from "react";
export const AuthContext = createContext();

export const useAuthContext = () => {
   return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
   const [authUser, setAuthUser] = useState(
      JSON.parse(localStorage.getItem("chat-user")) || null //json parse to change string value to obj
   );
   return (
      <AuthContext.Provider value={{ authUser, setAuthUser }}>
         {children}
      </AuthContext.Provider>
   );
};
