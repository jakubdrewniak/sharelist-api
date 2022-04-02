import { Router } from "express";
import Catalog from "../models/catalog";

const router = Router();

router.get("/catalogs", async (req, res) => {
  const catalogs = await Catalog.find();
  return res.send(catalogs);
});

router.post("/catalogs", async (req, res) => {
  const catalog = new Catalog({ ...req.body });

  try {
    await catalog.save();
    res.status(201).send(catalog._id);
  } catch (e) {
    res.status(400).send(e);
  }
});

export { router as catalogsRouter };
