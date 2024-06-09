document.addEventListener("DOMContentLoaded", function() {
    const grid = document.getElementById("grid");
    const scoreDisplay = document.getElementById("score");
    const startButton = document.getElementById("start-button");

    let score = 0;
    let gameStarted = false;

    // Function to create a grid cell
    function createCell() {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        return cell;
    }

    // Function to create a tower
    function createTower() {
        const tower = document.createElement("div");
        tower.classList.add("tower");
        return tower;
    }

    // Function to handle placing towers
    function placeTower(event) {
        if (gameStarted) return; // Prevent tower placement once the game has started
        if (event.target.classList.contains("cell") && !event.target.classList.contains("tower")) {
            const tower = createTower();
            event.target.appendChild(tower);
        }
    }

    // Event listener for placing towers on grid
    grid.addEventListener("click", placeTower);

    // Event listener for start button
    startButton.addEventListener("click", function() {
        gameStarted = true;
        startButton.disabled = true; // Disable start button once the game starts
    });
});
