import { Router } from "express";
import User from "../models/user";
import { Request, Response } from "express";

const router = Router();

router.post("/users", async (req: Request, res: Response) => {
  const user = new User(req.body);

  try {
    await user.save();
    res.status(201).send(user._id);
  } catch (e) {
    res.status(400).send(e);
  }
});

export { router as usersRouter };
