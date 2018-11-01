/**
 * constants for the player and ai characters and 
 */
const HUMAN_PLAYER = 'O';
const AI_PLAYER = 'X'

/**
 * constant for all possible win paths
 */
const WIN_COMBOS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [6, 4, 2]
];

/**
 * constant for all the spaces in the game board
 */
const CELLS = document.querySelectorAll('.cell');

/**
 * variable to contain the game board
 */
var originalBoard;

/**
 * call the function to start the game
 */
startGame();

/**
 * function to start the game
 *  resets the game board
 *  wires up the click events on the game board
 */
function startGame() { 
    /* close the dialog if open */
    document.querySelector('.endgame').style.display = 'none';
    /* create an array from 0 - 8 */
    originalBoard = Array.from(Array(9).keys());

    /* clear the text and color for each cell, then add the event listener */
    CELLS.forEach(cell => {
        cell.innerText = '';
        cell.style.removeProperty('background-color');
        cell.addEventListener('click', cellClicked, false);
    });

}

/**
 * function to process when the user clicks a cell
 * @param {*} event 
 */
function cellClicked(event) { 
    /* only process the click if the space is empty (ie. the cell#id is a number) */
    if (typeof originalBoard[event.target.id] === 'number') { 
        /* call function to process the move */
        processMove(event.target.id, HUMAN_PLAYER);
    
        /* check to see if the game is tied */
        if (!isGameTied() && emptyCells().length > 0) { 
            /* if the game is still going, process the ai's turn */
            processMove(aiMove(), AI_PLAYER);
        }
    }   
}

/**
 * function to process a player's move
 *  once processed, check to see if that player won
 * @param {*} cellId 
 * @param {*} player 
 */
function processMove(cellId, player) { 
    /* set the cell#id and cell.innerText to the player that is passed in */
    originalBoard[cellId] = player;
    document.getElementById(cellId).innerText = player;

    /* check to see if the game was won */
    let gameWon = checkWin(originalBoard, player);

    /* if the game was won, call the gameOver function */
    if (gameWon) { 
        gameOver(gameWon);
    } 
}

/**
 * function to see if a player has won the game
 * @param {*} board 
 * @param {*} player 
 */
function checkWin(board, player) { 
    /* get all cells the player has played in */
    let plays = board.reduce((arr, el, i) => (el === player) ? arr.concat(i) : arr, []);

    /* set the gameWon flag */
    let gameWon = null;

    /* loop through all possible win combinations and check against 
        all cells the player has played in */
    WIN_COMBOS.forEach((combo, index) => {
        if (combo.every(el => plays.indexOf(el) > -1)) { 
            gameWon = { index: index, player: player };
        }
    });

    /* return the result */
    return gameWon;
}

/**
 * function to end the game
 *  it highlights the winning combo
 *  then opens the endGame dialog
 * @param {*} gameWon 
 */
function gameOver(gameWon) { 
    /* loop through the winning combo index and highlight the cells */
    WIN_COMBOS[gameWon.index].forEach((cell) => {
        /* highlight blue for player win and red for ai win */
        document.getElementById(cell).style.backgroundColor = gameWon.player === HUMAN_PLAYER ? '#0000e6' : '#cc0000';
    });

    /* loop through all cells and remove the eventListener (ie. make it so user can't click the cells) */
    CELLS.forEach((cell) => {
        cell.removeEventListener('click', cellClicked, false);
    });

    /* call function that displays endGame dialog */
    declareWinner(gameWon.player);
}

/**
 * function to check if the game is tied 
 *  (ie. no empty spaces and no winner)
 */
