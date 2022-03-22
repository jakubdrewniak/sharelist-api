import { Router } from "express";
import { Catalog } from "../models/catalog";

const router = Router();

router.get("/catalogs", async (req, res) => {
  const catalogs = await Catalog.find()
  return res.send(catalogs)
});

export { router as catalogsRouter };
