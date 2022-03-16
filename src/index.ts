import express from "express";
import { Server } from "socket.io";
import http from "http";
import path from "path";

const PORT = process.env.PORT || 8000;
const app = express();
const server = http.createServer(app);
const io = new Server(server);

// TO DO: remove, POC only
const publicDirectoryPath = path.join(__dirname, "../../public");
app.use(express.static(publicDirectoryPath));

io.on("connection", (socket) => {
  console.log("New WebSocket connection");

  socket.on("join", (options, callback) => {
    console.log("client joined", options);

    callback();
  });
});

server.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
