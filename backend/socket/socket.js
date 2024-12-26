import express from "express";
import { Server } from "socket.io";
import http from "http";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
   cors: {
      origin: "http://localhost:3000", // Ensure that the frontend is allowed to access the backend
      methods: ["GET", "POST"],
   },
});

// recieverId is the userId of the user you want to find the socket.id for.
// userSocketMap is an object where the keys are userIds (the IDs of users) and the values are socket.ids
// (the WebSocket connection IDs associated with those users).
// const userSocketMap = {                 and you do this return userSocketMap["user123"];     //it will return "socketId1"
//    "user123": "socketId1"
// "user456": "socketId2"
// };
export const getRecieverSocketId = (receiverId) => {
   return userSocketMap[receiverId];
};

const userSocketMap = {}; //{userId: socketId}  //to get online user status

io.on("connection", (socket) => {
   console.log("a user connected", socket.id);

   const userId = socket.handshake.query.userId; //Websocket handshaking is a process that occurs when a client and server establish a Websocket connection. Unlike traditional HTTP, which follows a request-response model, Websocket handshaking enables bidirectional communication, allowing both the client and server to send and receive messages asynchronously

   // userSocketMap is used to store the userId and socketId of the connected users
   if (userId !== undefined) userSocketMap[userId] = socket.id; //eg: {userId: socketId, userId2: socketId2}

   //io.emit() is used to send events to all connected clients
   io.emit("getOnlineUsers", Object.keys(userSocketMap));

   //socket.on() is used  to listen to the events . can be used both client and server side
   socket.on("disconnect", () => {
      console.log("a user disconnected", socket.id);
      //once user disconnects remove it from the map
      delete userSocketMap[userId];
      io.emit("getOnlineUsers", Object.keys(userSocketMap));
   });
});

export { app, io, server };
