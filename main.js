// Catching canvas element and getting context //
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

// Setting canvas width and height, storing it in variables //
canvas.width = 800;
canvas.height = 600;
const cw = canvas.width;
const ch = canvas.height;

// Ball properties //
const ballSize = 10;
let ballX = cw/2;
let ballY = ch/2;

let ballSpeedX = 5;
let ballSpeedY = 5;

// Paddle properties //
const paddleWidth = 20;
const paddleHeight = 100;

// Player paddle properties //
const playerPaddleX = 20;
let playerPaddleY = ch/2;

// AI paddle properties //
const aiPaddleX = cw - 40;
let aiPaddleY = ch/2;

// Game speed //
const fps = 60;

// Drawing black table //
function drawTable() {
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, cw, ch);
}

// Drawing the ball //
function drawBall() {
  ctx.fillStyle = 'white'; // Ball color
  ctx.beginPath();
  ctx.arc(ballX, ballY, ballSize, 0, Math.PI*2, true); // Ball shape
  ctx.fill();
  // Moving the ball in X and Y axis
  ballX += ballSpeedX;
  ballY += ballSpeedY;
  if (ballX - ballSize < 0 || ballX + ballSize > cw) {
    ballSpeedX = -ballSpeedX;
  }
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

function game() {
  drawTable();
  drawBall();
  drawPlayerPaddle();
  drawAiPaddle();
}

setInterval(game, 1000 / fps);
