// Variables for DOM Manipulation
var timer = document.querySelector("#timer");
var h1Element = document.querySelector("h1");
var questionDisplay = document.querySelector("#questionDisplay");
var pTag = document.querySelector("p");
var answerDisplay = document.querySelector("#answerDisplay");
var startBtn = document.querySelector("#startBtn");

// Global Variables
var timerStart = 5;

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
    // Display Question & Choices
})

