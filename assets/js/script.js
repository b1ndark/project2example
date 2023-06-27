/**
* Buttons to access its containers
* Global Variables
*/
const startButton = document.getElementById("start-btn");
const instructionsButton = document.getElementById("instructions-btn");
const closeInstructionsButton = document.getElementById("close-instructions-btn");
const backToIndexButton = document.getElementById("back-to-index-btn");
const backToDifficultyMenu = document.getElementById("back-to-difficulty-menu");
const difficultyBackToMainMenu = document.getElementById("difficultyBackToMainMenu");

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const scoreAreaDisplay = document.getElementById("score-area");
const answeredQuestionsCounter = document.getElementById("answered-question-counter");
const progressAnsweredQuestionBarFull = document.getElementById("fill-up-progress-question-bar");


let currentQuestionIndex = 0;
let score = 0;
let currentQuestion = {};
let difficulty = "";


/** 
* Containers
*/
const startMenu = document.getElementById("menu-container");
const difficultyContainerElement = document.getElementById("difficulty-container");
const instructionsContainerElement = document.getElementById("instructions-container");
const questionContainerElement = document.getElementById("question-container");

/**
* Instructions container
* By selecting Instructions button, you will be taken to Instructions container
* Event Listener to select Instructions
*/
instructionsButton.addEventListener('click', selectInstructions);

// This function will open the Instructions container
function selectInstructions() {
    console.log("open instructions");
    startMenu.classList.add('hide');
    instructionsContainerElement.classList.remove('hide');
}

/**
* By pressing Close button, it will close the Instructions container and take you back to Main Menu Container
* Event Listener to close instructions
*/
closeInstructionsButton.addEventListener('click', selectMainMenu);

// This function will close the Instructions container
function selectMainMenu() {
    console.log("close instructions");
    instructionsContainerElement.classList.add('hide');
    startMenu.classList.remove('hide');
    console.log('back to Main Menu');
}


/**
* By pressing Start it will take you to the Difficulty Menu
* Event Listener to take back to Difficulty Menu
*/
startButton.addEventListener('click', selectDifficulty);

// Function to close Start Menu and open Difficulty Menu
function selectDifficulty() {
    console.log('difficulty menu');
    startMenu.classList.add('hide');
    difficultyContainerElement.classList.remove('hide');
    console.log('closed main menu');
    questionContainerElement.classList.add('hide');
}

/**
 * By pressing back button it will take you back to Difficulty Menu
 */
backToDifficultyMenu.addEventListener('click', selectDifficulty);


/**
* Love Maths project helped me with this function
* This Function will get the current score
* and increase it by 1 as you progress and select correct answers
*/
function addCorrectAnswersScore() {
    let previousCorrectAnswersScore = parseInt(document.getElementById("correct-answers-score").innerText);
    document.getElementById("correct-answers-score").innerText = ++previousCorrectAnswersScore;
}


// Difficulty menu selection
const easy = document.getElementById("easy-btn");
const medium = document.getElementById("medium-btn");
const hard = document.getElementById("hard-btn");

/** 
* There are three modes Easy, Medium and Hard
* The game will start on the mode that you have selected
*/

function selectQuiz(selectedDifficulty) {
    console.log('you have selected  mode');
    difficultyContainerElement.classList.add('hide');
    questionContainerElement.classList.remove('hide');
    currentQuestionIndex = 0;
    score = 0;
    difficulty = selectedDifficulty;
    showQuestion();
}

/**
    * This function will reset answers from previous questions
    * 
    */
function resetState() {
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
        console.log("previous answers cleared");
    }
}


/**
* This function will show questions and its answers
*/

function showQuestion() {
    resetState();
    console.log("show question");

    /**
    * This function will show current question
    * Data for the questions will be collected from game.js file
    * It will pick the questions from the mode you have choosen
    */
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
    answeredQuestionsCounter.innerHTML = `${currentQuestionIndex}/4`;

    // This will display a progression bar
    progressAnsweredQuestionBarFull.style.width = `${(currentQuestionIndex / 4) * 100}%`;


    /**
    * This function is to show answers of the current question
    * It will add a button for each answer of the current question, in this case 4 answers
    * Data for the answers will be collected from game.js file
    */
    currentQuestion.answers.forEach(answer => {
        console.log("answers displayed");
        const answerButton = document.createElement("button");
        answerButton.innerHTML = answer.text;
        answerButton.classList.add("btn");
        answerButtons.appendChild(answerButton);
        if (answer.correct) {
            answerButton.dataset.correct = answer.correct;
        }

        // This Event Listener is to select an answer
        answerButton.addEventListener('click', selectAnswer);
    });
}


/**
* This function will activate as soon as the User selects an answer
*/
function selectAnswer(event) {
    console.log(difficulty);
    console.log("answer selected");
    const selectedAnswerButton = event.target;
    const correctAnswer = selectedAnswerButton.dataset.correct === "true";

    /**
    * The answer will be checked whether is correct or wrong
    * Also class has been added to decorate/style the correct and wrong answers
    **/
    if (correctAnswer) {
        console.log("its correct");
        selectedAnswerButton.classList.add("correct-answer");
        score++;
        addCorrectAnswersScore();
    } else {
        console.log("its wrong");
        selectedAnswerButton.classList.add("wrong-answer");
    }

    // Soon as the answer is selected whether is correct or wrong, all answers will be locked.
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct-answer");
        }
        button.disabled = true;
        console.log("answers locked");
    });

    // Once answer is selected whether is correct or wrong it will automatically move to the next one
    setTimeout(() => {
        handleNextQuestion();
    }, 1500);
}


/**
* This function will show the user score at the end of the quiz.
* A text message has been added to congratulate the user.
*/
function showScore() {
    resetState();
    let username = localStorage.getItem('userName');
    questionElement.innerHTML = `Well done ${username} in completing the quiz!` +
        `<br> You have answered ${score} correct out of ${4} questions!`;

    // This will display Main Menu button
    backToIndexButton.style.display = 'block';

    // This will Hide Score Area
    scoreAreaDisplay.style.display = 'none';

    // This will Hide the back button
    backToDifficultyMenu.style.display = 'none';
}


/**
* This function adds next question so the user can carry on with the quiz
* Next question Data will be loaded from game.js file
*/
function handleNextQuestion() {
    if (currentQuestionIndex < 4) {
        showQuestion();
        console.log("next question shown");
    } else {
        showScore();
    }
};

const formContainer = document.getElementById("form-display");
const submitButton = document.getElementById("submit-btn");

function usernameSubmit() {
    let inputUsername = document.getElementById("usernameInput").value;
    let messageUsername = document.getElementById("message-username");
    formContainer.style.display = 'none';
    localStorage.setItem('userName', inputUsername);
    messageUsername.innerHTML = " " + inputUsername;
}