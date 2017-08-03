////// Catching canvas element and getting context //////
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

/////// Setting canvas width and height, storing it in variables ///////
canvas.width = 800;
canvas.height = 600;
const cw = canvas.width;
const ch = canvas.height;

/////// Ball properties ///////
const ballSize = 10;
let ballX = cw/2;
let ballY = ch/2;

let ballSpeedX = 3;
let ballSpeedY = 3;

/////// Paddle properties ////////
const paddleWidth = 20;
const paddleHeight = 100;

/////// Player paddle properties ///////
const playerPaddleX = 0;
let playerPaddleY = ch/2;

/////// AI paddle properties ///////
const aiPaddleX = cw - paddleWidth;
let aiPaddleY = ch/2;

////// Animation speed //////
const fps = 60;

///// Canvas offset top /////
let offsetTop = canvas.offsetTop;

///// Drawing black table //////
function drawTable() {
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, cw, ch);
}

////// Drawing the ball //////
function drawBall() {
  ctx.fillStyle = 'white'; // Ball color
  ctx.beginPath();
  ctx.arc(ballX, ballY, ballSize, 0, Math.PI*2, true); // Ball shape
  ctx.fill();
  // Animating the ball in X and Y axis
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  ///// Collision detection ///////
  // Ball bounces off the player's paddle
  if (ballX - ballSize < 0) {
    if (ballY > playerPaddleY && ballY < playerPaddleY + paddleHeight) {
      ballSpeedX = -ballSpeedX;
    } else {
      // But if it hits lef side of the canvas computer scores
      ballReset();
    }

  }
  // Ball also bounces off the computer's paddle
  if (ballX + ballSize > cw) {
    if (ballY > aiPaddleY && ballY < aiPaddleY + paddleHeight) {
      ballSpeedX = -ballSpeedX;
      // If computer misses, player scores a point
    } else {
      ballReset();
    }

  }
  // If ball touches upper or bottom line of canvas it bounces back //
  if (ballY - ballSize < 0 || ballY + ballSize > ch) {
    ballSpeedY = -ballSpeedY;
  }

}

function drawPlayerPaddle() {
  ctx.fillStyle = 'white';
  ctx.fillRect(playerPaddleX, playerPaddleY, paddleWidth, paddleHeight);
}

function drawAiPaddle() {
  ctx.fillStyle = 'white';
  ctx.fillRect(aiPaddleX, aiPaddleY, paddleWidth, paddleHeight);
}

function playerMove(e) {
  playerPaddleY = e.clientY - offsetTop - paddleHeight/2;
  if (playerPaddleY < 0) {
    playerPaddleY = 0;
  }
  if (playerPaddleY > ch - paddleHeight) {
    playerPaddleY = ch - paddleHeight;
  }
}

//////// AI Setup ///////
function computerMove() {
  if (aiPaddleY + paddleHeight/2 < ballY - 40) {
    aiPaddleY += 5;
  } else if (aiPaddleY + paddleHeight/2 > ballY + 40){
    aiPaddleY -= 5;
  }
}


/* When ball leaves the game area,
this function sets ball position in the center of canvas */
function ballReset() {
  ballSpeedX = -ballSpeedX;
  ballX = cw/2;
  ballY = ch/2;
}

// Testing AI paddle movement //
/*function playerMove(e) {
  aiPaddleY = e.clientY - offsetTop - paddleHeight/2;
  if (aiPaddleY < 0) {
    aiPaddleY = 0;
  }
  if (aiPaddleY > ch - paddleHeight) {
    aiPaddleY = ch - paddleHeight;
  }
}*/

function game() {
  drawTable();
  drawBall();
  drawPlayerPaddle();
  drawAiPaddle();
  computerMove();
}

canvas.addEventListener('mousemove', playerMove);

setInterval(game, 1000 / fps);
