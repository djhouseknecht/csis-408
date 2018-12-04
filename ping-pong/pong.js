/* global constants */
const WIDTH = 700, 
    HEIGHT = 700, 
    PI = Math.PI;

const UP_ARROW = 38,
    DOWN_ARROW = 40;

const PLAYER_SPEED = 7;
const BALL_SPEED = 10;
const PADDLE_WIDTH = 20,
    PADDLE_HEIGHT = 100;

/* global variables */
var canvas, cix, keystate;
var player, ai, ball;

/* initialize the player object */
player = { 
    /* player's score */
    score: 0,
    /* x and y position */
    x: null,
    y: null,
    /* size of paddle */
    width: PADDLE_WIDTH,
    height: PADDLE_HEIGHT,
    /* function to move player's paddle up and down */
    update: function() { 
        /* move up and down based on arrow key press */
        if (keystate[UP_ARROW]) this.y -= PLAYER_SPEED;
        if (keystate[DOWN_ARROW]) this.y += PLAYER_SPEED;
        /* don't allow the paddle to go beyond the edge of the canvas */
        this.y = Math.max(Math.min(this.y, HEIGHT - this.height), 0);
    },
    /* function to draw paddle on canvas */
    draw: function() { 
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
};

/* initialize the ai object */
ai = { 
    /* ai's score */
    score: 0,
    /* x and y position */
    x: null,
    y: null,
    /* size of paddle */
    width: PADDLE_WIDTH,
    height: PADDLE_HEIGHT,
    /* function to move ai's paddle up and down to follow the ball*/
    update: function() {
        /* follow the movement of the ball */
        var desty = ball.y - (this.height - ball.side) * .5;
        this.y += (desty - this.y) * .1;
        /* don't allow the paddle to go beyond the edge of the canvas */
        this.y = Math.max(Math.min(this.y, HEIGHT - this.height), 0);
    },
    /* function to draw paddle on canvas */
    draw: function() { 
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
};

/* initialize the ball */
ball = { 
    /* x and y position */
    x: null,
    y: null,
    /* velocity of the ball */
    vel: null,
    /* size of ball */
    side: 20,
    /* speed of the ball */
    speed: BALL_SPEED,
    /* function to serve the ball. Serves from the side passed in */
    serve: function(side) { 
        /* select a random position for the ball to start */
        var r = Math.random();
        this.x = side === 1 ? player.x + player.width : ai.x - this.side;
        this.y = (HEIGHT - this.side) * r;
        /* set the velocity and projection of the ball */
        var phi = .1 * PI * (1 - 2 * r);
        this.vel = {
            x: side * this.speed * Math.cos(phi),
            y: this.speed * Math.sin(phi)
        }
    },
    /**
     * Function to move the ball. It also checks to see if the new ball position
     *  hits a side. If yes, it issues a point and serves the ball again
     */
    update: function() { 
        /* set new x and y based on velocity's x and y */
        this.x += this.vel.x;
        this.y += this.vel.y;

        /* Cause the ball to bounce if it hits the top or bottom */
        if (0 > this.y || this.y + this.side > HEIGHT) { 
            var offset = this.vel.y < 0 ? 0 - this.y : HEIGHT - (this.y + this.side);
            this.y += 2 * offset;
            this.vel.y *= -1;
        }

        /* function to determine an intersection between a paddle and the ball */
        var AABBIntersect = function(ax, ay, aw, ah, bx, by, bw, bh) { 
            return ax < bx + bw 
                && ay < by + bh
                && bx < ax + aw
                && by < ay + ah;
        };

        /* set the paddle and direction the ball was going */
        var paddle = this.vel.x < 0 ? player : ai;
        var direction = paddle === player ? 1 : -1;

        /* determine if the ball is coming into contact with a paddle */
        if (AABBIntersect(paddle.x, paddle.y, paddle.width, paddle.height, this.x, this.y, this.side, this.side)) { 
            /* set ball's x and velocity */
            this.x = paddle === player ? player.x + player.width : ai.x - this.side;
            var n = (this.y + this.side - paddle.y) / (paddle.height + this.side);
            var phi = .25 * PI * (2 * n - 1);

            /* set a speed if there was a "smash" */
            var smash = Math.abs(phi) > .2 * PI ? 1.5 : 1;
            /* set the velocity of the ball */
            this.vel.x = smash * (direction) * this.speed * Math.cos(phi);
            this.vel.y = smash * this.speed * Math.sin(phi);
        }

        /* if the ball hit an edge */
        if (0 > this.x + this.side || this.x > WIDTH) { 
            /* issue a point to the one who scored */
            if (paddle === player) ai.score++;
            else player.score++;

            /* update the score board */
            updateScoreBoard();

            /* serve a new round */
            this.serve(direction);
        }
    },
    /* function to draw ball on canvas */
    draw: function() { 
        ctx.fillRect(this.x, this.y, this.side, this.side);
    }
};

/* update the score board with the player/ai's current points */
function updateScoreBoard() { 
    /* select table cells */
    var playerScore = document.getElementById('playerScore');
    var aiScore = document.getElementById('aiScore');
    /* update the html */
    playerScore.innerHTML = player.score.toString();
    aiScore.innerHTML = ai.score.toString();
}

/**
 * Function to bootstrap the game. 
 *  Create the canvas
 *  Wire up event listeners for up and down arrow keys
 *  Request animation frame to update and draw the paddles and ball
 */
function main() {
    /* create canvas and get the context */
    canvas = document.createElement('canvas');
    canvas.width = WIDTH;
    canvas.height = HEIGHT;
    ctx = canvas.getContext('2d');
    document.body.appendChild(canvas);

    /* set up event listeners for up and down arrow keys */
    keystate = {};
    document.addEventListener('keydown', function (evt) {
        keystate[evt.keyCode] = true;
    });
    document.addEventListener('keyup', function(evt) {
        delete keystate[evt.keyCode];
    });

    /* call the initialization method (only gets called once) */
    init();

    /* setup the loop function to request the animation frame against the canvas */
    var loop = function() { 
        /* call update, draw, and request animation */
        update();
        draw();
        window.requestAnimationFrame(loop, canvas);
    }
    /* call the animation for the first time and pass in the loop and canvas */
    window.requestAnimationFrame(loop, canvas);
}

/**
 * Initialize the paddles, ball, and score baord.
 * Serve the ball
 */
function init() { 
    /* set the player paddle location */
    player.x = player.width;
    player.y = (HEIGHT - player.height) / 2;

    /* set the ai paddle location */
    ai.x = WIDTH - (player.width + ai.width);
    ai.y = (HEIGHT - ai.height) / 2;

    /* update score board */
    updateScoreBoard();

    /* serve the ball to start a round */
    ball.serve(1);
}

/* global function to call the update function on the ball, player, and ai objects */
function update() { 
    ball.update();
    player.update();
    ai.update();
}

/**
 * Function to draw the player, ai, and ball on the canvas
 *  It also colors the canvas and draws a net
 */
function draw() { 
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    ctx.save();

    ctx.fillStyle = '#FFF';
    ball.draw();
    player.draw();
    ai.draw();

    var netWidth = 4;
    var netX = (WIDTH - netWidth) * .5;
    var netY = 0;
    var step = HEIGHT / 20;
    while(netY < HEIGHT) { 
        ctx.fillRect(netX, netY + step * .25, netWidth, step * .5);
        netY += step;
    }

    ctx.restore();
}

/* after everything is defined, call the main function to start the game */
main();