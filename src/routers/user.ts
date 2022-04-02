import { Router } from "express";
import { User } from "../models/user";

const router = Router();

router.post("/users", async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        res.status(201).send(user._id)
    } catch (e) {
        res.status(400).send(e)
    }
})

export { router as usersRouter };