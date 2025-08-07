import { motion } from "motion/react";
import { useMemo } from "react";

type Symbol = {
  id: string;
  multiplier: number;
};

interface ReelProps {
  reelData: Symbol[];
  isSpinning: boolean;
  resultSymbols: Symbol[] | null;
}

const symbolEmojis: Record<string, string> = {
  mult1: "🍋",
  mult2: "🍒",
  mult3: "🔔",
  mult5: "💎",
  mult7: "🍀",
  mult10: "7️⃣",
  mult15: "💰",
  mult20: "👑",
};

const symbolHeight = 80;
const visibleRows = 3;

const Reel = ({ reelData, isSpinning, resultSymbols }: ReelProps) => {
  const totalSymbols = reelData.length;
  const extendedReel = useMemo(() => {
    return Array(5).fill(reelData).flat();
  }, [reelData]);

  const stopIndex = useMemo(() => {
    if (!resultSymbols) return 0;
    for (let i = 0; i < reelData.length; i++) {
      const a = reelData[i];
      const b = reelData[(i + 1) % reelData.length];
      const c = reelData[(i + 2) % reelData.length];
      if (
        a.id === resultSymbols[0]?.id &&
        b.id === resultSymbols[1]?.id &&
        c.id === resultSymbols[2]?.id
      ) {
        return i;
      }
    }
    return 0;
  }, [reelData, resultSymbols]);

  const finalOffset = useMemo(() => {
    if (!resultSymbols) return 0;

    const minSpins = 3;
    const rawOffset = (minSpins * totalSymbols + stopIndex) * symbolHeight;

    return -rawOffset;
  }, [resultSymbols, stopIndex, totalSymbols]);
  const idleDuration = useMemo(() => 25 + Math.random() * 25, []);
  const resultDuration = useMemo(() => 1.5 + Math.random(), []);

  const animateProps = resultSymbols
    ? { y: finalOffset }
    : { y: [0, -symbolHeight * totalSymbols] };

  const transitionProps = resultSymbols
    ? {
        duration: resultDuration,
        ease: "easeOut" as const,
      }
    : {
        duration: idleDuration,
        repeat: Infinity,
        ease: "linear" as const,
      };

  return (
    <div
      style={{
        height: symbolHeight * visibleRows,
        overflow: "hidden",
        width: 80,
        border: "1px solid black",
        borderRadius: 8,
      }}
    >
      <motion.div
        animate={animateProps}
        transition={transitionProps}
        style={{ display: "flex", flexDirection: "column" }}
      >
        {extendedReel.map((symbol, index) => (
          <div
            key={`${symbol.id}-${index}`}
            style={{
              height: symbolHeight,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: 32,
              backgroundColor: "#fff",
              borderBottom: "1px solid #ccc",
            }}
          >
            {symbolEmojis[symbol.id] ?? "❓"}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default Reel;