function isGameTied() { 
    /* if there are no empty cells AND the human player has not won
        (only checking the human player because the human player will have 
            have the last move in a true tie) */
    if (emptyCells().length === 0 && !checkWin(originalBoard, HUMAN_PLAYER)) { 
        /* loop through all the cells and add a green color and remove eventListeners */
        CELLS.forEach((cell, index) => { 
            cell.style.backgroundColor = '#00cc00';
            cell.removeEventListener('click', cellClicked, false);
        });
        /* call function that displays endGame dialog */
        declareWinner('tied');

        /* return true (because the game is tied) to the caller */
        return true;
    } 
    
    /* return false (because the game is not tied) to the caller */
    return false;
}

/**
 * function to return a cell#id for the ai player to select
 */
function aiMove() { 
    /* return the index of the cell the ai thinks is the best move */
    return minimax(originalBoard, AI_PLAYER).index;
}

/**
 * function to return all empty cells
 */
function emptyCells() { 
    return originalBoard.filter(cell => typeof cell === 'number');
}

/**
 * function to display the dialog with the passed in message 
 *  and update the running score
 * @param {*} message 
 */
function declareWinner(player) { 
    let message;
    let elmentId;

    if (player === HUMAN_PLAYER) { 
        message = 'You won!';
        elmentId = 'playerScore';
    } else if (player === AI_PLAYER) { 
        message = 'You lost :(';
        elmentId = 'aiScore';
    } else { 
        message = 'You tied';
        elmentId = 'tiedScore';
    }

    let scoreElement = document.querySelector('.score#'+elmentId);
    let previousScore = +scoreElement.innerText;

    scoreElement.innerHTML = ++previousScore;

    document.querySelector('.endgame').style.display = 'block';
    document.querySelector('.endgame .text').innerText = message;
}

/**
 * recursive function to determine the best possible move path
 * @param {*} newBoard 
 * @param {*} player 
 */
function minimax(newBoard, player) { 
    /* store the avialable cells from the passed in board */
    var availableCells = emptyCells(newBoard);

    /* check to see if the passed in board has a winner.
        set the score (weight) based on who won 
        (this is in favor of the ai player since the human has 
            free will to make a move) */
    if (checkWin(newBoard, player)) { 
        /* return -10 because a human player win is bad for the ai player */
        return { score: -10 };
    } else if (checkWin(newBoard, AI_PLAYER)) { 
        /* return 10 because the ai player won (which is good for the ai) */
        return { score: 10 };
    } else if (availableCells.length === 0) { 
        /* return 0 because a tie doesn't really appeal to the ai */
        return { score: 0 };
    }

    /* create an empty array to hold all possible moves */
    var moves = [];

    /* loop through avialable cells */
    availableCells.forEach((cell) => {
        /* create move variable to later push into moves array */
        var move = {};
        move.index = newBoard[cell];

        /* move the player into the next cell in the loop */
        newBoard[cell] = player;

        /* if the player is AI */
        if (player === AI_PLAYER) { 
            /* recursively call minimax until a score is received */
            var result = minimax(newBoard, HUMAN_PLAYER);
            /* once a score is received, add it to the move variable */
            move.score = result.score;
        } else { 
            /* recursively call minimax until a score is received */
            var result = minimax(newBoard, AI_PLAYER);
            /* once a score is received, add it to the move variable */
            move.score = result.score;
        }

        /* set the passed in board's cell to the move's index */
        newBoard[cell] = move.index;

        /* push the move into the moves array */
        moves.push(move);
    });

    /* hold on to the best move */
    let bestMove;

    /* if the player passed is was the AI */
    if (player === AI_PLAYER) { 
        /* need a really big negative number to start */
        var bestScore = -10000;
        /* loop through the array and moves and find the one with the highest score */
        moves.forEach((move, index) => {
            if (move.score > bestScore) { 
                bestScore = move.score;
                bestMove = index;
            }
        });
    } else { 
        /* need a really big positive number to start */
        var bestScore = 10000;
        /* loop through the array and moves and find the one with the lowest score */
        moves.forEach((move, index) => {
            if (move.score < bestScore) { 
                bestScore = move.score;
                bestMove = index;
            }
        });
    }

    /* return the best move for the AI */
    return moves[bestMove];
}