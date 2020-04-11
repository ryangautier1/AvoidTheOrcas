// Obtain difficulty from user input
var difficulty = prompt("easy, medium, or hard?");

// Set parameters of game based on difficulty
if (difficulty === "easy") {
    var iBound = 8;
    var jBound = 10;
    var nBombs = 12;
    var container = document.getElementById("container");
    // Dimensions based on 25px buttons
    container.style.width = "300px"; // 250
    container.style.height = "240px"; // 200
}
else if (difficulty === "medium") {
    var iBound = 14; // 14
    var jBound = 18; // 18
    var nBombs = 34;
    var container = document.getElementById("container");
    // Dimensions based on 25px buttons
    container.style.width = "450px"; // 20*18 or 25*18
    container.style.height = "350px"; // 20*14 or 25*14
}
else {
    var iBound = 20;
    var jBound = 24;
    var nBombs = 75;
    var container = document.getElementById("container");
    // Dimensions based on 15px buttons
    container.style.width = "360px";
    container.style.height = "300px";
}


// Create grid of buttons
function createGrid() {

    // iterate to create buttons
    for (var i = 0; i < iBound; i++) {
        for (var j = 0; j < jBound; j++) {
            var dummy = document.createElement("div");
            document.getElementById("container").appendChild(dummy);

            // Set size of button based on difficulty
            if (difficulty === "easy") {
                dummy.setAttribute("class", "game-button-easy");
            }
            else if (difficulty === "medium") {
                dummy.setAttribute("class", "game-button-medium");
            }
            else {
                dummy.setAttribute("class", "game-button-hard");
            }

            // set color of button based on position
            // on even rows
            if (i % 2 == 0){
                // set the first button lighter and alternate
                if (j % 2 == 0){
                    dummy.classList.add("light-btn");
                }
                else {
                    dummy.classList.add("dark-btn");
                }
            }
            // on odd rows
            else {
                // set the first button darker and alternate
                if (j % 2 == 0){
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
var bombs = [0];
// create bombs array and assign has-bomb id to corresponding buttons
function createBombs() {
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
            if (difficulty === "easy") {
                buttonWithBomb.setAttribute("data-bomb", "true");
            }
            else if (difficulty === "medium") {
                buttonWithBomb.setAttribute("data-bomb", "true");
            }
            else {
                buttonWithBomb.setAttribute("data-bomb", "true");
            }
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
    interval = setInterval(function () {
        document.getElementById(bombs[i]).innerHTML = "<img src='./assets/orca.png' alt='Image of Orca' class='orca'/>";

        i++;
        if (i == bombs.length) {
            alert("Game Over!");
            clearInterval(interval)
        }
    }, 50);
}

createGrid();
createBombs();

// Look for clicks
var interval;
document.getElementById("container").addEventListener("click", function () {
    if (event.target.hasAttribute("data-bomb")) {
        event.target.innerHTML = "<img src='./assets/orca.png' alt='Image of Orca'/>";
        blowUp();
    }
    else {

        var newId = event.target.id.split(",");

        checkForBombs(newId);
    }
});

function checkForBombs(id) {
    var btnClickedNBombs = 0;
    // var hasBomb = false;
    var id0 = parseInt(id[0]);
    var id1 = parseInt(id[1]);
    var newId = id0 + "," + id1;
    // if (!document.getElementById(newId).classList.contains("bombless")) {
    document.getElementById(newId).classList.add("bombless");
    
    // clear any flags
    if (document.getElementById(id).textContent == "F") {
        document.getElementById(id).textContent = "";
        nFlags++;
        console.log(nFlags);
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


var nFlags = nBombs;

window.oncontextmenu = function (event) {
    // if it was a button
    if (event.target.id !== "") {
        event.preventDefault();
        // if it has not been revealed yet
        if (!event.target.classList.contains("bombless")) {
            // if it's not already flagged
            if (event.target.textContent !== "F") {
                event.target.textContent = "F";
                nFlags--;
                console.log(`nFlags = ${nFlags}`);
            }
            // if it is already flagged
            else {
                event.target.textContent = "";
                nFlags++;
                console.log(`nFlags = ${nFlags}`);
            }
        }
    }
}