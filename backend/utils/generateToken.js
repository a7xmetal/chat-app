import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const generateToken = (userId, res) => {
   const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: "15d",
   });

   res.cookie("jwt", token, {
      httpOnly: true, //prevent js access or xss attacks also known as cross-site script attacks
      sameSite: "strict", //prevent cross-site request forgery attacks
      maxAge: 15 * 24 * 60 * 60 * 1000, //MS
      secure: process.env.NODE_ENV === "development",
   });
};

export default generateToken;
