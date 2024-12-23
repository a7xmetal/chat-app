import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";

import connectDB from "./db/db.js";

const app = express();
const PORT = process.env.PORT || 5050;

dotenv.config();

// const corsOptions = {
//    origin: "http://localhost:3000", // Ensure that the frontend is allowed to access the backend
//    methods: ["GET", "POST", "PUT", "DELETE"],
//    allowedHeaders: ["Content-Type", "Authorization"],
//    credentials: true, // This allows cookies to be sent if needed
// };

// app.use(cors(corsOptions));

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
   console.log(`Server is running on port ${PORT}`);
});
