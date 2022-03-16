"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const socket_io_1 = require("socket.io");
const http_1 = __importDefault(require("http"));
const path_1 = __importDefault(require("path"));
const PORT = process.env.PORT || 8000;
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server);
// TO DO: remove, POC only
const publicDirectoryPath = path_1.default.join(__dirname, "../../public");
app.use(express_1.default.static(publicDirectoryPath));
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
