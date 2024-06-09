const canvas = document.getElementById('gameCanvas');
const context = canvas.getContext('2d');
const homeButton = document.getElementById('homeButton');
const scoreElement = document.getElementById('score');

const gridSize = 20;
const tileCount = canvas.width / gridSize;

let snake = [{ x: 10, y: 10 }];
let direction = { x: 1, y: 0 };
let apple = { x: 5, y: 5 };
let score = 0;

function gameLoop() {
    moveSnake();
    if (checkCollision()) {
        resetGame();
    } else {
        if (checkAppleCollision()) {
            growSnake();
            placeApple();
            score++;
            scoreElement.textContent = `Score: ${score}`;
        }
        drawGame();
    }
}

function moveSnake() {
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
    
    // Wrap snake position on edge of canvas
    head.x = (head.x + tileCount) % tileCount;
    head.y = (head.y + tileCount) % tileCount;

    if (head.x < 0) head.x = tileCount - 1;
    if (head.y < 0) head.y = tileCount - 1;

    snake.unshift(head);
    snake.pop();
}

function checkCollision() {
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }
    return false;
}

function checkAppleCollision() {
    return snake[0].x === apple.x && snake[0].y === apple.y;
}

function growSnake() {
    snake.push({ ...snake[snake.length - 1] });
}

function placeApple() {
    apple.x = Math.floor(Math.random() * tileCount);
    apple.y = Math.floor(Math.random() * tileCount);
}

function drawGame() {
    context.fillStyle = '#282c34';
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.fillStyle = '#ff0000';
    context.fillRect(apple.x * gridSize, apple.y * gridSize, gridSize, gridSize);

    context.fillStyle = '#61dafb';
    snake.forEach(segment => {
        context.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
    });
}

function resetGame() {
    snake = [{ x: 10, y: 10 }];
    direction = { x: 1, y: 0 };
    score = 0;
    scoreElement.textContent = `Score: ${score}`;
}

window.addEventListener('keydown', e => {
    switch (e.key) {
        case 'ArrowUp':
            if (direction.y === 0) direction = { x: 0, y: -1 };
            break;
        case 'ArrowDown':
            if (direction.y === 0) direction = { x: 0, y: 1 };
            break;
        case 'ArrowLeft':
            if (direction.x === 0) direction = { x: -1, y: 0 };
            break;
        case 'ArrowRight':
            if (direction.x === 0) direction = { x: 1, y: 0 };
            break;
    }
});

homeButton.addEventListener('click', () => {
    window.location.href = '../index.html';
});

setInterval(gameLoop, 100);
