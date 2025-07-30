/**
 * Simulates a roulette-style wheel spin based on predefined segments.
 * @param betAmount The amount the player wagers.
 * @returns object with result details.
 */

type Segment = {
  label: string;
  payoutMultiplier: number; // includes original bet (e.g. 5 → win 5× your stake)
  probability: number;
};

export const wheelSegments: Segment[] = [
  { label: "5x", payoutMultiplier: 5, probability: 0.03 },
  { label: "3x", payoutMultiplier: 3, probability: 0.07 },
  { label: "2x", payoutMultiplier: 2, probability: 0.1 },
  { label: "1x", payoutMultiplier: 1, probability: 0.15 },
  { label: "Lose", payoutMultiplier: 0, probability: 0.65 },
];

export const spinWheel = (
  betAmount: number
): {
  label: string;
  payoutMultiplier: number;
  netChange: number;
  returnedAmount: number;
} => {
  // Build cumulative distribution
  const cumulative = wheelSegments.map((seg, idx) => ({
    ...seg,
    cumulativeProb: wheelSegments
      .slice(0, idx + 1)
      .reduce((sum, s) => sum + s.probability, 0),
  }));

  // Generate a random number in [0, 1)
  const r = Math.random();

  // Find resulting segment
  const selected = cumulative.find((seg) => r < seg.cumulativeProb)!;

  const returnedAmount = selected.payoutMultiplier * betAmount;
  const netChange = returnedAmount - betAmount;

  return {
    label: selected.label,
    payoutMultiplier: selected.payoutMultiplier,
    netChange,
    returnedAmount,
  };
};
