// Catching canvas element and getting context //
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

// Setting canvas width and height, storing it in variables //
canvas.width = 800;
canvas.height = 600;

const cw = canvas.width;
const ch = canvas.height;

// Ball properties //
const ballSize = 30;
let ballX = cw/2;
let ballY = ch/2;

// Paddle properties //
const paddleWidth = 20;
const paddleHeight = 100;

// Player paddle properties //
const playerPaddleX = 20;
let playerPaddleY = ch/2;

// AI paddle properties //
const aiPaddleX = cw - 40;
let aiPaddleY = ch/2;

function drawTable() {
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, cw, ch);
}

function drawBall() {
  ctx.fillStyle = 'white';
  ctx.fillRect(ballX, ballY, ballSize, ballSize);

}

function drawPlayerPaddle() {
  ctx.fillStyle = 'white';
  ctx.fillRect(playerPaddleX, playerPaddleY, paddleWidth, paddleHeight);
}

function drawAiPaddle() {
  ctx.fillStyle = 'white';
  ctx.fillRect(aiPaddleX, aiPaddleY, paddleWidth, paddleHeight);
}

drawTable();
drawBall();
drawPlayerPaddle();
drawAiPaddle();
