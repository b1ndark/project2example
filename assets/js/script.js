
// buttons to access its containers and difficulties
const startButton = document.getElementById("start-btn");
const easyButton = document.getElementById("easy-btn");
const mediumButton = document.getElementById("medium-btn");
const hardButton = document.getElementById("hard-btn");
const instructionsButton = document.getElementById("instructions-btn");
const closeInstructionsButton = document.getElementById("close-instructions-btn");
const difficultyMenuButton = document.getElementById("difficulty-menu-btn");

// Containers
const startMenu = document.getElementById("menu-container");
const difficultyContainerElement = document.getElementById("difficulty-container");
const questionContainerElement = document.getElementById("question-container");
const instructionsContainerElement = document.getElementById("instructions-container");


// By pressing Instructions it will take you to Instructions container
instructionsButton.addEventListener('click', selectInstructions);

function selectInstructions() {
    console.log("instructions");
    startMenu.classList.add('hide');
    instructionsContainerElement.classList.remove('hide');
}

// Closing instructions
closeInstructionsButton.addEventListener('click', selectMainMenu);

function selectMainMenu() {
    console.log("close");
    instructionsContainerElement.classList.add('hide');
    startMenu.classList.remove('hide');
}


// By pressing Start it will take you to Difficulty Menu
startButton.addEventListener('click', selectDifficulty);

function selectDifficulty() {
    console.log('difficulty menu');
    startMenu.classList.add('hide');
    difficultyContainerElement.classList.remove('hide');
}

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextQuestionButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

// This function will select Easy mode and start it 
easyButton.addEventListener('click', selectEasyQuiz);

function selectEasyQuiz() {
    console.log("easy");
    difficultyContainerElement.classList.add('hide');
    questionContainerElement.classList.remove('hide');
    currentQuestionIndex = 0;
    score = 0;
    nextQuestionButton.innerHTML = "Next";
    showEasyQuestion();
}

function resetEasyState() {
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

//Show questions and answers
function showEasyQuestion() {

    console.log("show question");
    /**
     * This function will show current question
     * Data for for the questions will be collected from game.js file
     **/
    let currentEasyQuestion = easyQuestions[currentQuestionIndex];
    questionElement.innerHTML = currentEasyQuestion.question;

    /**
     *  Function is to show answers of the current question
     *  It will add a button for each answer of the current question, in this case 4 answers
     *  Data for for the answers will be collected from game.js file
     **/
    currentEasyQuestion.answers.forEach(answer => {
        console.log("answers displayed");
        const answerButton = document.createElement("button");
        answerButton.innerHTML = answer.text;
        answerButton.classList.add("btn");
        answerButtons.appendChild(answerButton);
        if (answer.correct) {
            answerButton.dataset.correct = answer.correct;
        }
        answerButton.addEventListener('click', selectEasyAnswer);
    });
};

function selectEasyAnswer(event) {
    console.log("selected answer");
    const selectedBtn = event.target;

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


