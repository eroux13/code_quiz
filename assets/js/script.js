// Variables for DOM Manipulation
var timer = document.querySelector("#timer");
var h1Element = document.querySelector("h1");
var questionDisplay = document.querySelector("#questionDisplay");
var pTag = document.querySelector("p");
var answerDisplay = document.querySelector("#answerDisplay");
var startBtn = document.querySelector("#startBtn");

// Global Variables
var timerStart = 5; // reset to 76 when complete
var questionIndex = 0;

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
    }
]

// Timer Function
function setTime() {
    // Sets interval in variable
    var timerInterval = setInterval(function () {
        timerStart--;
        timer.innerHTML = timerStart;

        if (timerStart === 0) {
            // Stops execution of action at set interval
            clearInterval(timerInterval);
            // Calls function to end game
            alert("Game Over!");
        }

    }, 1000);
}

// Start Game on startBtn click
startBtn.addEventListener("click", function () {
    // Call setTime() 
    setTime();
    startBtn.setAttribute("class", "hidden");
    pTag.setAttribute("class", "hidden");
    generateQuestion();
})

// Display Question & Choices
function generateQuestion() {
    for (var i = 0; i < questions.length; i++) {
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
        // Create function to compare answers if correct/incorrect
    })
}
