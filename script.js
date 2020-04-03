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
        document.getElementById(bombs[i]).textContent = "#";
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
        event.target.textContent = "#";
        blowUp();
    }
    else {

        var newId = event.target.id.split(",");
        // console.log(parseInt(newId[1]) + 1);

        // var newId = JSON.stringify(event.target.id);
        // console.log(typeof newId[1]);

        // var newId0 = JSON.stringify(event.target.id)[2];
        // newId0 = parseInt(newId0);
        // var newId1 = JSON.stringify(event.target.id)[6];
        // newId1 = parseInt(newId1);

        // var newId = newId[1] + "," + newId[3];

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

    // id[0] = row, id[1] = col
    console.log(id);

    // for a button not on the top edge or left edge
    if (parseInt(id[0]) !== 0 || parseInt(id[1]) !== 0) {
        // up and left
        var newId0 = parseInt(id[0]) - 1;
        var newId1 = parseInt(id[1]) - 1;

        var newId = newId0.toString() + "," + newId1.toString();
        console.log(newId);

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
        console.log(newId);

        // if (!document.getElementById(newId).classList.contains("bombless")) {
        if (document.getElementById(newId).hasAttribute("data-bomb")) {
            btnClickedNBombs++;
        }
    }
    // for a button not on the top edge or right edge
    if (parseInt(id[0]) !== 0 || parseInt(id[1]) !== jBound - 1) {
        // up and right
        var newId0 = parseInt(id[0]) - 1;
        var newId1 = parseInt(id[1]) + 1;

        var newId = newId0.toString() + "," + newId1.toString();
        console.log(newId);

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
        console.log(newId);

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
        console.log(newId);

        // if (!document.getElementById(newId).classList.contains("bombless")) {
        if (document.getElementById(newId).hasAttribute("data-bomb")) {
            btnClickedNBombs++;
        }
    }
    // for a button not on the bottom edge or left edge
    if (parseInt(id[0]) !== 0 || parseInt(id[1]) !== jBound - 1) {
        // down and left
        var newId0 = parseInt(id[0]) + 1;
        var newId1 = parseInt(id[1]) - 1;

        var newId = newId0.toString() + "," + newId1.toString();
        console.log(newId);

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
        console.log(newId);

        // if (!document.getElementById(newId).classList.contains("bombless")) {
        if (document.getElementById(newId).hasAttribute("data-bomb")) {
            btnClickedNBombs++;
        }
    }
    // for a button not on the bottom edge or the right edge
    if (parseInt(id[0]) !== iBound - 1 || parseInt(id[1]) !== jBound - 1) {
        // down and right
        var newId0 = parseInt(id[0]) + 1;
        var newId1 = parseInt(id[1]) + 1;

        var newId = newId0.toString() + "," + newId1.toString();
        console.log(newId);

        // if (!document.getElementById(newId).classList.contains("bombless")) {
        if (document.getElementById(newId).hasAttribute("data-bomb")) {
            btnClickedNBombs++;
        }
    }
    if (btnClickedNBombs !== 0) {
        document.getElementById(id).textContent = btnClickedNBombs;
    }
    // else {
    //     // top left
    //     checkForBombs([(parseInt(id[0]) - 1).toString(), (parseInt(id[0]) - 1).toString()]);
    //     // top center
    //     checkForBombs([(parseInt(id[0]) - 1).toString(), (parseInt(id[0])).toString()]);
    //     // top right
    //     checkForBombs([(parseInt(id[0]) - 1).toString(), (parseInt(id[0]) + 1).toString()]);
    //     // center left
    //     checkForBombs([(parseInt(id[0])).toString(), (parseInt(id[0]) - 1).toString()]);
    //     // center right
    //     checkForBombs([(parseInt(id[0])).toString(), (parseInt(id[0]) + 1).toString()]);
    //     // bottom left
    //     checkForBombs([(parseInt(id[0]) + 1).toString(), (parseInt(id[0]) - 1).toString()]);
    //     // bottom center
    //     checkForBombs([(parseInt(id[0]) + 1).toString(), (parseInt(id[0])).toString()]);
    //     // bottom right
    //     checkForBombs([(parseInt(id[0]) + 1).toString(), (parseInt(id[0]) + 1).toString()]);
    // }

    // }

}

// if (parseInt(id[0]) !== 0 && parseInt(id[1]) !== 0 && parseInt(id[0]) !== (iBound - 1) && parseInt(id[1]) !== jBound - 1) {
