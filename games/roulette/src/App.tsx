import api from "@utils/api";
import { useEffect, useState } from "react";
import GameWheel from "./components/GameWheel";
import { usePlayer } from "@shared/PlayerContext";

export interface Segment {
  label: string;
  multiplier: number;
}

export default function App() {
  const { player, playerPoints } = usePlayer();
  const [wheelData, setWheelData] = useState<Segment[]>([]);
  const spin = async (userId: number) => {
    try {
      const res = await api.post("/roulette/spin", {
        userId,
      });
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSpin = () => {
    // spin(player?.userId);
    spin(1);
  };

  useEffect(() => {
    const initGame = async () => {
      try {
        const res = await api.get("/roulette");

        if (!res || !res.data || !Array.isArray(res.data)) {
          throw new Error("Invalid or missing game data");
        }

        setWheelData(res.data);
      } catch (error) {
        console.error("Error receiving game setup info:", error);
      }
    };

    initGame();
  }, []);

  return (
    <div
      className="flex justify-center items-center aspect-square h-96 mx-auto border-pink-300"
      onClick={handleSpin}
    >
      <GameWheel wheelData={wheelData} />
    </div>
  );
}
