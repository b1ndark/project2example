

/**
 *  Access to containers
 */

// Buttons to access its containers
const startButton = document.getElementById("start-btn");
const instructionsButton = document.getElementById("instructions-btn");
const closeInstructionsButton = document.getElementById("close-instructions-btn");
const backToIndexButton = document.getElementById("back-Index-btn");

// Difficulty Buttons
const easyButton = document.getElementById("easy-btn");
const mediumButton = document.getElementById("medium-btn");
const hardButton = document.getElementById("hard-btn");


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
const questionMediumElement = document.getElementById("question");
const questionHardElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const answerMediumButtons = document.getElementById("answer-buttons");
const answerHardButtons = document.getElementById("answer-buttons");
const scoreDisplay = document.getElementById("score-area");


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

/**
 * This Function will get the current score
 * and increase it by 1 as you progress and select incorrect answers
 */
function addIncorrectAnswersScore() {
    let previousIncorrectAnswersScore = parseInt(document.getElementById("incorrect-answers-score").innerText);
    document.getElementById("incorrect-answers-score").innerText = ++previousIncorrectAnswersScore;
}


// This function will select Easy mode and start it 
easyButton.addEventListener('click', selectEasyQuiz);

function selectEasyQuiz() {
    console.log("easy");
    difficultyContainerElement.classList.add('hide');
    questionContainerElement.classList.remove('hide');
    currentQuestionIndex = 0;
    score = 0;
    showEasyQuestion();


    /**
 * This function will reset the answer buttons from its questions
 * 
 */
    function resetEasyState() {
        while (answerButtons.firstChild) {
            answerButtons.removeChild(answerButtons.firstChild);
        }
    }

    //Show questions and answers
    function showEasyQuestion() {
        resetEasyState();
        console.log("show question");
        /**
         * This function will show current question
         * Data for for the questions will be collected from game.js file
         **/
        let currentEasyQuestion = easyQuestions[currentQuestionIndex];
        questionElement.innerHTML = currentEasyQuestion.question;

        /**
         *  This Function is to show answers of the current question
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

    /**
     * This function will activate as soon as the user selects an answer
     */

    function selectEasyAnswer(event) {
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
            addIncorrectAnswersScore();
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
        resetEasyState();
        questionElement.innerHTML = `You have scored ${score} out of ${easyQuestions.length}!`;
        backToIndexButton.style.display = "block";
        scoreDisplay.style.display = "none";
    }


    function handleNextQuestion() {
        currentQuestionIndex++;
        if (currentQuestionIndex < easyQuestions.length) {
            showEasyQuestion();
        } else {
            showScore();
        }
    }


}




// This function will select Medium mode

mediumButton.addEventListener('click', selectMediumQuiz);

function selectMediumQuiz() {
    console.log("medium");
    difficultyContainerElement.classList.add('hide');
    questionContainerElement.classList.remove('hide');
    currentQuestionIndex = 0;
    score = 0;
    showMediumQuestion();


    /**
    * This function will reset the answer buttons from its questions
    * 
    */
    function resetMediumState() {
        while (answerMediumButtons.firstChild) {
            answerMediumButtons.removeChild(answerMediumButtons.firstChild);
        }
    }

    //Show questions and answers
    function showMediumQuestion() {
        resetMediumState();
        console.log("show question");
        /**
         * This function will show current question
         * Data for the questions will be collected from game.js file
         **/
        let currentMediumQuestion = mediumQuestions[currentQuestionIndex];
        questionMediumElement.innerHTML = currentMediumQuestion.questionM;

        /**
         *  This Function is to show answers of the current question
         *  It will add a button for each answer of the current question, in this case 4 answers
         *  Data for the answers will be collected from game.js file
         **/
        currentMediumQuestion.answers.forEach(answer => {
            console.log("answers displayed");
            const answerMediumButton = document.createElement("button");
            answerMediumButton.innerHTML = answer.text;
            answerMediumButton.classList.add("btn");
            answerMediumButtons.appendChild(answerMediumButton);
            if (answer.correct) {
                answerMediumButton.dataset.correct = answer.correct;
            }
            answerMediumButton.addEventListener('click', selectMediumAnswer);
        });
    };

    /**
     * This function will activate as soon as the user selects an answer
     */

    function selectMediumAnswer(event) {
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
            addIncorrectAnswersScore();
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
            handleNextMediumQuestion();
        }, 2000);

    }


    function showMediumScore() {
        resetMediumState();
        questionMediumElement.innerHTML = `You have scored ${score} out of ${mediumQuestions.length}!`;
        backToIndexButton.style.display = "block";
        scoreDisplay.style.display = "none";
    }


    function handleNextMediumQuestion() {
        currentQuestionIndex++;
        if (currentQuestionIndex < mediumQuestions.length) {
            showMediumQuestion();
        } else {
            showMediumScore();
        }
    }


}



// This function will select Hard mode

hardButton.addEventListener('click', selectHardQuiz);

function selectHardQuiz() {
    console.log("hard");
    difficultyContainerElement.classList.add('hide');
    questionContainerElement.classList.remove('hide');
    currentQuestionIndex = 0;
    score = 0;
    showHardQuestion();

    /**
    * This function will reset the answer buttons from its questions
    * 
    */
    function resetHardState() {
        while (answerHardButtons.firstChild) {
            answerHardButtons.removeChild(answerHardButtons.firstChild);
        }
    }

    //Show questions and answers
    function showHardQuestion() {
        resetHardState();
        console.log("show question");
        /**
         * This function will show current question
         * Data for the questions will be collected from game.js file
         **/
        let currentHardQuestion = hardQuestions[currentQuestionIndex];
        questionHardElement.innerHTML = currentHardQuestion.questionH;

        /**
         *  This Function is to show answers of the current question
         *  It will add a button for each answer of the current question, in this case 4 answers
         *  Data for the answers will be collected from game.js file
         **/
        currentHardQuestion.answers.forEach(answer => {
            console.log("answers displayed");
            const answerHardButton = document.createElement("button");
            answerHardButton.innerHTML = answer.text;
            answerHardButton.classList.add("btn");
            answerHardButtons.appendChild(answerHardButton);
            if (answer.correct) {
                answerHardButton.dataset.correct = answer.correct;
            }
            answerHardButton.addEventListener('click', selectHardAnswer);
        });
    };

    /**
     * This function will activate as soon as the user selects an answer
     */

    function selectHardAnswer(event) {
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
            addIncorrectAnswersScore();
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
            handleNextHardQuestion();
        }, 2000);

    }


    function showHardScore() {
        resetHardState();
        questionHardElement.innerHTML = `You have scored ${score} out of ${hardQuestions.length}!`;
        backToIndexButton.style.display = "block";
        scoreDisplay.style.display = "none";
    }


    function handleNextHardQuestion() {
        currentQuestionIndex++;
        if (currentQuestionIndex < hardQuestions.length) {
            showHardQuestion();
        } else {
            showHardScore();
        }
    }


}

