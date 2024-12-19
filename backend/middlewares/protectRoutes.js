import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const protectRoutes = async (req, res, next) => {
   try {
      const token = req.cookies.jwt;
      if (!token) return res.status(401).json({ message: "Not authorized" });

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (!decoded) return res.status(401).json({ message: "Invalid token" });

      // Find the user in the database by their ID from the decoded JWT token.
      // The '.select("-password")' ensures the user's password is not included in the response for security reasons.
      // Store the found user (without the password) in the 'req.user' so it can be used in the next route or middleware.
      const user = await User.findById(decoded.userId).select("-password");

      if (!user) return res.status(401).json({ message: "User not found" });

      req.user = user;

      next();
   } catch (error) {
      console.log("error in protectRoutes middleware", error.message);
      res.status(401).json({ message: "Not authorized" });
   }
};

// decoded only contains the data from the JWT (typically the userId and possibly a few other details), but it doesn’t include
// the full user data stored in the database.
// User.findById(decoded.userId) is used to retrieve the full user document from the database based on the userId
// (extracted from the decoded JWT), so you can access all the details about the user, excluding sensitive data like the passwor

export default protectRoutes;
