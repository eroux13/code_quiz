// Variables for DOM Manipulation
var container = document.querySelector(".container");
var timer = document.querySelector("#timer");
var h1Element = document.querySelector("h1");
var contentDisplay = document.querySelector("#contentDisplay");
var pTag = document.querySelector("p");
var answerDisplay = document.querySelector("#answerDisplay");
var startBtn = document.querySelector("#startBtn");
var messageDisplay = document.querySelector("#messageDisplay");

// Global Variables
var timerStart = 61;
var questionIndex = 0;
var score = 0;
// Create global varibale for timerInterval to access clearInterval
var timerInterval;

// Questions & Answers Object
var questions = [
    {
        title: "Commonly used data types DO NOT include",
        choices: ["strings", "booleans", "alerts", "numbers"],
        answer: "alerts"
    },
    {
        title: "Front-end development includes: HTML, CSS, and ________",
        choices: ["JavaScript", "C++", "Java", "Swift"],
        answer: "JavaScript"
    },
    {
        title: "How do we link a JavaScript file to the HTML?",
        choices: ["<img>", "<p>", "<link>", "<script>"],
        answer: "<script>"
    },
    {
        title: "How do we access a certain index in an array?",
        choices: ["array.index[i]", "array(i)", "array[i]", "[i]array"],
        answer: "JavaScript"
    },
    {
        title: "A property of an object that is a function is called a __________",
        choices: ["method", "string", "boolean", "href"],
        answer: "method"
    },
    {
        title: "The logical operator that represents 'or' is ___",
        choices: ["&&", "||", "===", "OR"],
        answer: "||"
    },
    {
        title: "DOM stands for?",
        choices: ["Desktop Oriented Mode", "Digital Ordinance Mode", "Display Object Management", "Document Object Model"],
        answer: "Document Object Model"
    },
    {
        title: "How many elements can you apply an 'ID' attribute to?",
        choices: ["Unlimited", "One", "Five", "Ten"],
        answer: "One"
    },
    {
        title: "The logical operator that represents 'and' is ___",
        choices: ["===", "++", "&&", "||t"],
        answer: "&&"
    },
    {
        title: "What is the current version of JavaScript?",
        choices: ["ES5", "ES2", "ES7", "ES9"],
        answer: "ES9"
    }
]

// Timer Function
function setTime() {
    // Sets interval in variable
    timerInterval = setInterval(function () {
        timerStart--;
        timer.innerHTML = timerStart;

        if (timerStart === 0) {
            // Stops execution of action at set interval
            clearInterval(timerInterval);
            // Calls function to end game
            endGame();
        }

    }, 1000);
}

// Start Game on startBtn click
startBtn.addEventListener("click", function () {
    // Call setTime() 
    setTime();
    startBtn.setAttribute("class", "hidden");
    pTag.setAttribute("class", "hidden");
    generateQuestion(questionIndex);
})

// Display Question & Choices
function generateQuestion(questionIndex) {
    for (var i = 0; i < questions.length; i++) {
        // Clear previous choices
        answerDisplay.innerHTML = "";
        var quizQuestion = questions[questionIndex].title;
        var userChoices = questions[questionIndex].choices;
        h1Element.textContent = quizQuestion;
    }
    userChoices.forEach(function (newItem) {
        var userAnswerBtn = document.createElement("button");
        var br = document.createElement("br");
        userAnswerBtn.setAttribute("class", "btn btn-primary answerBtn");
        userAnswerBtn.textContent = newItem;
        answerDisplay.append(userAnswerBtn);
        answerDisplay.append(br);
        // Add eventListener to user chocice button click
        userAnswerBtn.addEventListener("click", (compareAnswers));
    })
}

// Compare correct/incorrect answers
function compareAnswers(e) {
    var el = e.target;
    if (el.matches("button")) {
        // Correct Answer
        console.log("going through compareAnswers");
        if (el.textContent === questions[questionIndex].answer) {
            console.log("Getting answer from obj: " + questions[questionIndex].answer);
            score++;
            console.log("Score works, score = " + score);
            messageDisplay.innerHTML = "Correct!";
            messageDisplay.style.color = "Green";
            messageDisplay.style.fontSize = "20px";
            var hr = document.createElement("hr");
            messageDisplay.prepend(hr);
        }
        // Incorrect Answer
        else {
            timerStart -= 5;
            messageDisplay.textContent = "Incorrect! 5 seconds deducted!"
            messageDisplay.style.color = "Red";
            messageDisplay.style.fontSize = "20px";
            var hr = document.createElement("hr");
            messageDisplay.prepend(hr);
        }
    }
    // Increase questionIndex for next question
    questionIndex++;

    if (questionIndex >= questions.length) {
        // Calls function to end game
        endGame();
    }
    else {
        generateQuestion(questionIndex);
    }
}

// End game function
function endGame() {
    // Clear message and timer
    messageDisplay.textContent = "";
    timer.innerHTML = "0";
    clearInterval(timerInterval);

    // finalScore calculated from correct answers + time left
    var finalScore = parseInt(score + timerStart);
    h1Element.textContent = "Game Over!";
    contentDisplay.textContent = "Congrats! Your score is: " + finalScore;
    contentDisplay.style.fontSize = "20px";

    // Create elements for user to submit highscore
    var initialsPTag = document.createElement("p");
    initialsPTag.textContent = "Enter Initials: ";
    initialsPTag.setAttribute("class", "initialsPTag");
    contentDisplay.append(initialsPTag);
    var initialsInputBox = document.createElement("input");
    initialsInputBox.setAttribute("type", "text");
    contentDisplay.append(initialsInputBox);
    var submitBtn = document.createElement("button");
    submitBtn.setAttribute("class", "btn btn-primary submitBtn");
    submitBtn.setAttribute("type", "submit");
    submitBtn.setAttribute("id", "submitBtn");
    submitBtn.textContent = "Submit"
    contentDisplay.append(submitBtn);

    // Event listener for highscore submit button
    submitBtn.addEventListener("click", function (e) {
        e.preventDefault
        var initialsInput = initialsInputBox.value;
        var saveFinalScore = {
            initials: initialsInput,
            score: finalScore
        };
        var displayScores = localStorage.getItem("displayScores");
        if (displayScores === null) {
            displayScores = [];
        }
        else {
            displayScores = JSON.parse(displayScores);
        }
        displayScores.push(saveFinalScore);
        var submitScore = JSON.stringify(displayScores);
        localStorage.setItem("displayScores", submitScore);
        // Redirect to highscores page
        window.location.replace("./highScores.html");
    })
}