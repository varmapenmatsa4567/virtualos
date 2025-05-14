import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogFooter, AlertDialogDescription, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog";
import Window from "@/components/Window";
import { X } from "lucide-react";
import { useState } from "react";

const TicTacToe = (props) => {
  const [board, setBoard] = useState(["", "", "", "", "", "", "", "", ""]);
  const [isXNext, setIsXNext] = useState(true);
  const [isGameOver, setIsGameOver] = useState(false);
  const [winner, setWinner] = useState(null);
  const [nofPlayers, setNoPlayers] = useState(2);

  // Minimax algorithm
  const minimax = (board, depth, isMaximizing) => {
    const scores = {
      X: -10,
      O: 10,
      draw: 0,
    };

    // Check if the game is over
    const result = checkWinner(board, true);
    if (result !== null) {
      return scores[result];
    }

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < board.length; i++) {
        if (board[i] === "") {
          board[i] = "O";
          const score = minimax(board, depth + 1, false);
          board[i] = "";
          bestScore = Math.max(score, bestScore);
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < board.length; i++) {
        if (board[i] === "") {
          board[i] = "X";
          const score = minimax(board, depth + 1, true);
          board[i] = "";
          bestScore = Math.min(score, bestScore);
        }
      }
      return bestScore;
    }
  };

  // Find the best move for the AI
  const findBestMove = (board) => {
    let bestScore = -Infinity;
    let bestMove = null;
    for (let i = 0; i < board.length; i++) {
      if (board[i] === "") {
        board[i] = "O";
        const score = minimax(board, 0, false);
        board[i] = "";
        if (score > bestScore) {
          bestScore = score;
          bestMove = i;
        }
      }
    }
    return bestMove;
  };

  // Handle cell click
  const handleClick = (index) => {
    if (board[index] !== "" || isGameOver) return;

    // Human player's move
    const newBoard = [...board];
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);
    checkWinner(newBoard);

    if(nofPlayers === 2) {
      setIsXNext(!isXNext);
    }

    // AI's move (if single-player mode)
    if (nofPlayers === 1 && !isGameOver) {
      const bestMove = findBestMove(newBoard);
      if (bestMove !== null) {
        newBoard[bestMove] = "O";
        setBoard(newBoard);
        checkWinner(newBoard);
      }
    }

  };

  // Check for a winner
  const checkWinner = (board, checking = false) => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let combination of winningCombinations) {
      const [a, b, c] = combination;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        setWinner(board[a]);
        if(!checking) setIsGameOver(true);
        return board[a];
      }
    }

    if (!board.includes("")) {
      setWinner(null);
      if(!checking) setIsGameOver(true);
      return "draw";
    }

    return null;
  };

  // Change number of players
  const changeNoPlayers = (e) => {
    setNoPlayers(Number(e.target.value));
    resetGame();
  };

  // Reset the game
  const resetGame = () => {
    setBoard(["", "", "", "", "", "", "", "", ""]);
    setIsXNext(true);
    setIsGameOver(false);
    setWinner(null);
  };

  return (
    <Window isFixed={true} isCustomized={true} customSize={{ width: "600px", height: "600px" }} {...props}>
      <div className="mx-auto w-fit rounded-lg flex flex-col items-center">
        <div className="flex flex-col bg-black p-4 items-center justify-center">
          <div className="grid grid-cols-3">
            {board.map((cell, index) => (
              <div
                key={index}
                onClick={() => handleClick(index)}
                className={`w-32 h-32 ${index % 3 !== 0 && "border-l-4"} ${index > 2 && "border-t-4"} ${index % 3 !== 2 && "border-r-4"} ${index < 6 && "border-b-4"} border-white flex items-center justify-center text-4xl text-white cursor-pointer`}
              >
                {cell === "X" ? (
                  <X className="text-[#ec5444]" size={120} />
                ) : cell === "O" ? (
                  <div className="w-20 h-20 rounded-full border-8 border-[#3a85f7]"></div>
                ) : null}
              </div>
            ))}
          </div>
        </div>
        <p className="text-white text-center mt-5 text-2xl">
          {nofPlayers === 1 ? (isXNext ? "Your Turn (X)" : "AI's Turn (O)") : isXNext ? "Player X's Turn" : "Player O's Turn"}
        </p>
        <select onChange={changeNoPlayers} value={nofPlayers} className="mt-4 px-2 rounded-md py-1 outline-none">
          <option value="1">1 Player</option>
          <option value="2">2 Players</option>
        </select>
      </div>
      <AlertDialog open={isGameOver} onOpenChange={setIsGameOver}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Game Over</AlertDialogTitle>
            <AlertDialogDescription>
              {winner ? `${winner} wins!` : "It's a draw!"}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={resetGame}>Play Again</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Window>
  );
};

export default TicTacToe; 