export type Symbol = {
  id: string;
  multiplier: number;
};

export const symbols = {
  mult1: { id: "mult1", multiplier: 1 },
  mult3: { id: "mult3", multiplier: 3 },
  mult5: { id: "mult5", multiplier: 5 },
  mult7: { id: "mult7", multiplier: 7 },
  mult10: { id: "mult10", multiplier: 10 },
  mult15: { id: "mult15", multiplier: 15 },
  mult20: { id: "mult20", multiplier: 20 },
};

export const gameData: Symbol[][] = [
  [
    symbols.mult5,
    symbols.mult10,
    symbols.mult3,
    symbols.mult3,
    symbols.mult20,
    symbols.mult1,
    symbols.mult7,
    symbols.mult10,
    symbols.mult5,
    symbols.mult1,
    symbols.mult15,
    symbols.mult3,
    symbols.mult15,
    symbols.mult20,
    symbols.mult7,
  ],
  [
    symbols.mult5,
    symbols.mult1,
    symbols.mult10,
    symbols.mult7,
    symbols.mult3,
    symbols.mult15,
    symbols.mult1,
    symbols.mult20,
    symbols.mult3,
    symbols.mult5,
    symbols.mult15,
    symbols.mult10,
    symbols.mult7,
    symbols.mult15,
    symbols.mult20,
  ],
  [
    symbols.mult10,
    symbols.mult5,
    symbols.mult3,
    symbols.mult7,
    symbols.mult20,
    symbols.mult15,
    symbols.mult10,
    symbols.mult1,
    symbols.mult1,
    symbols.mult15,
    symbols.mult20,
    symbols.mult3,
    symbols.mult20,
    symbols.mult7,
    symbols.mult5,
  ],
];

const paylines: [number, number][][] = [
  [
    [0, 0],
    [1, 0],
    [2, 0],
  ],
  [
    [0, 1],
    [1, 1],
    [2, 1],
  ],
  [
    [0, 2],
    [1, 2],
    [2, 2],
  ],
  [
    [0, 0],
    [1, 1],
    [2, 2],
  ],
  [
    [0, 2],
    [1, 1],
    [2, 0],
  ],
];

export const playGame = (
  betAmount: number
): {
  grid: Symbol[][];
  win: boolean;
  winningLine?: number;
  multiplier: number;
  returnedAmount: number;
  netChange: number;
} => {
  const grid: Symbol[][] = [[], [], []];

  for (let reelIndex = 0; reelIndex < gameData.length; reelIndex++) {
    const reel = gameData[reelIndex];
    const startIndex = Math.floor(Math.random() * reel.length);

    for (let row = 0; row < 3; row++) {
      const symbolIndex = (startIndex + row) % reel.length;
      grid[row][reelIndex] = reel[symbolIndex];
    }
  }

  let win = false;
  let winningLine: number | undefined = undefined;
  let multiplier = 0;

  for (let lineIndex = 0; lineIndex < paylines.length; lineIndex++) {
    const payline = paylines[lineIndex];
    const symbolsOnLine = payline.map(
      ([reelIndex, rowIndex]) => grid[rowIndex][reelIndex]
    );

    const firstId = symbolsOnLine[0].id;
    const allMatch = symbolsOnLine.every((sym) => sym.id === firstId);

    if (allMatch && symbolsOnLine[0].multiplier > multiplier) {
      win = true;
      winningLine = lineIndex;
      multiplier = symbolsOnLine[0].multiplier;
    }
  }

  const returnedAmount = betAmount * multiplier;
  const netChange = returnedAmount - betAmount;

  const transposedGrid: Symbol[][] = [0, 1, 2].map((colIndex) =>
    [0, 1, 2].map((rowIndex) => grid[rowIndex][colIndex])
  );

  return {
    grid: transposedGrid,
    win,
    winningLine,
    multiplier,
    returnedAmount,
    netChange,
  };
};
