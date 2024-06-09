const character = document.getElementById('character');
const obstaclesContainer = document.getElementById('obstacles');
const scoreValue = document.getElementById('score-value');
const homeButton = document.getElementById('homeButton');

let score = 0;
let speed = 3;
let isGameOver = false;

function moveCharacter() {
    document.addEventListener('keydown', function(event) {
        if (event.code === 'Space' && !isGameOver) {
            jump();
        }
    });
}

function jump() {
    if (!character.classList.contains('jump')) {
        character.classList.add('jump');
        setTimeout(function() {
            character.classList.remove('jump');
        }, 500);
    }
}

function createObstacle() {
    if (!isGameOver) {
        const obstacle = document.createElement('div');
        obstacle.classList.add('obstacle');
        obstacle.style.left = '100vw';
        obstacle.style.animationDuration = `${Math.random() * 2 + 2}s`;
        obstaclesContainer.appendChild(obstacle);

        const obstacleInterval = setInterval(function() {
            const characterBottom = parseInt(window.getComputedStyle(character).getPropertyValue('bottom'));
            const obstacleLeft = parseInt(window.getComputedStyle(obstacle).getPropertyValue('left'));

            if (obstacleLeft < 50 && obstacleLeft > 0 && characterBottom <= 50) {
                clearInterval(obstacleInterval);
                isGameOver = true;
                alert('Game Over! Your Score: ' + score);
            }

            if (!isGameOver && obstacleLeft < -50) {
                obstacle.remove();
                score++;
                scoreValue.textContent = score;
            }
        }, 10);
    }
}

setInterval(function() {
    createObstacle();
}, 3000);

setInterval(function() {
    if (!isGameOver) {
        speed += 0.05;
        character.style.animationDuration = `1s, ${speed}s`;
    }
}, 1000);

moveCharacter();

homeButton.addEventListener('click', () => {
    window.location.href = '../index.html'; // Redirect to the main index.html
});
