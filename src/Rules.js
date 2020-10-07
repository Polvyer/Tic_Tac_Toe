import { GameBoard } from './GameBoard.js'

// Rules Object
const Rules = (() => {
    let playersTurn = true; // Player goes first

    // Private functions
    const getCellIndex = (cell) => {
        return (parseInt(cell.getAttribute('id'), 10));
    }

    // Public functions
    const changeTurn = () => {
        playersTurn = playersTurn ? false : true;
    }

    const isPlayersTurn = () => {
        return playersTurn;
    }

    const prepareNewGame = () => {
        playersTurn = true;     // Player goes first
        GameBoard.clearBoard();
    }

    const updateBoard = (cell, symbol) => {
        let cellIndex = getCellIndex(cell);
        GameBoard.setCell(cellIndex, symbol);
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

    return { changeTurn, isPlayersTurn, prepareNewGame, updateBoard, isCellMarked, debug, getListOfEmptyCellIndexes }
})();

export { Rules };