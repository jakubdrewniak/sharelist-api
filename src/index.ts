import "dotenv/config";
import express from "express";
import http from "http";
import cors from "cors";
import { catalogsRouter } from "./routers/catalogs";
import { connectToDB } from "./db/mongoose";
import { initWebsocket } from "./websocket";

const PORT = process.env.PORT || 8000;
const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:4200",
    optionsSuccessStatus: 200,
  })
);
app.use(catalogsRouter);

initWebsocket(server);

connectToDB().then(() => {
  server.listen(PORT, async () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
  });
});
