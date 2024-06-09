const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const playerXScoreElement = document.getElementById('playerX');
const playerOScoreElement = document.getElementById('playerO');
const homeButton = document.getElementById('homeButton');

let currentPlayer = 'X';
let playerXScore = 0;
let playerOScore = 0;
let gameActive = true;
let matchCount = 0;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

homeButton.addEventListener('click', () => {
    window.location.href = '../index.html';
});

function handleCellClick(event) {
    const cell = event.target;
    const cellIndex = cell.getAttribute('data-index');

    if (cell.textContent === '' && gameActive) {
        cell.textContent = currentPlayer;
        if (checkWin()) {
            endGame(currentPlayer);
        } else if (isDraw()) {
            endGame(null);
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }
}

function checkWin() {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return cells[index].textContent === currentPlayer;
        });
    });
}

function isDraw() {
    return [...cells].every(cell => cell.textContent !== '');
}

function endGame(winner) {
    gameActive = false;
    matchCount++;

    if (winner) {
        message.textContent = `Player ${winner} wins!`;
        if (winner === 'X') {
            playerXScore++;
        } else {
            playerOScore++;
        }
    } else {
        message.textContent = 'It\'s a draw!';
    }

    updateScoreboard();

    if (matchCount < 3) {
        setTimeout(resetBoard, 2000);
    } else {
        determineOverallWinner();
    }
}

function resetBoard() {
    cells.forEach(cell => cell.textContent = '');
    currentPlayer = 'X';
    gameActive = true;
    message.textContent = '';
}

function updateScoreboard() {
    playerXScoreElement.textContent = `Player X: ${playerXScore}`;
    playerOScoreElement.textContent = `Player O: ${playerOScore}`;
}

function determineOverallWinner() {
    if (playerXScore > playerOScore) {
        message.textContent = 'Player X wins the series!';
    } else if (playerOScore > playerXScore) {
        message.textContent = 'Player O wins the series!';
    } else {
        message.textContent = 'The series ends in a draw!';
    }
}
