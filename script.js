var container = document.getElementById("container-game");


// initialize variables
var iBound;
var jBound;
var nBombs;
var nFlags;
var interval;
var difficulty;
var ended;

// get scores and store them in array
function getScores(data) {
    var arr = []
    for (const key in data) {
        arr.push(data[key]);
    }
    return arr;
}

// make array of names that correspond with their scores
function getNameFromScore(unsortedData, sortedData) {
    var arr = [];
    for (const key in unsortedData) {
        arr[sortedData.indexOf(unsortedData[key])] = key;
    }
    return arr;
}

// sort scores from fastest to slowest
function sortScores(scores) {
    return scores.sort(function (a, b) {
        var minute1 = parseInt(a.split(":")[0]);
        var seconds1 = parseInt(a.split(":")[1]);
        var minute2 = parseInt(b.split(":")[0]);
        var seconds2 = parseInt(b.split(":")[1]);


        // if the minutes being compared are the same
        if (minute2 - minute1 === 0) {
            // sort them by which 'seconds' is less 
            return (seconds1 - seconds2);
        }
        // if the minutes being comared are not the same
        else {
            // sort them by which 'minutes' is less
            return (minute1 - minute2);
        }
    })
}

// Print scores to highscores if scores have been stored
if ("minesweeperScores" in window.localStorage) {
    var savedData = JSON.parse(localStorage.getItem("minesweeperScores"));
    const easyScores = getScores(savedData.Easy);
    const mediumScores = getScores(savedData.Medium);
    const hardScores = getScores(savedData.Hard);

    sortScores(easyScores);
    sortScores(mediumScores);
    sortScores(hardScores);

    const easyNames = getNameFromScore(savedData.Easy, easyScores);
    const mediumNames = getNameFromScore(savedData.Medium, mediumScores);
    const hardNames = getNameFromScore(savedData.Hard, hardScores);


    // append easy scores data
    for (var i = 0; i < easyScores.length; i++) {
        var tag = document.createElement("p");
        tag.textContent = `${easyNames[i]} : ${easyScores[i]}`;
        document.querySelector("#easy-scores").append(tag);
    }

    // append medium scores data
    for (var i = 0; i < mediumScores.length; i++) {
        var tag = document.createElement("p");
        tag.textContent = `${mediumNames[i]} : ${mediumScores[i]}`;
        document.querySelector("#medium-scores").append(tag);
    }

    // append hard scores data
    for (var i = 0; i < hardScores.length; i++) {
        var tag = document.createElement("p");
        tag.textContent = `${hardNames[i]} : ${hardScores[i]}`;
        document.querySelector("#hard-scores").append(tag);
    }
}
// if there is no local storage data yet
else {
    // initialize scores
    let scores = {
        Easy: {
        },
        Medium: {
        },
        Hard: {
        }
    }
    // store empty scores so data can be written
    localStorage.setItem("minesweeperScores", JSON.stringify(scores));
    // save to variable
    var savedData = JSON.parse(localStorage.getItem("minesweeperScores"));
}

// Obtain difficulty from user input
function getDifficulty() {
    // ended = false will enable the click listener and timer
    ended = false;
    difficulty = document.querySelector(".active").textContent.trim();

    // clear all classes from container
    container.classList.remove("container-easy");
    container.classList.remove("container-medium");
    container.classList.remove("container-hard");


    // Set parameters of game based on difficulty
    if (difficulty === "Easy") {
        iBound = 8;
        jBound = 10;
        nBombs = 12;
        container.classList.add("container-easy");
    }
    else if (difficulty === "Medium") {
        iBound = 14; // 14
        jBound = 18; // 18
        nBombs = 34;
        container.classList.add("container-medium");
    }
    else {
        iBound = 20;
        jBound = 24;
        nBombs = 75;
        container.classList.add("container-hard");
    }
    nFlags = nBombs;
    document.querySelector("#flags").textContent = (`Flags: ${nFlags}`);
}

// Create grid of buttons
function createGrid() {

    // clear any exisiting game
    container.innerHTML = "";

    // iterate to create buttons
    for (var i = 0; i < iBound; i++) {
        for (var j = 0; j < jBound; j++) {
            var dummy = document.createElement("div");
            container.appendChild(dummy);

            // Set size of button based on difficulty
            if (difficulty === "Easy") {
                dummy.setAttribute("class", "game-button-easy");
            }
            else if (difficulty === "Medium") {
                dummy.setAttribute("class", "game-button-medium");
            }
            else {
                dummy.setAttribute("class", "game-button-hard");
            }

            // set color of button based on position
            // on even rows
            if (i % 2 == 0) {
                // set the first button lighter and alternate
                if (j % 2 == 0) {
                    dummy.classList.add("light-btn");
                }
                else {
                    dummy.classList.add("dark-btn");
                }
            }
            // on odd rows
            else {
                // set the first button darker and alternate
                if (j % 2 == 0) {
                    dummy.classList.add("dark-btn");
                }
                else {
                    dummy.classList.add("light-btn");
                }
            }


            //convert i and j to strings, add them, set that string to id of current button
            var id = i.toString() + "," + j.toString();
            dummy.setAttribute("id", id)
        }
    }
}

