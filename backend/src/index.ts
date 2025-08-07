import express from "express";
import * as dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import { sequelize } from "../models/index";
import { HifiUser } from "../models/HifiUser";
import rouletteRouter from "./roulette/routes";
import slotMachineRouter from "./slot-machine/routes";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Missing credentials." });
  }

  try {
    const user = await HifiUser.findOne({
      where: { memberId: username },
    });
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    if (user.memberPass !== password) {
      return res.status(401).json({ error: "Incorrect password." });
    }

    const { userPass, ...safeUser } = user.get({ plain: true });

    return res.status(200).json(safeUser);
  } catch (error) {
    console.error("Error logging in:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
});

app.use("/roulette", rouletteRouter);
app.use("/slotmachine", slotMachineRouter);
//add more routers for games

const PORT = process.env.PORT || 3000;

HifiUser.initModel(sequelize);

app.listen(PORT, () => {
  console.log("Server listening on port:", PORT);
});
