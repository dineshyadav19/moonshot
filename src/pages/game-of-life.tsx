import React, { useState, useCallback, useRef } from "react";

const numRows = 30;
const numCols = 30;

const generateEmptyGrid = (): number[][] => {
  const rows: number[][] = [];
  for (let i = 0; i < numRows; i++) {
    rows.push(Array.from(Array(numCols), () => 0));
  }
  return rows;
};

const generateRandomGrid = (): number[][] => {
  const rows: number[][] = [];
  for (let i = 0; i < numRows; i++) {
    rows.push(Array.from(Array(numCols), () => (Math.random() > 0.7 ? 1 : 0)));
  }
  return rows;
};

const calculateNextGrid = (grid: number[][]): number[][] => {
  const newGrid: any = generateEmptyGrid();

  const operations: [number, number][] = [
    [0, 1],
    [0, -1],
    [1, -1],
    [-1, 1],
    [1, 1],
    [-1, -1],
    [1, 0],
    [-1, 0],
  ];

  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numCols; j++) {
      let neighbors = 0;
      operations.forEach(([x, y]) => {
        const newI = i + x;
        const newJ = j + y;
        if (newI >= 0 && newI < numRows && newJ >= 0 && newJ < numCols) {
          neighbors += grid[newI]?.[newJ] ?? 0;
        }
      });

      if (grid[i]?.[j] === 1 && (neighbors < 2 || neighbors > 3)) {
        newGrid[i][j] = 0;
      } else if (grid[i]?.[j] === 0 && neighbors === 3) {
        newGrid[i][j] = 1;
      } else {
        newGrid[i][j] = grid[i]?.[j] ?? 0;
      }
    }
  }

  return newGrid;
};

const GameOfLife: React.FC = () => {
  const [grid, setGrid] = useState<number[][]>(() => generateEmptyGrid());
  const [running, setRunning] = useState(false);
  const runningRef = useRef(running);
  runningRef.current = running;

  const runSimulation = useCallback(() => {
    if (!runningRef.current) return;

    setGrid((g) => calculateNextGrid(g));
    setTimeout(runSimulation, 100);
  }, []);

  return (
    <div>
      <h1 className="mb-4 text-center text-3xl font-semibold text-[#112f49]">
        Game of life
      </h1>
      <div className="flex flex-col items-center justify-center">
        <div
          className="grid gap-px bg-gray-900"
          style={{
            gridTemplateColumns: `repeat(${numCols}, 20px)`,
          }}
        >
          {grid.map((rows, i) =>
            rows.map((col, j) => (
              <div
                key={`${i}-${j}`}
                onClick={() => {
                  const newGrid = grid.map((row, rowIndex) =>
                    row.map((cell, colIndex) => {
                      if (rowIndex === i && colIndex === j) {
                        return grid[rowIndex]?.[colIndex] ? 0 : 1;
                      }
                      return cell;
                    }),
                  );
                  setGrid(newGrid);
                }}
                className={`h-5 w-5 ${
                  grid[i]?.[j] ? "bg-black" : "bg-white"
                } border border-gray-500`}
              />
            )),
          )}
        </div>
        <div className="mt-4 flex justify-center gap-x-4">
          <button
            className="rounded bg-[#112f49] px-6 py-2 text-white"
            onClick={() => {
              setRunning(!running);
              if (!running) {
                runningRef.current = true;
                runSimulation();
              }
            }}
          >
            {running ? "Stop" : "Start"}
          </button>
          <button
            className="rounded bg-[#067e30] px-4 py-2 text-white"
            onClick={() => setGrid(generateRandomGrid())}
          >
            Randomize
          </button>
          <button
            className="rounded bg-[#ab3232] px-4 py-2 text-white"
            onClick={() => setGrid(generateEmptyGrid())}
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameOfLife;
