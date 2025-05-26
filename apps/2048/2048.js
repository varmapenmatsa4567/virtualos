import Window from "@/components/Window"; // Assuming this component is correctly set up
import { useEffect, useState } from "react";
import { getRandomEmptyCell, isGameOver, mergeDown, mergeLeft, mergeRight, mergeUp } from "./game2048-utils";
import useSmallStore from "@/stores/small-store";

const Game2048 = ({...props}) => {
  // Initial board setup
  const emptyBoard = [
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
  ];

  const [board, setBoard] = useState(emptyBoard);
  const [score, setScore] = useState(0);
  const {game2048BestScore, setGame2048BestScore} = useSmallStore();

  const startNewGame = () => {
    const newBoard = [...emptyBoard]; // Reset the board
    setScore(0);
    // Optionally, you can add two random tiles at the start of a new game
    const firstEmptyCell = getRandomEmptyCell(newBoard);
    if (firstEmptyCell) {
      newBoard[firstEmptyCell] = Math.random() < 0.9 ? 2 : 4; // 90% chance for 2, 10% for 4
    }
    const secondEmptyCell = getRandomEmptyCell(newBoard);
    if (secondEmptyCell) {
      newBoard[secondEmptyCell] = Math.random() < 0.9 ? 2 : 4; // 90% chance for 2, 10% for 4
    }
    setBoard(newBoard);
  }

  // Helper function to get tile styles based on value
  const getTileStyle = (value) => {
    switch (value) {
      case 2:
        return "bg-[#eee4da] text-[#776e65]";
      case 4:
        return "bg-[#ede0c8] text-[#776e65]";
      case 8:
        return "bg-[#f2b179] text-white";
      case 16:
        return "bg-[#f59563] text-white";
      case 32:
        return "bg-[#f67b5e] text-white";
      case 64:
        return "bg-[#f65e3b] text-white";
      case 128:
        return "bg-[#edcf72] text-white";
      case 256:
        return "bg-[#edcc61] text-white";
      case 512:
        return "bg-[#edc850] text-white";
      case 1024:
        return "bg-[#edc53f] text-white";
      case 2048:
        return "bg-[#edc22e] text-white";
      default:
        return "bg-[#cdc1b4]"; // Empty tile background
    }
  };

  useEffect(() => {
        const handleKeyDown = (e) => {
          if(["ArrowRight", "ArrowLeft", "ArrowUp", "ArrowDown"].includes(e.key)) {
            e.stopPropagation();
            e.preventDefault();
            let newBoard;
            if (e.key === "ArrowRight") {
              newBoard = mergeRight(board, score, setScore);
            } else if (e.key === "ArrowLeft") {
              newBoard = mergeLeft(board, score, setScore);
            } else if (e.key === "ArrowUp") {
              newBoard = mergeUp(board, score, setScore);
            } else if (e.key === "ArrowDown") {
              newBoard = mergeDown(board, score, setScore);
            }
            const emptyCell = getRandomEmptyCell(newBoard);
            if (emptyCell) {
              newBoard[emptyCell] = Math.random() < 0.9 ? 2 : 4; // 90% chance for 2, 10% for 4
            }
            setBoard(newBoard);
            setGame2048BestScore(Math.max(game2048BestScore, score)); // Update best score if current score is higher
            if(isGameOver(newBoard)) {
              alert("Game Over! No more moves available.");
            }
          };
        }
      
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [board]);

  useEffect(() => {
    if(board.every(value => value === 0)) {
      startNewGame(); // Start a new game when the component mounts
    }
  }, []);

  return (
    <Window {...props}
    isTransparent={true}
    toolbarColor={"bg-[#faf8ef]"}
    isFixed={true}
    isCustomized={true}
    customSize={{ width: "50%", height: "90%" }} // Adjusted for a typical 2048 board size
    isMaximized={false}
    className="rounded-lg overflow-hidden shadow-xl" // Added some overall styling to Window if it supports className
    >
      <div id="game-2048" className="bg-[#faf8ef] w-full h-full flex flex-col p-4 px-32 gap-4 select-none">
        <div className="flex justify-between items-center">
          <p className="text-5xl sm:text-6xl font-bold text-[#776e65]">2048</p>
          <div className="flex items-center gap-2">
            <div className="flex flex-col items-center bg-[#bbada0] p-1.5 px-3 sm:px-4 rounded-md">
              <p className="text-[#eee4da] text-xs sm:text-sm font-semibold">SCORE</p>
              <p className="text-white text-lg sm:text-xl font-bold">{score}</p>
            </div>
            <div className="flex flex-col items-center bg-[#bbada0] p-1.5 px-3 sm:px-4 rounded-md">
              <p className="text-[#eee4da] text-xs sm:text-sm font-semibold">BEST</p>
              <p className="text-white text-lg sm:text-xl font-bold">{game2048BestScore}</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0">
          <p className="text-[#776e65] text-sm sm:text-base text-center sm:text-left">
            Join the numbers and get to the <span className="font-bold">2048 tile!</span>
          </p>
          <button onClick={startNewGame} className="bg-[#8f7a66] hover:bg-[#9f8b77] p-2 px-4 rounded-md text-white font-semibold text-sm sm:text-base">
            New Game
          </button>
        </div>

        {/* Game Board */}
        <div className="bg-[#bbada0] p-3 sm:p-4 rounded-lg w-full aspect-square"> {/* aspect-square for a square board */}
          <div className="grid grid-cols-4 grid-rows-4 gap-2 sm:gap-3 h-full">
            {board.map((value, index) => (
              <div
                key={index}
                className={`w-full h-full rounded-md flex items-center justify-center font-bold
                            ${getTileStyle(value)}
                            ${value > 0 && value < 100 ? 'text-5xl' : ''}
                            ${value >= 100 && value < 1000 ? 'text-[38px]' : ''}
                            ${value >= 1000 ? 'text-3xl' : ''}
                          `}
              >
                {value > 0 ? value : ""}
              </div>
            ))}
          </div>
        </div>
        <p className="text-center text-xs text-[#776e65] mt-2">
          <strong>HOW TO PLAY:</strong> Use your <strong>arrow keys</strong> to move the tiles.
          When two tiles with the same number touch, they <strong>merge into one!</strong>
        </p>
      </div>
    </Window>
  )
}

export default Game2048;