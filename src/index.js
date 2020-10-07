import { Rules } from './Rules.js'

    /* Helper functions */
function getRandomCell(max) {
    return Math.floor(Math.random() * Math.floor(max));
}
function aiMove(listOfEmptyCellIndexes) {
    // Get random cell (ALGORITHM GOES HERE)
    console.table(listOfEmptyCellIndexes);
    let randomCellIndex = listOfEmptyCellIndexes[getRandomCell(listOfEmptyCellIndexes.length)]
    let randomCell = cells[randomCellIndex];

    // Set cell and update board
    randomCell.style.cursor = 'not-allowed';
    randomCell.textContent = 'o';
    Rules.updateBoard(randomCell, 'o');
    
    // Change turns to let Player make a move
    Rules.changeTurn();
}

    /* Event listeners */
function onCellClick(e) {
    // Check if players turn and if table cell is marked
    if (Rules.isPlayersTurn() && !Rules.isCellMarked(this)) {
        // Set cell and update board
        this.style.cursor = 'not-allowed';
        this.textContent = 'x';
        Rules.updateBoard(this, 'x');
        
        // Get list of empty cell indexes
        let listOfEmptyCellIndexes = Rules.getListOfEmptyCellIndexes();

        // Check if game is over
        if (listOfEmptyCellIndexes.length == 0) {
            console.log('Game over!');
        }
        else {
            // Change turns to let AI make a move
            Rules.changeTurn();
            aiMove(listOfEmptyCellIndexes);
        }

        // Print board to console
        Rules.debug();
    }
}
function onNewGameClick(e) {
    // Clears all table cells
    cells.forEach(cell => {
        cell.style.cursor = 'pointer';
        cell.textContent = "\0"; // Empty char
    });

    // Start new game
    Rules.prepareNewGame();
}

// Get all table cells and attach 'click' listeners
const cells = document.querySelectorAll('td');
cells.forEach((cell) => {
    cell.addEventListener('click', onCellClick);
});

// Get new game button and attach a 'click' listener
const newGameBtn = document.querySelector('button');
newGameBtn.addEventListener('click', onNewGameClick);