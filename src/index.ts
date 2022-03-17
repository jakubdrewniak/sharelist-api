import express from "express";
import { Server } from "socket.io";
import http from "http";

const PORT = process.env.PORT || 8000;
const app = express();
const server = http.createServer(app);
const io = new Server(server,
  {
    cors: {
      origin: "http://localhost:4200",
      methods: ["GET", "POST"]
    }
  }
  );

io.on("connection", (socket) => {
  console.count("New WebSocket connection");

  socket.on("join", (options, callback) => {
    console.log("client joined", options);

    socket.emit('message', {msg: 'Hello! This is first messahe from server!'})

    callback();
  });
});

server.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
