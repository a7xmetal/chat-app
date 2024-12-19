import User from "../models/user.model.js";
export const getUserForSidebar = async (req, res) => {
   try {
      const loggedInUser = req.user._id;

      // it says find every user from our db except loggedInUser
      const filterUser = await User.find({ _id: { $ne: loggedInUser } }).select(
         "-password"
      );
      res.status(200).json(filterUser);
   } catch (error) {
      console.error("Error getting user for sidebar:", error);
      res.status(500).json({ message: "Error getting user for sidebar" });
   }
};
