import { Router } from "express";
import User from "../models/user";

const router = Router();

router.post("/users", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    res.status(201).send(user._id);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.send({ _id: user._id, token });
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

export { router as usersRouter };
