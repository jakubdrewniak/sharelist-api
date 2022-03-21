import express from "express";

const router = express.Router();

router.get("/catalogs", async (req, res) => {
  console.count("get catalogs");
  res.send([
    { name: "item1" },
    { name: "item2" },
    { name: "item3" },
    { name: "item4" },
  ]);
});

export { router as catalogsRouter };
