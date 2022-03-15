import express from "express";
import { Request, Response } from "express";

const app = express();
const PORT = 8000;

app.get("/", (req: Request, res: Response) => res.send("Express Server + TypeScript"));
app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
