// JavaScript for highScores.html page
// Variable for DOM Manipulation
var highScoreDisplay = document.querySelector("#highScoreDisplay");
var clearHighScore = document.querySelector("#clearHighscore");
var goBackBtn = document.querySelector("#goBack");

// Clear highscore function
clearHighScore.addEventListener("click", function () {
    localStorage.clear();
    location.reload();
})

var displayAllScores = localStorage.getItem("displayScores");
displayAllScores = JSON.parse(displayAllScores);
console.log(displayAllScores)
if (displayAllScores !== null) {
    for (var i = 0; i < displayAllScores.length; i++) {
        var listScores = document.createElement("li");
        listScores.textContent = displayAllScores[i].initials + " Score: " + displayAllScores[i].score;
        highScoreDisplay.append(listScores);
    }
}

// Go Back redirect Function
goBackBtn.addEventListener("click", function () {
    window.location.replace("./index.html");
})