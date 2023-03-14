const WIDTH = 800;
const HEIGHT = 600;
const paddleWidth = 20;
const paddleHeight = 100;
const FPS = 20;
let paddleX = 20;
let paddleY = HEIGHT / 2 - paddleHeight;
let isOver = false;
let player1Score = 0;
let player2Score = 0;
let enemyPaddleX = WIDTH - 40;
let enemyPaddleY = HEIGHT / 2 - paddleHeight;
const ballSpeed = 10;
const paddleSpeed = 40;

let ballRadius = ballSpeed;
let ballX = WIDTH / 2 - ballRadius * 2;
let ballY = HEIGHT / 2 - ballRadius * 2;

let xDirection = "left";
let yDirection = "up";

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

function resetPaddlePosition() {
  paddleX = 20;
  paddleY = HEIGHT / 2 - paddleHeight;

  enemyPaddleX = WIDTH - paddleWidth * 2;
  enemyPaddleY = HEIGHT / 2 - paddleHeight;
}
function resetBall() {
  ballX = WIDTH / 2 - ballRadius * 2;
  ballY = HEIGHT / 2 - ballRadius * 2;
}

function draw() {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);

  ctx.font = "24px serif";
  ctx.fillText(`Player1 Score: ${player1Score}`, 10, 50);

  ctx.font = "24px serif";
  ctx.fillText(`Player2 Score: ${player2Score}`, WIDTH - 175, 50);

  ctx.fillRect(paddleX, paddleY, paddleWidth, paddleHeight);

  ctx.fillRect(enemyPaddleX, enemyPaddleY, paddleWidth, paddleHeight);

  ctx.beginPath();
  ctx.arc(ballX, ballY, ballRadius, 0, 2 * Math.PI, false);
  ctx.fillStyle = "black";
  ctx.fill();
  ctx.lineWidth = 5;
  ctx.strokeStyle = "#003300";
  ctx.stroke();
}

function checkCollision() {
  if (ballY + ballRadius == HEIGHT) {
    yDirection = "up";
  }
  if (ballY - 10 <= 0) {
    yDirection = "down";
  }

  if (
    enemyPaddleX == ballX - ballRadius &&
    ballY - ballRadius == enemyPaddleY + paddleHeight
  ) {
    yDirection = "down";
    xDirection = "left";
  }
  if (enemyPaddleX == ballX && ballY == enemyPaddleY) {
    yDirection = "up";
    xDirection = "left";
  }

  if (
    paddleX == ballX - ballRadius &&
    ballY + ballRadius == paddleY + paddleHeight
  ) {
    yDirection = "up";
    xDirection = "right";
  }
  if (
    paddleX == ballX - ballRadius &&
    ballY - ballRadius == paddleY + paddleHeight
  ) {
    yDirection = "down";
    xDirection = "right";
  }
  if (
    paddleX + paddleWidth == ballX - ballRadius &&
    ballY + ballRadius >= paddleY &&
    ballY + ballRadius <= paddleY + paddleHeight
  ) {
    xDirection = "right";
  }
  if (
    enemyPaddleX === ballX + ballRadius &&
    ballY >= enemyPaddleY &&
    ballY <= enemyPaddleY + paddleHeight
  ) {
    xDirection = "left";
  }
}

setInterval(update, 1000 / FPS);

function update() {
  if (!isOver) {
    if (xDirection === "left") {
      ballX -= ballSpeed;
    }
    if (xDirection === "right") {
      ballX += ballSpeed;
    }
    if (yDirection === "up") {
      ballY -= ballSpeed;
    }
    if (yDirection === "down") {
      ballY += ballSpeed;
    }
    draw();
    checkCollision();
    if (player1Score == 5 || player2Score == 5) {
      isOver = true;
    }
    if (ballX < 0) {
      player2Score++;
      resetPaddlePosition();
      resetBall();
    }
    if (ballX > WIDTH) {
      player1Score++;

      resetBall();
      resetPaddlePosition();
    }
  } else {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    ctx.font = "100px serif";
    ctx.fillText(`Game over!`, WIDTH / 2 - 250, HEIGHT / 2);
    clearInterval();
  }
}

window.addEventListener("keydown", (e) => {
  if (e.key === "w" && paddleY > 0) {
    paddleY -= paddleSpeed;
  }
  if (e.key === "s" && paddleY + paddleHeight + paddleSpeed <= HEIGHT) {
    paddleY += paddleSpeed;
  }

  if (e.key === "ArrowUp" && enemyPaddleY > 0) {
    enemyPaddleY -= paddleSpeed;
  }
  if (
    e.key === "ArrowDown" &&
    enemyPaddleY + paddleHeight + paddleSpeed <= HEIGHT
  ) {
    enemyPaddleY += paddleSpeed;
  }
});
