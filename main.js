/*******************Retro Pong Game *******************/
/*******************Author: Piotr Szmidt **************/
/******************03.08.2017*************************/


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
const playerPaddleX = 20;
let playerPaddleY = ch/2;

/////// AI paddle properties ///////
const aiPaddleX = cw - paddleWidth - 20;
let aiPaddleY = ch/2;

////// Animation speed //////
const FPS = 60;

///// Canvas offset top /////
let offsetTop = canvas.offsetTop;

////// Scores //////
let playerScore = 0;
let aiScore = 0;
const WIN = 3;

let winScreenShow = false;

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
  if (ballX - ballSize < playerPaddleX + paddleWidth) {
    if (ballY > playerPaddleY && ballY < playerPaddleY + paddleHeight) {
      ballSpeedX = -ballSpeedX;
        
      // Way of controlling the ball in Y axis //
      let deltaY = ballY - (playerPaddleY + paddleHeight/2);
      ballSpeedY = deltaY * .2;
        
      // Ball speeds up a little whenever it bounces off the paddle //
      if(ballSpeedX > 0 ) ballSpeedX += 0.5
      else ballSpeedX -= 0.5
    } 
      // But if it hits lef side of the canvas computer scores
    else {
      aiScore++;
      ballReset();
    }

  }
  // Ball also bounces off the computer's paddle
  if (ballX + ballSize > aiPaddleX) {
    if (ballY > aiPaddleY && ballY < aiPaddleY + paddleHeight) {
      ballSpeedX = -ballSpeedX;
        
      // Way of controlling the ball in Y axis //
      let deltaY = ballY - (aiPaddleY + paddleHeight/2);
      ballSpeedY = deltaY * .2;
        
      // Ball speeds up a little whenever it bounces off the paddle //
      if(ballSpeedX > 0 ) ballSpeedX += 0.5
      else ballSpeedX -= 0.5
    } 
      // If computer misses, player scores a point
    else {
      playerScore++;
      ballReset();
    }

  }
  // If ball touches upper or bottom line of canvas it bounces back //
  if (ballY - ballSize < 0 || ballY + ballSize > ch) {
    ballSpeedY = -ballSpeedY;
  }

}

//// Drawing player's and computer's paddle //////
function drawPlayerPaddle() {
  ctx.fillStyle = 'white';
  ctx.fillRect(playerPaddleX, playerPaddleY, paddleWidth, paddleHeight);
}

function drawAiPaddle() {
  ctx.fillStyle = 'white';
  ctx.fillRect(aiPaddleX, aiPaddleY, paddleWidth, paddleHeight);
}

///// Controlling player's paddle and keeping the paddle inside canvas //////
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


/* When ball leaves the game area */
function ballReset() {
  // If one of the players won the game 
  if(playerScore >= WIN || aiScore >= WIN) {
      winScreenShow = true;
  }
  ballSpeedX = -ballSpeedX;
    
  // Reseting the X speed of the ball //
  if(ballSpeedX > 0) ballSpeedX = 3;
  else ballSpeedX = -3;
    
  ballSpeedY = -ballSpeedY;
  if (ballSpeedY > 0) ballSpeedY = 3;
  else ballSpeedY = -3;
  // Ball moves from the center of canvas element //
  ballX = cw/2;
  ballY = ch/2;
    
}

//// Shows player and computer score ///////
function drawScore() {
  ctx.font = '60px Arial';
  ctx.fillText(playerScore, cw/4, ch/2);
  ctx.fillText(aiScore, cw - cw/4, ch/2);

}

//// Main function, wraps all together for interval /////
function game() {
  if (winScreenShow) {
      ctx.fillStyle = 'white';
      ctx.fillText('Game Over', 250, 200);
      if (playerScore >= WIN) {
          ctx.fillText('You win!', 220, 400);
      } else if (aiScore >= WIN) {
          ctx.fillText('Computer wins!', 210, 400);
      }
      ctx.fillText('Click to play again', 180, 470);
      return;
      
  }
  drawTable();
  drawBall();
  drawPlayerPaddle();
  drawAiPaddle();
  computerMove();
  drawScore();
}

///// Event for controling player's paddle /////
canvas.addEventListener('mousemove', playerMove);

setInterval(game, 1000 / FPS);



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
