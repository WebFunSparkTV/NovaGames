const canvas = document.getElementById('gameCanvas');
const context = canvas.getContext('2d');
const homeButton = document.getElementById('homeButton');
const scoreElement = document.getElementById('score');

const paddleWidth = 10;
const paddleHeight = 80;
const ballSize = 10;
const paddleSpeed = 5;
let player1Y = canvas.height / 2 - paddleHeight / 2;
let player2Y = canvas.height / 2 - paddleHeight / 2;
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSpeedX = 5;
let ballSpeedY = 5;
let player1Score = 0;
let player2Score = 0;

function draw() {
    // Clear canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Draw paddles
    context.fillStyle = '#333';
    context.fillRect(0, player1Y, paddleWidth, paddleHeight);
    context.fillRect(canvas.width - paddleWidth, player2Y, paddleWidth, paddleHeight);

    // Draw ball
    context.fillStyle = '#ff0000';
    context.fillRect(ballX - ballSize / 2, ballY - ballSize / 2, ballSize, ballSize);

    // Draw scores
    scoreElement.textContent = `Player 1: ${player1Score} | Player 2: ${player2Score}`;
}

function update() {
    // Move ball
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Collision with top/bottom walls
    if (ballY + ballSize / 2 >= canvas.height || ballY - ballSize / 2 <= 0) {
        ballSpeedY *= -1;
    }

    // Collision with paddles
    if ((ballX - ballSize / 2 <= paddleWidth) && (ballY >= player1Y && ballY <= player1Y + paddleHeight) ||
        (ballX + ballSize / 2 >= canvas.width - paddleWidth) && (ballY >= player2Y && ballY <= player2Y + paddleHeight)) {
        ballSpeedX *= -1;
    }

    // Ball out of bounds
    if (ballX + ballSize / 2 >= canvas.width) {
        player1Score++;
        resetBall();
    } else if (ballX - ballSize / 2 <= 0) {
        player2Score++;
        resetBall();
    }
}

function resetBall() {
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    ballSpeedX *= -1;
    ballSpeedY = Math.random() * 8 - 4;
}

function movePaddle(event) {
    const rect = canvas.getBoundingClientRect();
    const mouseY = event.clientY - rect.top;
    if (mouseY >= 0 && mouseY <= canvas.height - paddleHeight) {
        player1Y = mouseY;
    }
}

function moveRightPaddle(event) {
    if (event.key === 'ArrowUp') {
        player2Y -= paddleSpeed;
    } else if (event.key === 'ArrowDown') {
        player2Y += paddleSpeed;
    }
}

homeButton.addEventListener('click', () => {
    window.location.href = '../index.html';
});

canvas.addEventListener('mousemove', movePaddle);
window.addEventListener('keydown', moveRightPaddle);

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

gameLoop();
