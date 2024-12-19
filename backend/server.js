import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";

import connectDB from "./db/db.js";

const app = express();
const PORT = process.env.PORT || 3000;

dotenv.config();

app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
   res.send("Hello World!");
});

app.listen(PORT, () => {
   connectDB();
   console.log("Server started on port 3000");
});
