import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
import path from "path";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";

import connectDB from "./db/db.js";

import { app, server } from "./socket/socket.js";

const PORT = process.env.PORT || 5050;

const __dirname = path.resolve(); //returns the absolute path of the current directory

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

app.use(express.static(path.join(__dirname, "/frontend/dist")));

// Serve the index.html file for all routes not defined above (SPA routing)
// This allows client-side JavaScript to handle rendering for routes like /home, /about, etc.
app.get("*", (req, res) => {
   res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

app.get("/", (req, res) => {
   res.send("Hello World!");
});

server.listen(PORT, () => {
   connectDB();
   console.log(`Server is running on port ${PORT}`);
});
