const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('reset-button');
let currentPlayer = 'X';
let gameActive = true;

const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellClick(event) {
    const cell = event.target;
    const index = cell.getAttribute('data-index');
    
    if (cell.textContent || !gameActive || currentPlayer === 'O') return;

    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer);

    if (checkWin()) {
        setTimeout(() => alert(`${currentPlayer} wins!`), 100);
        gameActive = false;
        return;
    }

    if (Array.from(cells).every(cell => cell.textContent)) {
        setTimeout(() => alert("It's a draw!"), 100);
        gameActive = false;
        return;
    }

    currentPlayer = 'O';
    computerMove();
}

function computerMove() {
    const emptyCells = Array.from(cells).filter(cell => !cell.textContent);
    
    if (emptyCells.length === 0) return;

    const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    randomCell.textContent = 'O';
    randomCell.classList.add('O');

    if (checkWin()) {
        setTimeout(() => alert("O wins!"), 100);
        gameActive = false;
        return;
    }

    if (Array.from(cells).every(cell => cell.textContent)) {
        setTimeout(() => alert("It's a draw!"), 100);
        gameActive = false;
        return;
    }

    currentPlayer = 'X';
}

function checkWin() {
    return winConditions.some(condition => {
        const [a, b, c] = condition;
        return cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent;
    });
}

function resetGame() {
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('X', 'O');
    });
    currentPlayer = 'X';
    gameActive = true;
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);
