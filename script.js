// Obtain difficulty from user input
var difficulty = prompt("easy, medium, or hard?");

// Set parameters of game based on difficulty
if (difficulty === "easy") {
    var iBound = 8;
    var jBound = 10;
    var nBombs = 10;
    var container = document.getElementById("container");
    // Dimensions based on 25px buttons
    container.style.width = "250px";
    container.style.height = "200px";
}
else if (difficulty === "medium") {
    var iBound = 14;
    var jBound = 18;
    var nBombs = 40;
    var container = document.getElementById("container");
    // Dimensions based on 20px buttons
    container.style.width = "360px";
    container.style.height = "280px";
}
else {
    var iBound = 20;
    var jBound = 24;
    var nBombs = 99;
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
            var dummy = document.createElement("button");
            document.getElementById("container").appendChild(dummy);

            // Set class of button based on difficulty
            if (difficulty === "easy") {
                dummy.setAttribute("class", "game-button-easy");
            }
            else if (difficulty === "medium") {
                dummy.setAttribute("class", "game-button-medium");
            }
            else {
                dummy.setAttribute("class", "game-button-hard");
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
        if (bombs[i] !== (iBomb.toString() + "," + jBomb.toString())) {
            // assign value to bomb array
            bombs[i] = iBomb.toString() + "," + jBomb.toString();
            
            // assign has-bomb class to corresponding button
            var buttonWithBomb = document.getElementById(bombs[i]);
            if (difficulty === "easy") {
                buttonWithBomb.setAttribute("class", "game-button-easy has-bomb");
            }
            else if (difficulty === "medium") {
                buttonWithBomb.setAttribute("class", "game-button-medium has-bomb");
            }
            else {
                buttonWithBomb.setAttribute("class", "game-button-hard has-bomb");
            }
        }
        else {
            // try again if this button already has a bomb
            i--;
        }
    }
}

createGrid();
createBombs();

