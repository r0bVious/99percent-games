import express from "express";
import * as dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import { sequelize } from "../models/index";
import { GameUser } from "../models/User";
import rouletteRouter from "./roulette/routes";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/login", async (req, res) => {
  const userId = req.body.userId;
  if (userId) {
    try {
      const user = await GameUser.findByPk(userId);
      if (user) return res.status(200).json(user);
    } catch (error) {
      console.log("Error logging in:", error);
      return res.status(404).json("Error logging in.");
    }
  }
});

app.use("/roulette", rouletteRouter);
//add more routers for games

const PORT = process.env.PORT || 3000;

GameUser.initModel(sequelize);

app.listen(PORT, () => {
  console.log("Server listening on port:", PORT);
});
