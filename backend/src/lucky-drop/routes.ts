import { HifiUser } from "backend/models/HifiUser";
import express from "express";
import { gameData, playGame } from "./logic";

const luckyDropRouter = express.Router();

luckyDropRouter.get("/", async (req, res) => {
  if (gameData !== null) return res.status(200).json(gameData);
  return res.status(404).json("Missing required game structure data.");
});

luckyDropRouter.post("/play", async (req, res) => {
  const { userId, startPoint } = req.body;

  if (!userId) return res.status(400).json({ error: "Missing userId" });
  if (startPoint === undefined || startPoint === null) {
    return res.status(400).json({ error: "Missing start position" });
  }

  try {
    const user = await HifiUser.findByPk(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // TODO: Replace 100 with actual bet amount
    const playResult = playGame(startPoint, 100);

    return res.json({ playResult });
  } catch (err) {
    console.error(err);
    if (err instanceof Error && err.message.includes("Invalid start point")) {
      return res.status(400).json({ error: err.message });
    }
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default luckyDropRouter;
