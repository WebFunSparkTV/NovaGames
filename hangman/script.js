const words = ['hangman', 'javascript', 'computer', 'programming', 'coding', 'html', 'css', 'python'];
let selectedWord = words[Math.floor(Math.random() * words.length)];
let guessedWord = '';
let incorrectGuesses = 0;
const maxIncorrectGuesses = 6;

const wordElement = document.getElementById('word');
const lettersElement = document.getElementById('letters');
const incorrectGuessesElement = document.getElementById('incorrectGuesses');
const resultElement = document.getElementById('result');
const homeButton = document.getElementById('homeButton');

function setup() {
    for (let i = 0; i < selectedWord.length; i++) {
        guessedWord += '_';
    }
    displayWord();
    displayLetters();
}

function displayWord() {
    wordElement.textContent = guessedWord.split('').join(' ');
}

function displayLetters() {
    for (let letter of 'abcdefghijklmnopqrstuvwxyz') {
        const button = document.createElement('button');
        button.textContent = letter;
        button.addEventListener('click', () => {
            checkLetter(letter);
            button.disabled = true;
        });
        lettersElement.appendChild(button);
    }
}

function checkLetter(letter) {
    let found = false;
    for (let i = 0; i < selectedWord.length; i++) {
        if (selectedWord[i] === letter) {
            guessedWord = guessedWord.substring(0, i) + letter + guessedWord.substring(i + 1);
            found = true;
        }
    }
    if (!found) {
        incorrectGuesses++;
        incorrectGuessesElement.textContent = `${incorrectGuesses}/${maxIncorrectGuesses}`;
    }
    displayWord();
    checkGameStatus();
}

function checkGameStatus() {
    if (guessedWord === selectedWord) {
        resultElement.textContent = 'You won!';
        disableAllButtons();
    } else if (incorrectGuesses === maxIncorrectGuesses) {
        resultElement.textContent = 'You lost!';
        disableAllButtons();
    }
}

function disableAllButtons() {
    const buttons = document.querySelectorAll('#letters button');
    buttons.forEach(button => {
        button.disabled = true;
    });
}

homeButton.addEventListener('click', () => {
    window.location.href = '../index.html';
});

setup();
