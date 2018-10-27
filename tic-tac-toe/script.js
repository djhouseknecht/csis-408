var originalBoard;
const humanPlayer = 'O';
const aiPlayer = 'X'
const winCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [6, 4, 2]
];

const cells = document.querySelectorAll('.cell');
startGame();

function startGame() { 
    document.querySelector('.endgame').style.display = 'none';
    /* create an array from 0 - 8 */
    originalBoard = Array.from(Array(9).keys());

    cells.forEach(cell => {
        cell.innerText = '';
        cell.style.removeProperty('background-color');
        cell.addEventListener('click', cellClicked, false);
    });

}

function cellClicked(event) { 
    if (typeof originalBoard[event.target.id] === 'number') { 
        processMove(event.target.id, humanPlayer);
    
        if (!isGameTied() && emptySquares().length > 0) { 
            processMove(aiMove(), aiPlayer);
        }
    }   
}

function processMove(cellId, player) { 
    originalBoard[cellId] = player;
    document.getElementById(cellId).innerText = player;
    let gameWon = checkWin(originalBoard, player);
    if (gameWon) { 
        gameOver(gameWon);
    } 
}

function checkWin(board, player) { 
    let plays = board.reduce((arr, el, i) => (el === player) ? arr.concat(i) : arr, []);
    let gameWon = null;

    winCombos.forEach((combo, index) => {
        if (combo.every(el => plays.indexOf(el) > -1)) { 
            gameWon = { index: index, player: player };
        }
    });

    return gameWon;
}

function gameOver(gameWon) { 
    winCombos[gameWon.index].forEach((cell) => {
        document.getElementById(cell).style.backgroundColor = gameWon.player === humanPlayer ? 'blue' : 'red';
    });

    cells.forEach((cell) => {
        cell.removeEventListener('click', cellClicked, false);
    });
    declareWinner(gameWon.player === humanPlayer ? 'You win!' : 'You lose');
}

function isGameTied() { 
    if (emptySquares().length === 0 && !checkWin(originalBoard, humanPlayer)) { 
        cells.forEach((cell, index) => { 
            cell.style.backgroundColor = 'green';
            cell.removeEventListener('click', cellClicked, false);
        });
        declareWinner('Tie game!');
        return true;
    } 
    return false;
}

function aiMove() { 
    return minimax(originalBoard, aiPlayer).index;//emptySquares()[0];
}

function emptySquares() { 
    return originalBoard.filter(cell => typeof cell === 'number');
}

function declareWinner(message) { 
    document.querySelector('.endgame').style.display = 'block';
    document.querySelector('.endgame .text').innerText = message;
}

function minimax(newBoard, player) { 
    var availSpots = emptySquares(newBoard);

    if (checkWin(newBoard, player)) { 
        return { score: -10 };
    } else if (checkWin(newBoard, aiPlayer)) { 
        return { score: 10 };
    } else if (availSpots.length === 0) { 
        return { score: 0 };
    }

    var moves = [];
    availSpots.forEach((spot, index) => {
        var move = {};
        move.index = newBoard[spot];
        newBoard[spot] = player;

        if (player === aiPlayer) { 
            var result = minimax(newBoard, humanPlayer);
            move.score = result.score;
        } else { 
            var result = minimax(newBoard, aiPlayer);
            move.score = result.score;
        }

        newBoard[spot] = move.index;
        moves.push(move);
    });

    let bestMove;
    if (player === aiPlayer) { 
        var bestScore = -10000;
        moves.forEach((move, index) => {
            if (move.score > bestScore) { 
                bestScore = move.score;
                bestMove = index;
            }
        });
    } else { 
        var bestScore = 10000;
        moves.forEach((move, index) => {
            if (move.score < bestScore) { 
                bestScore = move.score;
                bestMove = index;
            }
        });
    }

    return moves[bestMove];
}