/**
 * Simulates a roulette-style wheel spin based on predefined segments.
 * @param betAmount The amount the player wagers.
 * @returns object with result details.
 */

export type Segment = {
  label: string;
  multiplier: number;
};

export const gameData: Segment[] = [
  { label: "2x", multiplier: 2 },
  { label: "Lose", multiplier: 0 },
  { label: "1x", multiplier: 1 },
  { label: "Lose", multiplier: 0 },
  { label: "2x", multiplier: 2 },
  { label: "Lose", multiplier: 0 },
  { label: "1x", multiplier: 1 },
  { label: "Lose", multiplier: 0 },
  { label: "3x", multiplier: 3 },
  { label: "Lose", multiplier: 0 },
  { label: "1x", multiplier: 1 },
  { label: "Lose", multiplier: 0 },
  { label: "2x", multiplier: 2 },
  { label: "Lose", multiplier: 0 },
  { label: "1x", multiplier: 1 },
  { label: "Lose", multiplier: 0 },
];

export const playGame = (
  betAmount: number
): {
  index: number;
  label: string;
  multiplier: number;
  netChange: number;
  returnedAmount: number;
} => {
  // Pick a random segment index
  const randomIndex = Math.floor(Math.random() * gameData.length);
  const selected = gameData[randomIndex];

  const returnedAmount = selected.multiplier * betAmount;
  const netChange = returnedAmount - betAmount;

  return {
    index: randomIndex,
    label: selected.label,
    multiplier: selected.multiplier,
    netChange,
    returnedAmount,
  };
};
