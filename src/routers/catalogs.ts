import { Router } from "express";
import auth from "../middleware/auth";
import Catalog from "../models/catalog";

const router = Router();

router.get("/catalogs", auth, async (req, res) => {
  if (!req.user) throw new Error();

  try {
    await req.user.populate({
      path: "catalogs",
    });
    res.send(req.user.catalogs);
  } catch (e) {
    res.status(500).send();
  }
});

router.post("/catalogs", auth, async (req, res) => {
  if (!req.user) throw new Error();

  const catalog = new Catalog({ ...req.body, creator: req.user._id });

  try {
    await catalog.save();
    res.status(201).send(catalog._id);
  } catch (e) {
    res.status(400).send(e);
  }
});

export { router as catalogsRouter };
