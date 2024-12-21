const board = document.getElementById('board');
const cells = document.querySelectorAll('[data-cell]');
const restartBtn = document.getElementById('restartBtn');
const message = document.getElementById('message');

let currentPlayer = 'X';
let gameActive = true;
let gameState = ['', '', '', '', '', '', '', '', ''];

// Check for a winner
const checkWinner = () => {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // horizontal
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // vertical
        [0, 4, 8], [2, 4, 6] // diagonal
    ];

    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            gameActive = false;
            message.textContent = `${currentPlayer} Wins!`;
            return;
        }
    }

    if (!gameState.includes('')) {
        gameActive = false;
        message.textContent = 'It\'s a Draw!';
    }
};

// Handle cell click
const handleCellClick = (e) => {
    const cell = e.target;
    const index = Array.from(cells).indexOf(cell);

    if (gameState[index] || !gameActive) return;

    gameState[index] = currentPlayer;
    cell.textContent = currentPlayer;

    checkWinner();

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
};

// Restart the game
const restartGame = () => {
    gameState = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    cells.forEach(cell => cell.textContent = '');
    message.textContent = '';
};

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartBtn.addEventListener('click', restartGame);
