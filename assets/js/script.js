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
var timerStart = 35; // reset to 76 when complete
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
        title: "TEST QUESTION",
        choices: ["A", "B", "C", "D"],
        answer: "D"
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
    // 
    console.log("startBtn works");
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
        // 
        console.log("generateQuestion works");
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
            var hr = document.createElement("hr");
            messageDisplay.prepend(hr);
        }
        // Incorrect Answer
        else {
            timerStart -= 5;
            messageDisplay.textContent = "Incorrect! 5 seconds deducted!"
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
    // finalScore calculated from correct answers + time left
    var finalScore = parseInt(score + timerStart);
    h1Element.textContent = "Game Over!";
    contentDisplay.textContent = "Congrats! Your score is: " + finalScore;

    // Create elements for user to submit highscore
    var br = document.createElement("br");
    contentDisplay.append(br);
    var initialsLabel = document.createElement("label");
    initialsLabel.textContent = "Enter Initials: ";
    contentDisplay.append(initialsLabel);
    var initialsInputBox = document.createElement("input");
    initialsInputBox.setAttribute("type", "text");
    contentDisplay.append(initialsInputBox);
    contentDisplay.append(br);
    var submitBtn = document.createElement("button");
    submitBtn.setAttribute("class", "btn btn-primary");
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

    // Clear message and timer
    messageDisplay.textContent = "";
    timer.innerHTML = "0";
    clearInterval(timerInterval);
}