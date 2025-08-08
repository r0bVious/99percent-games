import { HifiUser } from "backend/models/HifiUser";
import express from "express";
import { playGame, gameData } from "./logic";

const slotMachineRouter = express.Router();

slotMachineRouter.get("/", async (req, res) => {
  if (gameData !== null) return res.status(200).json(gameData);
  return res.status(404).json("Missing required game structure data.");
});

slotMachineRouter.post("/play", async (req, res) => {
  const userId = req.body.userId;
  if (!userId) return res.status(400).json({ error: "Missing userId" });

  try {
    const user = await HifiUser.findByPk(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    //TODO - placeholder 100 value
    const playResult = playGame(100);
    const newPointTotal = user.point + playResult.netChange;
    user.point = newPointTotal;
    await user.save();

    return res.json({ playResult, newPointTotal });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default slotMachineRouter;
