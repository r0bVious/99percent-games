import { HifiUser } from "backend/models/HifiUser";
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
    const user = await HifiUser.findByPk(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    //TODO - placeholder 100 value
    const spinResult = spinSlotMachine(100);
    const newPointTotal = user.point + spinResult.netChange;
    user.point = newPointTotal;
    await user.save();

    return res.json({ spinResult, newPointTotal });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default slotMachineRouter;