// initialize bombs array
var bombs = [];
// create bombs array and assign has-bomb id to corresponding buttons
function createBombs() {
    bombs = [0];
    for (var i = 0; i < nBombs; i++) {
        // random number for row of bomb
        var iBomb = Math.floor(Math.random() * iBound);
        // random number for column  of bomb
        var jBomb = Math.floor(Math.random() * jBound);

        // check that this cell does not already have a bomb
        if (!bombs.includes(iBomb.toString() + "," + jBomb.toString())) {
            // assign value to bomb array
            bombs[i] = iBomb.toString() + "," + jBomb.toString();

            // assign data-bomb attribute to corresponding button
            var buttonWithBomb = document.getElementById(bombs[i]);
            buttonWithBomb.setAttribute("data-bomb", "true");

        }
        else {
            // try again if this button already has a bomb
            i--;
        }
    }
}

// Show all bombs because you lost!
function blowUp() {
    var i = 0;
    // ended = true will end the click listener and timer
    ended = true;
    var interval = setInterval(function () {
        document.getElementById(bombs[i]).innerHTML = "<img src='./assets/orca.png' alt='Image of Orca' class='orca'/>";

        i++;
        if (i == bombs.length) {
            alert("Game Over!");
            clearInterval(interval)
        }
    }, 50);
}

function init() {
    document.querySelector("#start-btn").classList.add("hidden");
    document.querySelector("#save-score-btn").classList.add("hidden");
    getDifficulty();
    createGrid();
    createBombs();
    startTimer();
}

// Look for clicks
container.addEventListener("click", function () {
    if (!ended) {
        if (event.target.hasAttribute("data-bomb")) {
            event.target.innerHTML = "<img src='./assets/orca.png' alt='Image of Orca'/>";
            blowUp();
        }
        else {

            var newId = event.target.id.split(",");
            checkForBombs(newId);
        }
    }
});

function checkForBombs(id) {
    // Initialize variables
    var btnClickedNBombs = 0;
    // Array of IDs for recursive calling
    const positionArr = [];
    var i = 0;


    var id0 = parseInt(id[0]);
    var id1 = parseInt(id[1]);
    var newId = id0 + "," + id1;



    // add bombless class and remove light and dark 
    document.getElementById(newId).classList.add("bombless");
    document.getElementById(newId).classList.remove("light-btn");
    document.getElementById(newId).classList.remove("dark-btn");


    // clear any flags
    if (document.getElementById(id).textContent == "!") {
        document.getElementById(id).textContent = "";
        nFlags++;
        document.querySelector("#flags").textContent = (`Flags: ${nFlags}`);
    }

    // id[0] = row, id[1] = col

    // for a button not on the top edge or left edge
    if (parseInt(id[0]) !== 0 && parseInt(id[1]) !== 0) {
        // up and left
        var newId0 = parseInt(id[0]) - 1;
        var newId1 = parseInt(id[1]) - 1;

        var newId = newId0.toString() + "," + newId1.toString();
        positionArr[i] = newId;
        i++;

        // if (!document.getElementById(newId).classList.contains("bombless")) {
        if (document.getElementById(newId).hasAttribute("data-bomb")) {
            btnClickedNBombs++;
        }
    }
    // for a button not on the top edge
    if (parseInt(id[0]) !== 0) {
        // up and center
        var newId0 = parseInt(id[0]) - 1;
        var newId1 = parseInt(id[1]);

        var newId = newId0.toString() + "," + newId1.toString();
        positionArr[i] = newId;
        i++;

        // if (!document.getElementById(newId).classList.contains("bombless")) {
        if (document.getElementById(newId).hasAttribute("data-bomb")) {
            btnClickedNBombs++;
        }
    }
    // for a button not on the top edge or right edge
    if (parseInt(id[0]) !== 0 && parseInt(id[1]) !== jBound - 1) {
        // up and right
        var newId0 = parseInt(id[0]) - 1;
        var newId1 = parseInt(id[1]) + 1;

        var newId = newId0.toString() + "," + newId1.toString();
        positionArr[i] = newId;
        i++;

        // if (!document.getElementById(newId).classList.contains("bombless")) {
        if (document.getElementById(newId).hasAttribute("data-bomb")) {
            btnClickedNBombs++;
        }
    }
    // for a button not on the left edge
    if (parseInt(id[1]) !== 0) {
        // center and left
        var newId0 = parseInt(id[0]);
        var newId1 = parseInt(id[1]) - 1;

        var newId = newId0.toString() + "," + newId1.toString();
        positionArr[i] = newId;
        i++;

        // if (!document.getElementById(newId).classList.contains("bombless")) {
        if (document.getElementById(newId).hasAttribute("data-bomb")) {
            btnClickedNBombs++;
        }
    }
    // for a button not on the right edge
    if (parseInt(id[1]) !== jBound - 1) {
        // center and right
        var newId0 = parseInt(id[0]);
        var newId1 = parseInt(id[1]) + 1;

        var newId = newId0.toString() + "," + newId1.toString();
        positionArr[i] = newId;
        i++;

        if (document.getElementById(newId).hasAttribute("data-bomb")) {
            btnClickedNBombs++;
        }
    }
    // for a button not on the bottom edge or left edge
    if (parseInt(id[0]) !== iBound - 1 && parseInt(id[1]) !== 0) {
        // down and left
        var newId0 = parseInt(id[0]) + 1;
        var newId1 = parseInt(id[1]) - 1;

        var newId = newId0.toString() + "," + newId1.toString();
        positionArr[i] = newId;
        i++;

        if (document.getElementById(newId).hasAttribute("data-bomb")) {
            btnClickedNBombs++;
        }
    }
    // for a button not on the bottom edge
    if (parseInt(id[0]) !== iBound - 1) {
        // down and center
        var newId0 = parseInt(id[0]) + 1;
        var newId1 = parseInt(id[1]);

        var newId = newId0.toString() + "," + newId1.toString();
        positionArr[i] = newId;
        i++;

        if (document.getElementById(newId).hasAttribute("data-bomb")) {
            btnClickedNBombs++;
        }
    }
    // for a button not on the bottom edge or the right edge
    if (parseInt(id[0]) !== iBound - 1 && parseInt(id[1]) !== jBound - 1) {
        // down and right
        var newId0 = parseInt(id[0]) + 1;
        var newId1 = parseInt(id[1]) + 1;

        var newId = newId0.toString() + "," + newId1.toString();
        positionArr[i] = newId;
        i++;

        if (document.getElementById(newId).hasAttribute("data-bomb")) {
            btnClickedNBombs++;
        }
    }
    if (btnClickedNBombs !== 0) {
        document.getElementById(id).textContent = btnClickedNBombs;
    }
    else {
        positionArr.forEach(element => {
            element = element.split(",");
            // if it does not have a bomb or bombless class
            if (!document.getElementById(element).hasAttribute("data-bomb") && !document.getElementById(element).classList.contains("bombless")) {
                checkForBombs(element);
            }
        });
        
    }

}


