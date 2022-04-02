import { Server } from "socket.io";
import Catalog from "./models/catalog";
import http from "http";

function initWebsocket(server: http.Server) {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:4200",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    socket.on("join", async (options, callback) => {
      if (!options._id) {
        callback("_id is required!");
      }

      await socket.join(options._id);

      const catalog = await Catalog.findById(options._id);
      io.to(options._id).emit("catalog", catalog);
    });

    socket.on("updateProducts", async (options, callback) => {
      if (!options._id) {
        return callback("_id is required!");
      }
      try {
        const catalog = await Catalog.findById(options._id);
        if (!catalog) {
          return callback("Can't find catalog!");
        }
        catalog.products = [...options.products];
        await catalog.save();

        io.to(options._id).emit("catalog", catalog);
        callback();
      } catch (e) {
        callback("Unexpected problem with products update");
      }
    });
  });
}

export { initWebsocket };
