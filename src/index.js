import { Rules } from './Rules.js'
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";

    /* Helper functions */
function getRandomCell(max) {
    return Math.floor(Math.random() * Math.floor(max));
}
function setAlert(text, alertType) {
    let divAlert = document.getElementById('alert');
    let alert = divAlert.firstElementChild
    alert.textContent = text;
    
    // Change background color to appropriately match message being displayed
    if (divAlert.classList.contains('alert-secondary')) {
        divAlert.classList.remove('alert-secondary');
    }
    else if (divAlert.classList.contains('alert-success')) {
        divAlert.classList.remove('alert-success');
    }
    else if (divAlert.classList.contains('alert-danger')) {
        divAlert.classList.remove('alert-danger');
    }
    else if (divAlert.classList.contains('alert-warning')) {
        divAlert.classList.remove('alert-warning');
    }

    divAlert.classList.add(alertType);
}
function gameOver(info, text, alertType) {
    // Run when game isn't tied
    if (text != 'Tie!') {
        // Set winning cells to appropriate colors
        let color = 'white';
        if (text == 'You win!') {
            color = 'green';
        }
        else if (text == 'You lose!') {
            color = 'red';
        }
        for (let i = 0; i < info.indexes.length; i++) {
            cells[info.indexes[i]].style.backgroundColor = color;
        }
    }

    setAlert(text, alertType); // Sets alert to display win condition

    // Disables cells
    Rules.setGameOver();
    cells.forEach((cell) => {
        cell.style.cursor = 'not-allowed';
    });
}
function aiMove(listOfEmptyCellIndexes) {
    // Get random cell (ALGORITHM GOES HERE)
    let randomCellIndex = listOfEmptyCellIndexes[getRandomCell(listOfEmptyCellIndexes.length)]
    let randomCell = cells[randomCellIndex];

    // Set cell and update board
    randomCell.style.cursor = 'not-allowed';
    randomCell.textContent = 'o';
    Rules.updateBoard(randomCell, 'o');
    
    // Change turns to let player make a move
    Rules.changeTurn();

    return Rules.checkForWinner();
}

    /* Event listeners */
function onCellClick(e) {
    // Check if players turn and if table cell is marked
    if (!Rules.getGameOver() && Rules.isPlayersTurn() && !Rules.isCellMarked(this)) {
        // Set cell and update board
        this.style.cursor = 'not-allowed';
        this.textContent = 'x';
        Rules.updateBoard(this, 'x');

        // Check for winner if board has at least 5 marked cells
        if (Rules.getRound() >= 5) {
            let info = Rules.checkForWinner();
            if (info.isThereWinner) {
                gameOver(info, 'You win!', 'alert-success'); // Game ends with you winning
                return 0;
            }
        }
        
        // Get list of empty cell indexes
        let listOfEmptyCellIndexes = Rules.getListOfEmptyCellIndexes();

        // Check if board is filled
        if (listOfEmptyCellIndexes.length == 0) {
            gameOver([], 'Tie!', 'alert-warning'); // Game ends in a tie
            return 0;
        }
        else {
            // Change turns to let AI make a move
            Rules.changeTurn();
            let info = aiMove(listOfEmptyCellIndexes);
            if (info.isThereWinner) {
                gameOver(info, 'You lose!', 'alert-danger'); // Game ends with you losing
                return 0;
            }
        }

        // Print board to console
        //Rules.debug();
    }
}
function onNewGameClick(e) {
    // Clears all table cells
    cells.forEach(cell => {
        cell.style.backgroundColor = '#343a40';
        cell.style.cursor = 'pointer';
        cell.textContent = "\0"; // Empty char
    });

    // Writes over alert
    setAlert('Welcome to', 'alert-secondary');

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