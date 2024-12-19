import User from "../models/user.model.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";

const signup = async (req, res) => {
   const { fullName, username, password, confirmPassword, gender } = req.body;

   try {
      if (password !== confirmPassword) {
         return res.status(400).json({ message: "Passwords do not match" });
      }
      const user = await User.findOne({ username });
      if (user) {
         return res.status(400).json({ message: "Username already exists" });
      }

      //https://avatar-placeholder.iran.liara.run/document
      const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
      const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

      const newUser = new User({
         fullName,
         username,
         password,
         //  confirmPassword,
         gender,
         profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
      });

      if (newUser) {
         //generate token
         generateTokenAndSetCookie(newUser._id, res);

         await newUser.save();

         res.status(201).json({
            _id: newUser._id,
            fullName: newUser.fullName,
            username: newUser.username,
            profilePic: newUser.profilePic,
         });
      } else {
         res.status(400).json({ message: "User not created" });
      }
   } catch (error) {
      console.log("error in signup controller", error);
      res.status(500).json({ message: error.message });
   }
};

const login = async (req, res) => {
   const { username, password } = req.body;
   const user = await User.findOne({ username });

   if (!user) return res.status(400).json({ message: "User not found" });

   const isPasswordCorrect = await user.comparePassword(password);
   if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" });

   //generate token
   generateTokenAndSetCookie(user._id, res);

   res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      username: user.username,
      profilePic: user.profilePic,
   });
};

const logout = async (req, res) => {
   try {
      // res.clearCookie("jwt");
      res.cookie("jwt", "", { maxAge: 0 });
      res.status(200).json({ message: "Logout successful" });
   } catch (error) {
      console.log("error in logout controller", error.message);
      res.status(500).json({ message: error.message });
   }
};

export { signup, login, logout };
