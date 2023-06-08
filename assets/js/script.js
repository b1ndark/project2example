
// buttons to access 
const startButton = document.getElementById("start-btn");
const easyButton = document.getElementById("easy-btn");
const mediumButton = document.getElementById("medium-btn");
const hardButton = document.getElementById("hard-btn");

// Containers
const startMenu = document.getElementById("menu-container");
const difficultyContainerElement = document.getElementById("difficulty-container");
const questionContainerElement = document.getElementById("question-container");

// By pressing Start it will take you to Difficulty Menu
startButton.addEventListener('click', selectDifficulty);

function selectDifficulty() {
    console.log('difficulty menu');
    startMenu.classList.add('hide');
    difficultyContainerElement.classList.remove('hide');
}

// This function will select Easy mode
easyButton.addEventListener('click', selectEasy);

function selectEasy() {
    console.log("easy");
    difficultyContainerElement.classList.add('hide');
    questionContainerElement.classList.remove('hide');
}

// This function will select Medium mode

mediumButton.addEventListener('click', selectMedium);

function selectMedium() {
    console.log("medium");
    difficultyContainerElement.classList.add('hide');
    questionContainerElement.classList.remove('hide');
}

// This function will select Hard mode

hardButton.addEventListener('click', selectHard);

function selectHard() {
    console.log("hard");
    difficultyContainerElement.classList.add('hide');
    questionContainerElement.classList.remove('hide');
}