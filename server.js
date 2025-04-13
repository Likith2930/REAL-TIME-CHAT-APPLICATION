// 1. Import necessary packages
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

// 2. Create an Express app and allow cross-origin requests (important for frontend to connect)
const app = express();
app.use(cors());

// 3. Create an HTTP server and wrap it with Socket.io
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Allow frontend from this origin
    methods: ["GET", "POST"]
  }
});

// 4. When a user connects to the WebSocket...
io.on("connection", (socket) => {
  console.log("A user connected: " + socket.id);

  // When that user sends a chat message...
  socket.on("chat message", (msg) => {
    // Broadcast it to everyone (including sender)
    io.emit("chat message", msg);
  });

  // Handle user disconnect
  socket.on("disconnect", () => {
    console.log("User disconnected: " + socket.id);
  });
});

// 5. Start the server on port 3001
const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
