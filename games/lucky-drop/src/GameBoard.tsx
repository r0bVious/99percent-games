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
}

interface GameBoardProps {
  gameData: GameDataTypes;
  gameResult?: GameResult;
  isPlaying: boolean;
}

const GameBoard = ({ gameData, gameResult, isPlaying }: GameBoardProps) => {
  const { prizeArray } = gameData;

  const renderColumn = (x: number) => {
    const isWinningColumn = gameResult?.finalPosition === x;

    return (
      <div
        key={`column-${x}`}
        className={`flex-1 flex flex-col relative  ${
          isWinningColumn ? "bg-green-50" : ""
        }`}
      >
        {Array.from({ length: 2 * prizeArray.length }, (_, y) => {
          const hasBranch = gameResult?.paths.some(
            (path) =>
              (path.from[0] === x && path.from[1] === y) ||
              (path.to[0] === x && path.to[1] === y)
          );

          const isBranchStart = gameResult?.paths.some(
            (path) => path.from[0] === x && path.from[1] === y
          );

          const isBranchEnd = gameResult?.paths.some(
            (path) => path.to[0] === x && path.to[1] === y
          );

          return (
            <div key={`row-${y}`} className="flex-1 relative">
              <div className="w-full h-full relative">
                <div className="w-5 h-full bg-black mx-auto" />
                {hasBranch && (
                  <div className="w-full h-full flex items-center absolute inset-0">
                    {isBranchStart && (
                      <div className="w-1/2 h-5 bg-black ml-auto" />
                    )}
                    {isBranchEnd && <div className="w-1/2 h-5 bg-black" />}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="w-full h-96 border relative">
      <div className="flex w-full h-full">
        {prizeArray.map((_, x) => renderColumn(x))}
      </div>
    </div>
  );
};

export default GameBoard;
