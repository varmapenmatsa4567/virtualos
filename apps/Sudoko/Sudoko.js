import Window from "@/components/Window";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Undo2, Eraser, Pencil, HelpCircle } from "lucide-react";
import { getSudoku } from "sudoku-gen";

const Sudoko = ({ fileStructure, setFileStructure, ...props }) => {
  const [board, setBoard] = useState(
    Array(9)
      .fill(null)
      .map(() => Array(9).fill(null)),
  );
  const [solution, setSolution] = useState(
    Array(9)
      .fill(null)
      .map(() => Array(9).fill(null)),
  );
  const [initialBoard, setInitialBoard] = useState(
    Array(9)
      .fill(null)
      .map(() => Array(9).fill(null)),
  );
  const [selectedCell, setSelectedCell] = useState(null);

  // Initialize with some numbers from the screenshot
  const createSudoko = () => {
    const sudoko = getSudoku("easy");
    const { puzzle, solution } = sudoko;
    const board = puzzle.split("").map((cell) => (cell === "-" ? null : parseInt(cell)));
    const solutionBoard = solution.split("").map((cell) => parseInt(cell));
    const initialBoard = puzzle.split("").map((cell) => (cell === "-" ? null : parseInt(cell)));

    setBoard(
      Array(9)
        .fill(null)
        .map((_, i) => board.slice(i * 9, i * 9 + 9)),
    );
    setSolution(
      Array(9)
        .fill(null)
        .map((_, i) => solutionBoard.slice(i * 9, i * 9 + 9)),
    );
    setInitialBoard(
      Array(9)
        .fill(null)
        .map((_, i) => initialBoard.slice(i * 9, i * 9 + 9)),
    );
    setSelectedCell(null);
  };

  const handleCellClick = (i, j) => {
    setSelectedCell({ i, j });
  };

  const handleNumberClick = (num) => {
    if (selectedCell && initialBoard[selectedCell.i][selectedCell.j] === null) {
      const newBoard = [...board];
      newBoard[selectedCell.i][selectedCell.j] = num;
      setBoard(newBoard);
    }
  };

  const isHighlighted = (i, j) => {
    if (!selectedCell) return false;
    const { i: selectedI, j: selectedJ } = selectedCell;
    return (
      i === selectedI ||
      j === selectedJ ||
      (Math.floor(i / 3) === Math.floor(selectedI / 3) && Math.floor(j / 3) === Math.floor(selectedJ / 3))
    );
  };

  const isSelectedCell = (i, j) => {
    return selectedCell && selectedCell.i === i && selectedCell.j === j;
  };

  const isWrongNumber = (i, j) => {
    if (initialBoard[i][j] !== null || board[i][j] === null) {
      return false; // Ignore pre-filled cells or empty cells
    }

    const num = board[i][j];

    // Check current row
    for (let col = 0; col < 9; col++) {
      if (col !== j && board[i][col] === num) {
        return true; // Duplicate in the same row
      }
    }

    // Check current column
    for (let row = 0; row < 9; row++) {
      if (row !== i && board[row][j] === num) {
        return true; // Duplicate in the same column
      }
    }

    // Check current 3x3 box
    const boxStartRow = Math.floor(i / 3) * 3;
    const boxStartCol = Math.floor(j / 3) * 3;
    for (let row = boxStartRow; row < boxStartRow + 3; row++) {
      for (let col = boxStartCol; col < boxStartCol + 3; col++) {
        if (row !== i && col !== j && board[row][col] === num) {
          return true; // Duplicate in the same 3x3 box
        }
      }
    }

    return false; // No duplicates found
  };

  return (
    <Window {...props} isCustomized={true} customSize={{ width: "700px", height: "600px" }}>
      <div className="min-h-screen bg-white p-8">
        <div className="mx-auto max-w-2xl">
          <h1 className="mb-6 text-center text-xl font-semibold text-gray-800">Sudoko</h1>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-[1fr,auto]">
            {/* Sudoku Grid */}
            <div className="aspect-square">
              <div className="grid h-full w-full grid-cols-9 grid-rows-9">
                {board.map((row, i) =>
                  row.map((cell, j) => (
                    <div
                      key={`${i}-${j}`}
                      className={`flex hover:bg-sky-100 items-center justify-center border-black text-3xl font-medium ${
                        j % 3 === 2 ? "border-r-2" : "border-r"
                      } ${i % 3 === 2 ? "border-b-2" : "border-b"}
                      ${i == 0 ? "border-t-2" : ""}
                      ${j == 0 ? "border-l-2" : ""}
                      ${isSelectedCell(i, j) ? "bg-sky-200" : isHighlighted(i, j) ? "bg-sky-50" : ""}
                      ${isWrongNumber(i, j) ? "text-red-500" : "text-gray-600"}
                      `}
                      onClick={() => handleCellClick(i, j)}
                    >
                      {cell}
                    </div>
                  )),
                )}
              </div>
            </div>

            {/* Controls */}
            <div className="space-y-6">
              <Button onClick={createSudoko} className="w-full bg-[#4096FF] text-xl font-normal hover:bg-[#4096FF]/90">New Game</Button>

              {/* Number Pad */}
              <div className="grid grid-cols-3 gap-2">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                  <button
                    key={num}
                    className="aspect-square rounded border border-gray-200 text-xl text-gray-600 hover:bg-gray-50"
                    onClick={() => handleNumberClick(num)}
                  >
                    {num}
                  </button>
                ))}
              </div>

              {/* Utility Buttons */}
              <div className="grid grid-cols-2 gap-2">
                <button className="flex flex-col items-center justify-center gap-1 rounded border border-gray-200 p-4 text-gray-600 hover:bg-gray-50">
                  <Undo2 className="h-5 w-5" />
                  <span className="text-sm">Undo</span>
                </button>
                <button className="flex flex-col items-center justify-center gap-1 rounded border border-gray-200 p-4 text-gray-600 hover:bg-gray-50">
                  <Eraser className="h-5 w-5" />
                  <span className="text-sm">Erase</span>
                </button>
                <button className="flex flex-col items-center justify-center gap-1 rounded border border-gray-200 p-4 text-gray-600 hover:bg-gray-50">
                  <Pencil className="h-5 w-5" />
                  <span className="text-sm">Notes</span>
                </button>
                <button className="relative flex flex-col items-center justify-center gap-1 rounded border border-gray-200 p-4 text-gray-600 hover:bg-gray-50">
                  <HelpCircle className="h-5 w-5" />
                  <span className="text-sm">Hint</span>
                  <span className="absolute right-2 top-2 rounded-full bg-[#4096FF] px-1.5 text-xs text-white">10</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Window>
  );
};

export default Sudoko;