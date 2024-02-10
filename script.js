let player1Name, player2Name;
let currentPlayer, currentTurn;
let gameBoard, gameActive;

function startGame() {
    player1Name = document.getElementById('player1').value || 'Player 1';
    player2Name = document.getElementById('player2').value || 'Player 2';
    
    currentPlayer = 'X';
    currentTurn = 1;
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;

    updateStatus(`It's ${player1Name}'s turn`);
}

function makeMove(index) {
    if (!gameActive) return;

    if (gameBoard[index] === '') {
        gameBoard[index] = currentPlayer;
        document.getElementsByClassName('cell')[index].innerText = currentPlayer;

        if (checkWinner()) {
            updateStatus(`${getCurrentPlayerName()} wins!`);
            gameActive = false;
        } else if (gameBoard.every(cell => cell !== '')) {
            updateStatus("It's a tie!");
            gameActive = false;
        } else {
            currentTurn++;
            currentPlayer = currentTurn % 2 === 1 ? 'X' : 'O';
            updateStatus(`It's ${getCurrentPlayerName()}'s turn`);
        }
    }
}

function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        return gameBoard[a] !== '' && gameBoard[a] === gameBoard[b] && gameBoard[b] === gameBoard[c];
    });
}

function resetGame() {
    document.getElementById('player1').value = '';
    document.getElementById('player2').value = '';
    document.getElementById('status').innerText = 'Enter player names and start the game!';

    document.querySelectorAll('.cell').forEach(cell => {
        cell.innerText = '';
        cell.style.backgroundColor = '#fff';
    });
}

function updateStatus(message) {
    document.getElementById('status').innerText = message;
}

function getCurrentPlayerName() {
    return currentPlayer === 'X' ? player1Name : player2Name;
}
