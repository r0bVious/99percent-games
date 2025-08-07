import { useEffect, useState } from "react";
import { AnimatePresence } from "motion/react";
import { usePlayer } from "@shared/PlayerContext";
import api from "@utils/api";
import Modal from "@shared/Modal";
import Reel from "./components/Reel";
import "./slot-machine.css";
import RainbowPillar from "./components/RainbowPillar";

type Symbol = {
  id: string;
  multiplier: number;
};

type GameData = {
  reels: Symbol[][];
};

type SpinResult = {
  grid: Symbol[][];
  win: boolean;
  winningLine: number;
  multiplier: number;
  returnedAmount: number;
  netChange: number;
};

interface SpinResponse {
  spinResult: SpinResult;
  newPointTotal: number;
}

export default function App() {
  const { player, setPlayerPoints } = usePlayer();
  const [gameData, setGameData] = useState<GameData>();
  const [isSpinning, setIsSpinning] = useState(false);
  const [resultGrid, setResultGrid] = useState<Symbol[][] | null>(null);
  const [modalAlert, setModalAlert] = useState(false);
  const [modalInfo, setModalInfo] = useState<{
    win: boolean;
    message: string;
  } | null>(null);

  useEffect(() => {
    const initGame = async () => {
      try {
        const res = await api.get("/slotmachine");
        if (!res || !res.data) throw new Error("Invalid or missing game data");
        setGameData(res.data);
      } catch (error) {
        console.error("Error receiving game setup info:", error);
      }
    };

    initGame();
  }, []);

  const spin = async (userId: number): Promise<SpinResponse | null> => {
    setIsSpinning(true);
    try {
      const res = await api.post("/slotmachine/spin", { userId });
      return res.data;
    } catch (error) {
      console.error("Spin failed:", error);
      return null;
    }
  };

  const handleSpin = async () => {
    if (!player) return;

    const response = await spin(player.userId);
    if (!response) return;

    setResultGrid(response.spinResult.grid);
    setModalInfo(getModalInfo(response.spinResult));

    setTimeout(() => {
      setModalAlert(true);
      setPlayerPoints(response.newPointTotal);
      setIsSpinning(false);
    }, 3500);
  };

  const getModalInfo = (result: SpinResult) => {
    if (!result.win) {
      return { win: false, message: "Try again?" };
    }
    return {
      win: true,
      message: `You won ${result.multiplier}x your bet!`,
    };
  };

  const handleModalClick = () => {
    setModalAlert(false);
    setModalInfo(null);
    setResultGrid(null);
  };

  return (
    <div className="flex flex-col justify-center items-center gap-8 size-full bg-gradient-to-t from-black to-gray-900">
      <div className="flex flex-col justify-center items-center">
        <div className="text-yellow-300 text-3xl font-bold tracking-widest text-center border-x-4 border-t-4 border-gray-600 rounded-t-lg w-2/3 p-2 bg-gray-800">
          Jackpot Slots
        </div>
        <div className="bg-gray-800 border-4 border-gray-600 rounded-2xl shadow-2xl px-10 p-6 flex flex-col items-center gap-6">
          {gameData && (
            <div className="relative flex gap-4 p-4 bg-black rounded-lg border border-gray-700">
              <RainbowPillar isSpinning={isSpinning} />

              {/* Reels */}
              <div className="flex gap-4">
                {gameData.reels.map((reel, i) => (
                  <Reel
                    key={i}
                    reelData={reel}
                    isSpinning={isSpinning}
                    resultSymbols={resultGrid ? resultGrid[i] : null}
                  />
                ))}
              </div>

              <RainbowPillar isSpinning={isSpinning} />
            </div>
          )}
        </div>

        <div className="flex justify-center items-center mt-4">
          <button
            onClick={handleSpin}
            disabled={isSpinning}
            className={`${
              isSpinning ? "bg-gray-400" : "bg-red-600"
            } text-white text-lg px-8 py-3 rounded-xl border-2 border-white shadow-lg`}
          >
            {isSpinning ? "Spinning..." : "Spin!"}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {modalAlert && modalInfo && (
          <Modal
            gameName="Slot Machine"
            modalInfo={modalInfo}
            onClose={handleModalClick}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
