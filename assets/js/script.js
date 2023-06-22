

/**
*  Access to containers
*/

// Buttons to access its containers
const startButton = document.getElementById("start-btn");
const instructionsButton = document.getElementById("instructions-btn");
const closeInstructionsButton = document.getElementById("close-instructions-btn");
const backToIndexButton = document.getElementById("back-index-btn");

// Containers 
const startMenu = document.getElementById("menu-container");
const difficultyContainerElement = document.getElementById("difficulty-container");
const questionContainerElement = document.getElementById("question-container");
const instructionsContainerElement = document.getElementById("instructions-container");


/**
 * By pressing Instructions it will take you to Instructions container
 * Event Listener to select Instructions
 */
instructionsButton.addEventListener('click', selectInstructions);

// Function to open the Instructions container
function selectInstructions() {
    console.log("instructions");
    startMenu.classList.add('hide');
    instructionsContainerElement.classList.remove('hide');
}

/**
 * Closing instructions
 * Event Listener to take back to Main Menu Container
 */
closeInstructionsButton.addEventListener('click', selectMainMenu);

// Function to close Instructions
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

/**
 * Variables
 */

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const scoreDisplay = document.getElementById("score-area");
const questionCounterText = document.getElementById("question-counter");
const scoreCounterText = document.getElementById("score-counter");
const progressQuestionBarFull = document.getElementById("progress-question-bar-full");


let currentQuestionIndex = 0;
let score = 0;

/**
 * Global functions 
 */

/**
 * This Function will get the current score
 * and increase it by 1 as you progress and select correct answers
 */
function addCorrectAnswersScore() {
    let previousCorrectAnswersScore = parseInt(document.getElementById("correct-answers-score").innerText);
    document.getElementById("correct-answers-score").innerText = ++previousCorrectAnswersScore;
}

const easy = document.getElementById("easy-btn");
const medium = document.getElementById("medium-btn");
const hard = document.getElementById("hard-btn");

let currentQuestion = {};

function selectQuiz() {
    console.log("mode selected");
    difficultyContainerElement.classList.add('hide');
    questionContainerElement.classList.remove('hide');
    currentQuestionIndex = 0;
    score = 0;
    showQuestion();
}
/**
* This function will reset the answer buttons from its questions
* 
*/
function resetState() {
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

//Show questions and answers
function showQuestion(difficulty) {
    resetState();
    console.log("show question");
    /**
     * This function will show current question
     * Data for for the questions will be collected from game.js file
     **/

    if (difficulty == easy) {
        currentQuestion = easyQuestions[currentQuestionIndex];
        console.log("easy questions");
    } else if (difficulty == medium) {
        currentQuestion = mediumQuestions[currentQuestionIndex];
        console.log("medium questions");
    } else {
        currentQuestion = hardQuestions[currentQuestionIndex];
        console.log("hard questions");
    }
    questionElement.innerHTML = currentQuestion.question;

    // This will workout what question you are on and display it
    currentQuestionIndex++;
    questionCounterText.innerHTML = `${currentQuestionIndex}/4`;

    // This will display a progression bar
    progressQuestionBarFull.style.width = `${(currentQuestionIndex / 4) * 100}%`;

    /**
     *  This Function is to show answers of the current question
     *  It will add a button for each answer of the current question, in this case 4 answers
     *  Data for for the answers will be collected from game.js file
     **/

    currentQuestion.answers.forEach(answer => {
        console.log("answers displayed");
        const answerButton = document.createElement("button");
        answerButton.innerHTML = answer.text;
        answerButton.classList.add("btn");
        answerButtons.appendChild(answerButton);
        if (answer.correct) {
            answerButton.dataset.correct = answer.correct;
        }
        answerButton.addEventListener('click', selectAnswer);
    });
}

/**
 * This function will activate as soon as the user selects an answer
 */

function selectAnswer(event) {
    console.log("selected answer");
    const selectedBtn = event.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    // Here the function will check if the answer is correct or not
    if (isCorrect) {
        console.log("correct-answer");
        selectedBtn.classList.add("correct-answer");
        score++;
        addCorrectAnswersScore();
    } else {
        console.log("wrong-answer");
        selectedBtn.classList.add("wrong-answer");
    }
    // Soon as the answer is selected where true or false, all the answers will be locked
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct-answer");
        }
        button.disabled = true;
        console.log("answers blocked");
    });
    // Once answer is selected whether is correct or wrong it will automatically move to the next one
    setTimeout(() => {
        handleNextQuestion();
    }, 2000);
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You have scored ${score} out of ${4}!`;
    backToIndexButton.style.display = "block";
    scoreDisplay.style.display = "none";
}

function handleNextQuestion() {
    if (currentQuestionIndex < 4) {
        showQuestion();
    } else {
        showScore();
    };
}