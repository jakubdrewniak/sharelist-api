import { Router } from "express";
import auth from "../middleware/auth";
import User from "../models/user";
import { Request, Response } from "express";

const router = Router();

router.post("/auth/login", async (req, res) => {
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

router.post("/auth/logout", auth, async (req: Request, res: Response) => {
  const logoutFromAllDevices = req.query["all_devices"] === "true";
  try {
    if (!req.user) throw new Error();

    if (logoutFromAllDevices) {
      req.user.tokens = [];
    } else {
      req.user.tokens = req.user.tokens.filter((token) => {
        return token.token !== req.token;
      });
    }

    await req.user.save();

    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

// router.post("/auth/logoutAll", auth, async (req, res) => {
//   try {
//     if (!req.user) throw new Error();

//     req.user.tokens = [];
//     await req.user.save();
//     res.send();
//   } catch (e) {
//     res.status(500).send();
//   }
// });

export { router as authRouter };
