import { usePlayer } from "@shared/PlayerContext";
import api from "@utils/api";
import { useEffect, useState } from "react";
import GameBoard from "./GameBoard";

interface Prize {
  label: string;
  multiplier: number;
}

interface Coord {
  x: number;
  y: number;
}

interface GameDataTypes {
  prizeArray: Prize[];
  grid: Coord[][];
}

interface GameResult {
  prizeResult: Prize;
  paths: Array<{ from: [number, number]; to: [number, number] }>;
  finalPosition: number;
  startPosition: number;
  gridDimensions: { xAxis: number; yAxis: number; branchNum: number };
  movementHistory: Array<[number, number]>;
}

export default function App() {
  const { player, setPlayerPoints, setShowLoginModal } = usePlayer();
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameData, setGameData] = useState<GameDataTypes>();
  const [gameResult, setGameResult] = useState<GameResult>();

  useEffect(() => {
    const initGame = async () => {
      try {
        const res = await api.get("/luckydrop");
        console.log("Game data loaded:", res.data);
        if (!res || !res.data) {
          throw new Error("Invalid or missing game data");
        }

        setGameData(res.data);
      } catch (error) {
        console.error("Error receiving game setup info:", error);
      }
    };

    initGame();
  }, []);

  const play = async (userId: number, startPoint: number) => {
    setIsPlaying(true);
    try {
      console.log(
        `Playing game with userId: ${userId}, startPoint: ${startPoint}`
      );

      const res = await api.post("/luckydrop/play", { userId, startPoint });
      console.log("Backend response:", res.data);

      if (!res?.data) return null;
      const { playResult } = res.data;

      console.log("Game result:", playResult);
      console.log("Prize won:", playResult.prizeResult);
      console.log("Path system:", playResult.paths);
      console.log("Started at:", playResult.startPosition);
      console.log("Ended at:", playResult.finalPosition);
      console.log("Movement history:", playResult.movementHistory);
      console.log("Grid dimensions:", playResult.gridDimensions);

      return playResult;
    } catch (error) {
      console.error("Error playing game:", error);
      return null;
    } finally {
      setIsPlaying(false);
    }
  };

  const handleStartPointClick = async (startPoint: number) => {
    if (!player) {
      console.log("No player logged in");
      setShowLoginModal(true);
      return;
    }

    if (isPlaying) {
      console.log("Game already in progress");
      return;
    }

    console.log("Starting game...");
    const playResult = await play(player?.userId, startPoint);

    if (!playResult) {
      console.error("Invalid game result");
      return;
    }

    console.log("Final game result:", playResult);
    setGameResult(playResult);
  };

  return (
    <div className="bg-purple-200 w-full p-4">
      {gameData ? (
        <div className="flex flex-col items-center justify-between">
          <div className="w-full flex">
            {gameData.prizeArray.map((prize, index) => (
              <button
                key={index}
                className="flex-1 text-center p-2 border border-gray-300 bg-white hover:bg-gray-50"
                onClick={() => handleStartPointClick(index)}
              >
                {index + 1}
              </button>
            ))}
          </div>
          <GameBoard
            gameData={gameData}
            gameResult={gameResult}
            isPlaying={isPlaying}
          />
          <div className="w-full flex">
            {gameData.prizeArray.map((prize, index) => (
              <div
                key={index}
                className="flex-1 text-center p-2 border border-gray-300 bg-white"
              >
                {prize.label}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center min-h-64">
          <div className="text-xl text-gray-600">Loading game data...</div>
        </div>
      )}
    </div>
  );
}
