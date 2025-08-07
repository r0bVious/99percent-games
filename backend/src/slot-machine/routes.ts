import { GameUser } from "backend/models/User";
import express from "express";
import { spinSlotMachine, reels } from "./logic";

const slotMachineRouter = express.Router();

slotMachineRouter.get("/", async (req, res) => {
  if (reels !== null) return res.status(200).json({ reels });
  return res.status(404).json("Missing required game structure data.");
});

slotMachineRouter.post("/spin", async (req, res) => {
  const userId = req.body.userId;
  if (!userId) return res.status(400).json({ error: "Missing userId" });

  try {
    const user = await GameUser.findByPk(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const spinResult = spinSlotMachine(user.points);
    user.points += spinResult.netChange;
    await user.save();

    return res.json(spinResult);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default slotMachineRouter;
