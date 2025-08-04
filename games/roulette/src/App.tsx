import api from "@utils/api";
import { useEffect, useState } from "react";
import GameWheel from "./components/GameWheel";
import { usePlayer } from "@shared/PlayerContext";
import { AnimatePresence, motion } from "motion/react";
import Modal from "@shared/Modal";

export interface Segment {
  label: string;
  multiplier: number;
}

export interface AnimationState {
  animate: { rotate: number };
  transition: {};
}

export default function App() {
  const { player } = usePlayer();
  const [wheelData, setWheelData] = useState<Segment[]>([]);
  const [isSpinning, setIsSpinning] = useState(false);
  const [modalAlert, setModalAlert] = useState(false);
  const [modalInfo, setModalInfo] = useState<{
    win: boolean;
    message: string;
  } | null>(null);

  const [wheelAnimation, setWheelAnimation] = useState<AnimationState>({
    animate: { rotate: 360 },
    transition: {
      repeat: Infinity,
      ease: "linear",
      duration: 18,
    },
  });

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

  const spin = async (userId: number) => {
    setIsSpinning(true);
    try {
      const res = await api.post("/roulette/spin", { userId });
      return res.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const handleSpin = async () => {
    const spinResult = await spin(1);
    if (!spinResult || typeof spinResult.index !== "number") {
      console.error("Invalid spin result");
      return;
    }

    const SEGMENT_COUNT = wheelData.length;
    const segmentAngle = 360 / SEGMENT_COUNT;
    const fullRotations = Math.floor(Math.random() * 4 + 1);

    const targetAngle =
      360 * fullRotations +
      (360 - spinResult.index * segmentAngle - segmentAngle * 0.5);

    setModalInfo(getModalInfo(spinResult.label));
    setWheelAnimation({
      animate: { rotate: targetAngle },
      transition: {
        ease: [0.25, 0, 0.15, 1],
        duration: 5,
      },
    });

    setTimeout(() => {
      setModalAlert(true);
      setIsSpinning(false);
    }, 5500);
  };

  const getModalInfo = (label: string) => {
    if (label === "Lose") {
      return { win: false, message: "Try again?" };
    }
    return {
      win: true,
      message: `${label} your bet has been added to your total points!`,
    };
  };

  const handleModalClick = () => {
    setWheelAnimation({
      animate: { rotate: 0 },
      transition: { duration: 0 },
    });

    setTimeout(() => {
      setWheelAnimation({
        animate: { rotate: 360 },
        transition: {
          repeat: Infinity,
          ease: "linear",
          duration: 18,
        },
      });
    }, 20);

    setModalAlert(false);
  };

  return (
    <div className="relative p-12 bg-black">
      <div className="relative flex flex-col gap-12 justify-center items-center">
        <motion.div
          animate={wheelAnimation.animate}
          transition={wheelAnimation.transition}
        >
          <GameWheel wheelData={wheelData} />
        </motion.div>
        <div
          className="absolute left-1/2 -translate-x-1/2 animate-bounce"
          style={{
            top: "calc(50% - 155px)",
          }}
        >
          <div
            className="w-0 h-0
      border-l-[24px] border-l-transparent
      border-r-[24px] border-r-transparent
      border-b-[32px] border-white
      pointer-events-none z-10"
          />
        </div>
        <button
          onClick={handleSpin}
          className={`px-8 py-4 bg-blue-500 text-white border-2 border-white rounded-xl disabled:opacity-50 ${
            modalAlert ? "" : "animate-buttonBounce"
          }`}
          disabled={isSpinning}
        >
          Spin!
        </button>
      </div>
      <AnimatePresence>
        {modalAlert && (
          <Modal
            gameName="Roulette"
            modalInfo={modalInfo}
            onClose={handleModalClick}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
