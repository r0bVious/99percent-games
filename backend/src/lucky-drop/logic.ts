interface Prize {
  label: string;
  multiplier: number;
}

const prizes: Record<string, Prize> = {
  lose: { label: "Lose", multiplier: 0 },
  triple: { label: "3x", multiplier: 3 },
};

const prizeArray = [
  prizes.lose,
  prizes.triple,
  prizes.lose,
  prizes.triple,
  prizes.lose,
];

export const gameData = {
  prizeArray: prizeArray,
};

const getGridDimensions = () => {
  const xAxis = prizeArray.length;
  const yAxis = 2 * prizeArray.length;
  const branchNum = prizeArray.length;

  return { xAxis, yAxis, branchNum };
};

const generatePathSystem = (): Array<{
  from: [number, number];
  to: [number, number];
}> => {
  const { xAxis, yAxis, branchNum } = getGridDimensions();
  const paths: Array<{ from: [number, number]; to: [number, number] }> = [];

  for (let i = 0; i < branchNum; i++) {
    const y = Math.floor(Math.random() * (yAxis - 1));
    const x = Math.floor(Math.random() * (xAxis - 1));

    if (!paths.some((path) => path.from[1] === y)) {
      const from: [number, number] = [x, y];
      const to: [number, number] = [x + 1, y];

      if (to[0] < xAxis) {
        paths.push({ from, to });
      }
    }
  }

  return paths;
};

const executePath = (
  startPoint: number,
  paths: Array<{ from: [number, number]; to: [number, number] }>,
  prizeCount: number
): {
  finalPosition: number;
  movementHistory: Array<[number, number]>;
} => {
  const { yAxis } = getGridDimensions();
  let currentX = startPoint;
  let currentY = 0;
  const movementHistory: Array<[number, number]> = [[startPoint, 0]];

  while (currentY < yAxis - 1) {
    const branch = paths.find(
      (path) =>
        path.from[1] === currentY &&
        (path.from[0] === currentX || path.to[0] === currentX)
    );

    if (branch) {
      if (branch.from[0] === currentX) {
        currentX = branch.to[0];
      } else if (branch.to[0] === currentX) {
        currentX = branch.from[0];
      }
    }

    currentY++;
    movementHistory.push([currentX, currentY]);
  }

  return {
    finalPosition: currentX,
    movementHistory: movementHistory,
  };
};

export const playGame = (
  startPoint: number,
  betAmount: number
): {
  prizeResult: Prize;
  paths: Array<{ from: [number, number]; to: [number, number] }>;
  finalPosition: number;
  startPosition: number;
  gridDimensions: { xAxis: number; yAxis: number; branchNum: number };
  movementHistory: Array<[number, number]>;
} => {
  const prizeCount = gameData.prizeArray.length;

  if (startPoint < 0 || startPoint >= prizeCount) {
    throw new Error(
      `Invalid start point: ${startPoint}. Must be between 0 and ${
        prizeCount - 1
      }`
    );
  }

  const gridDimensions = getGridDimensions();
  const paths = generatePathSystem();
  const { finalPosition, movementHistory } = executePath(
    startPoint,
    paths,
    prizeCount
  );
  const prizeResult = gameData.prizeArray[finalPosition];

  return {
    prizeResult,
    paths,
    finalPosition,
    startPosition: startPoint,
    gridDimensions,
    movementHistory,
  };
};
