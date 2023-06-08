const startButton = document.getElementById("start-btn");
const startMenu = document.getElementById("menu-container");
const difficultyContainerElement = document.getElementById("difficulty-container");
const easyButton = document.getElementById("easy-btn");
const questionContainerElement = document.getElementById("question-container");


startButton.addEventListener('click', selectDifficulty);

function selectDifficulty() {
    console.log('difficulty menu');
    startMenu.classList.add('hide');
    difficultyContainerElement.classList.remove('hide');
}

easyButton.addEventListener('click', selectEasy);

function selectEasy() {
    console.log("easy");
    difficultyContainerElement.classList.add('hide');
    questionContainerElement.classList.remove('hide');
}