// right click event
window.oncontextmenu = function (event) {
    // if it was a button
    if (event.target.id !== "") {
        event.preventDefault();
        // if it has not been revealed yet
        if (!event.target.classList.contains("bombless")) {
            // if it's not already flagged
            if (event.target.textContent !== "!") {
                event.target.textContent = "!";
                nFlags--;
                document.querySelector("#flags").textContent = (`Flags: ${nFlags}`);
            }
            // if it is already flagged
            else {
                event.target.textContent = "";
                nFlags++;
                document.querySelector("#flags").textContent = (`Flags: ${nFlags}`);
            }
        }
    }
}


function startTimer() {

    document.querySelector("#timer").textContent = "0:00";
    clearInterval(interval);

    interval = setInterval(function () {
        var time = document.querySelector("#timer").textContent.split(":");
        var seconds = parseInt(time[1]);
        var minutes = parseInt(time[0]);
        if (seconds < 59) {
            seconds++;
        }
        else {
            minutes++;
            seconds = 00;
        }

        if (seconds < 10) {
            seconds = "0" + seconds;
        }
        document.querySelector("#timer").textContent = `${minutes}:${seconds}`;
        // check if player has won
        // if nBombless = iBound*jBound - nBombs
        if (document.querySelectorAll(".bombless").length == ((iBound * jBound) - nBombs)) {
            clearInterval(interval);
            gameOverWin();
        }
        else if (ended) {
            clearInterval(interval);
        }
    }, 1000);
};

function gameOverWin() {
    alert("You Won!");
    document.querySelector("#save-score-btn").classList.remove("hidden");
    // ended = true will end the click listener and timer
    ended = true;
}

document.querySelector("#difficulty-section").addEventListener("click", function () {
    document.querySelector("#start-btn").classList.remove("hidden");
});

document.querySelector("#start-btn").addEventListener("click", function () {
    init();
});

document.querySelector("#save-btn").addEventListener("click", function () {
    // name from user input
    var name = document.querySelector("#save-score-text").value;

    // score from timer content
    var score = document.querySelector("#timer").textContent;

    savedData[difficulty][name] = score;
    localStorage.setItem("minesweeperScores", JSON.stringify(savedData));

    // append to highscores
    var tag = document.createElement("p");
    tag.textContent = `${name} : ${score}`;
    difficulty = difficulty.toLowerCase();
    document.querySelector(`#${difficulty}-scores`).append(tag);
    console.log("saved score")
});

document.querySelector("#clear-scores-btn").addEventListener("click", function () {
    localStorage.clear();
    document.querySelector("#easy-scores").innerHTML = "";
    document.querySelector("#medium-scores").innerHTML = "";
    document.querySelector("#hard-scores").innerHTML = "";
});