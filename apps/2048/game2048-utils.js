
export const getRandomEmptyCell = (board) => {
    const emptyCells = [];
    for (let i = 0; i < board.length; i++) {
        if(board[i] === 0) {
            emptyCells.push(i);
        }
    }
    if (emptyCells.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    return emptyCells[randomIndex];
}

export const mergeRight = (board, score, setScore) => {
    let newBoard = [...board];
    for(let i=3;i>=0;i--){
        for(let j=3;j>0;j--){
            const currentInd = i * 4 + j;
            for(let k=j-1;k>=0;k--){
                const targetInd = i * 4 + k;
                if(newBoard[targetInd] === 0) continue; // Skip empty tiles
                if(newBoard[currentInd] === 0) {
                    newBoard[currentInd] = newBoard[targetInd];
                    newBoard[targetInd] = 0;
                    continue;
                }
                if(newBoard[currentInd] === newBoard[targetInd]) {
                    newBoard[currentInd] *= 2;
                    newBoard[targetInd] = 0;
                    setScore(score + newBoard[currentInd]); // Update score
                }
                break; // Stop after merging or moving
            }
        }
    }
    return newBoard;
}

export const mergeLeft = (board, score, setScore) => {
    return mergeRight(board.reverse(), score, setScore).reverse();
}

export const mergeUp = (board, score, setScore) => {
    let newBoard = [...board];
    for(let j=0;j<4;j++){
        for(let i=0;i<3;i++){
            const currentInd = i * 4 + j;
            for(let k=i+1;k<4;k++){
                const targetInd = k * 4 + j;
                if(newBoard[targetInd] === 0) continue; // Skip empty tiles
                if(newBoard[currentInd] === 0) {
                    newBoard[currentInd] = newBoard[targetInd];
                    newBoard[targetInd] = 0;
                    continue;
                }
                if(newBoard[currentInd] === newBoard[targetInd]) {
                    newBoard[currentInd] *= 2;
                    newBoard[targetInd] = 0;
                    setScore(score + newBoard[currentInd]); // Update score
                }
                break; // Stop after merging or moving
            }
        }
    }
    return newBoard;
}

export const mergeDown = (board, score, setScore) => {
    return mergeUp(board.reverse(), score, setScore).reverse();
}

export const isGameOver = (board) => {
    if (board.includes(0)) return false; // Game is not over if there are empty tiles
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            const currentInd = i * 4 + j;
            if (j < 3 && board[currentInd] === board[currentInd + 1]) return false; // Check right
            if (i < 3 && board[currentInd] === board[currentInd + 4]) return false; // Check down
        }
    }
    return true; // No moves left, game is over
}

