import { GameBoard } from './GameBoard.js'

// Rules Object
const Rules = (() => {
    let playersTurn = true; // Player goes first
    let currRound = 0;
    let gameOver = false; // Player can play as soon as the page loads

    // Private functions
    const getCellIndex = (cell) => {
        return (parseInt(cell.getAttribute('id'), 10));
    }

    // Public functions
    const changeTurn = () => {
        playersTurn = playersTurn ? false : true;
    }

    const setGameOver = () => {
        gameOver = !gameOver;
    }

    const getGameOver = () => {
        return gameOver;
    }

    const isPlayersTurn = () => {
        return playersTurn;
    }

    const prepareNewGame = () => {
        playersTurn = true;     // Player goes first
        currRound = 0;          // Reset round
        GameBoard.clearBoard();
        setGameOver();
    }

    const updateBoard = (cell, symbol) => {
        let cellIndex = getCellIndex(cell);
        GameBoard.setCell(cellIndex, symbol);
        currRound += 1;
    }

    const isCellMarked = (cell) => {
        let cellIndex = getCellIndex(cell);
        return GameBoard.isCellFilled(cellIndex)
    }

    const debug = () => {
        GameBoard.printBoard();
    }

    const getListOfEmptyCellIndexes = () => {
        let list = [];
        for (let i = 0; i < 9; i++) {
            if (!GameBoard.isCellFilled(i)) {
                list.push(i);
            }
        }
        return list;
    }

    const checkForWinner = () => {
          // Row 1
        if ((GameBoard.getCell(0)) && (GameBoard.getCell(0) == GameBoard.getCell(1)) && (GameBoard.getCell(0) == GameBoard.getCell(2))) {
            return { isThereWinner: true, indexes: [0, 1, 2] };
        } // Row 2
        else if ((GameBoard.getCell(3)) && (GameBoard.getCell(3) == GameBoard.getCell(4)) && (GameBoard.getCell(3) == GameBoard.getCell(5))) {
            return { isThereWinner: true, indexes: [3, 4, 5] };
        } // Row 3
        else if ((GameBoard.getCell(6)) && (GameBoard.getCell(6) == GameBoard.getCell(7)) && (GameBoard.getCell(6) == GameBoard.getCell(8))) {
            return { isThereWinner: true, indexes: [6, 7, 8] };
        } // Col 1
        else if ((GameBoard.getCell(0)) && (GameBoard.getCell(0) == GameBoard.getCell(3)) && (GameBoard.getCell(0) == GameBoard.getCell(6))) {
            return { isThereWinner: true, indexes: [0, 3, 6] };
        } // Col 2
        else if ((GameBoard.getCell(1)) && (GameBoard.getCell(1) == GameBoard.getCell(4)) && (GameBoard.getCell(1) == GameBoard.getCell(7))) {
            return { isThereWinner: true, indexes: [1, 4, 7] };
        } // Col 3
        else if ((GameBoard.getCell(2)) && (GameBoard.getCell(2) == GameBoard.getCell(5)) && (GameBoard.getCell(2) == GameBoard.getCell(8))) {
            return { isThereWinner: true, indexes: [2, 5, 8] };
        } // Diagonal 1
        else if ((GameBoard.getCell(0)) && (GameBoard.getCell(0) == GameBoard.getCell(4)) && (GameBoard.getCell(0) == GameBoard.getCell(8))) {
            return { isThereWinner: true, indexes: [0, 4, 8] };
        } // Diagonal 2
        else if ((GameBoard.getCell(2)) && (GameBoard.getCell(2) == GameBoard.getCell(4)) && (GameBoard.getCell(2) == GameBoard.getCell(6))) {
            return { isThereWinner: true, indexes: [2, 4, 6] };
        }
        
        return { isThereWinner: false, indexes: [] };
    }

    const getRound = () => {
        return currRound;
    }

    return { changeTurn, isPlayersTurn, prepareNewGame, updateBoard, isCellMarked, debug, getListOfEmptyCellIndexes, checkForWinner, getRound, setGameOver, getGameOver }
})();

export { Rules };