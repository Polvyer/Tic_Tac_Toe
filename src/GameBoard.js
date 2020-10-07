// GameBoard object
const GameBoard = (() => {
    let board = new Array(9);

    const clearBoard = () => {
        for (let i = 0; i < board.length; i++) {
            board[i] = '';
        }
    }

    const printBoard = () => {
        console.table(board);
    }

    const getCell = (cellIndex) => {
        return board[cellIndex];
    }

    const setCell = (cellIndex, symbol) => {
        board[cellIndex] = symbol;
    }

    const isCellFilled = (cellIndex) => {
        if ((board[cellIndex] != 'x') && (board[cellIndex] != 'o')) {
            return false;
        }
        return true;
    }

    return { clearBoard, printBoard, getCell, setCell, isCellFilled };
})();

export { GameBoard };