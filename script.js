var container = document.getElementById("container-game");

var iBound;
var jBound;
var nBombs;
var nFlags;

var difficulty;
var ended;

// Print scores to highscores
var scores = {
    easy: {
        names: [JSON.parse(localStorage.getItem("scores")).easy.names],
        scores: [JSON.parse(localStorage.getItem("scores")).easy.scores]
    },
    medium: {
        names: [JSON.parse(localStorage.getItem("scores")).medium.names],
        scores: [JSON.parse(localStorage.getItem("scores")).medium.scores]
    },
    hard: {
        names: [JSON.parse(localStorage.getItem("scores")).hard.names],
        scores: [JSON.parse(localStorage.getItem("scores")).hard.scores]
    }
}

// document.getElementById("easy-scores").textContent = (JSON.parse(localStorage.getItem("scores")).easy);
// document.getElementById("medium-scores").textContent = (JSON.parse(localStorage.getItem("scores")).medium);
// document.getElementById("hard-scores").textContent = (JSON.parse(localStorage.getItem("scores")).hard);


// Obtain difficulty from user input
function getDifficulty() {
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
        // var container = document.getElementById("container");
        // // Dimensions based on 30px buttons
        // container.style.width = "300px"; // 30*10
        // container.style.height = "240px"; // 30*8
    }
    else if (difficulty === "Medium") {
        iBound = 14; // 14
        jBound = 18; // 18
        nBombs = 34;
        container.classList.add("container-medium");
        // var container = document.getElementById("container");
        // // Dimensions based on 25px buttons
        // container.style.width = "450px"; // 25*18
        // container.style.height = "350px"; // 25*14
    }
    else {
        iBound = 20;
        jBound = 24;
        nBombs = 75;
        container.classList.add("container-hard");
        // // Dimensions based on 25px buttons
        // container.style.width = "600px"; // 25*24
        // container.style.height = "500px"; // 25*20
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
    var btnClickedNBombs = 0;


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

        if (document.getElementById(newId).hasAttribute("data-bomb")) {
            btnClickedNBombs++;
        }
    }
    if (btnClickedNBombs !== 0) {
        document.getElementById(id).textContent = btnClickedNBombs;
    }
    else {
        // for a button not on the top edge or left edge   
        if (parseInt(id[0]) !== 0 && parseInt(id[1]) !== 0) {

            // top left
            var newId0 = parseInt(id[0]) - 1;
            var newId1 = parseInt(id[1]) - 1;
            var newId = newId0.toString() + "," + newId1.toString();
            newId = newId.split(",");

            // if it does not have a bomb or bombless class
            if (!document.getElementById(newId).hasAttribute("data-bomb") && !document.getElementById(newId).classList.contains("bombless")) {
                checkForBombs(newId);
            }

        }
        // for a button not on the top edge
        if (parseInt(id[0]) !== 0) {
            // up and center
            var newId0 = parseInt(id[0]) - 1;
            var newId1 = parseInt(id[1]);
            var newId = newId0.toString() + "," + newId1.toString();
            newId = newId.split(",");
            if (!document.getElementById(newId).hasAttribute("data-bomb") && !document.getElementById(newId).classList.contains("bombless")) {
                checkForBombs(newId);
            }
        }
        // for a button not on the top edge or right edge
        if (parseInt(id[0]) !== 0 && parseInt(id[1]) !== jBound - 1) {
            // up and right

            var newId0 = parseInt(id[0]) - 1;
            var newId1 = parseInt(id[1]) + 1;
            var newId = newId0.toString() + "," + newId1.toString();
            newId = newId.split(",");
            if (!document.getElementById(newId).hasAttribute("data-bomb") && !document.getElementById(newId).classList.contains("bombless")) {
                checkForBombs(newId);
            }
        }


        if (parseInt(id[1]) !== 0) {
            // center left
            var newId0 = parseInt(id[0]);
            var newId1 = parseInt(id[1]) - 1;
            var newId = newId0.toString() + "," + newId1.toString();
            newId = newId.split(",");
            if (!document.getElementById(newId).hasAttribute("data-bomb") && !document.getElementById(newId).classList.contains("bombless")) {
                checkForBombs(newId);
            }
        }

        if (parseInt(id[1]) !== jBound - 1) {
            // center right
            var newId0 = parseInt(id[0]);
            var newId1 = parseInt(id[1]) + 1;
            var newId = newId0.toString() + "," + newId1.toString();
            newId = newId.split(",");
            if (!document.getElementById(newId).hasAttribute("data-bomb") && !document.getElementById(newId).classList.contains("bombless")) {
                checkForBombs(newId);
            }
        }

        if (parseInt(id[0]) !== iBound - 1 && parseInt(id[1]) !== 0) {
            // bottom left
            var newId0 = parseInt(id[0]) + 1;
            var newId1 = parseInt(id[1]) - 1;
            var newId = newId0.toString() + "," + newId1.toString();
            newId = newId.split(",");
            if (!document.getElementById(newId).hasAttribute("data-bomb") && !document.getElementById(newId).classList.contains("bombless")) {
                checkForBombs(newId);
            }
        }

        if (parseInt(id[0]) !== iBound - 1) {
            // bottom center
            var newId0 = parseInt(id[0]) + 1;
            var newId1 = parseInt(id[1]);
            var newId = newId0.toString() + "," + newId1.toString();
            newId = newId.split(",");
            if (!document.getElementById(newId).hasAttribute("data-bomb") && !document.getElementById(newId).classList.contains("bombless")) {
                checkForBombs(newId);
            }
        }

        if (parseInt(id[0]) !== iBound - 1 && parseInt(id[1]) !== jBound - 1) {
            // bottom right
            var newId0 = parseInt(id[0]) + 1;
            var newId1 = parseInt(id[1]) + 1;
            var newId = newId0.toString() + "," + newId1.toString();
            newId = newId.split(",");
            if (!document.getElementById(newId).hasAttribute("data-bomb") && !document.getElementById(newId).classList.contains("bombless")) {
                checkForBombs(newId);
            }
        }

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

    var interval = setInterval(function () {
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
    ended = true;
}

document.querySelector("#difficulty-section").addEventListener("click", function () {
    document.querySelector("#start-btn").classList.remove("hidden");
});

document.querySelector("#start-btn").addEventListener("click", function () {
    // init();
    var scores = {
        easy: {
            names: ["Ryan", "Tasha", "Jojo", "Alina"],
            scores: ["11:11", "22:22", "33:33", "44:44"]
        },
        medium: {
            names: ["Ryan", "Tasha", "Jojo", "Alina"],
            scores: ["11:11", "22:22", "33:33", "44:44"]
        },
        hard: {
            names: ["Ryan", "Tasha", "Jojo", "Alina"],
            scores: ["11:11", "22:22", "33:33", "44:44"]
        }
    }
    localStorage.setItem("scores", JSON.stringify(scores));
    console.log(JSON.parse(localStorage.getItem("scores")).easy.names[0]);
});

document.querySelector("#save-btn").addEventListener("click", function () {
    // var scores
    // localStorage.setItem("", scores);
    console.log("saved score")
});