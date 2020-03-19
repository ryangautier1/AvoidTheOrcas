// Obtain difficulty from user input
var difficulty = prompt("easy, medium, or hard?");

// Create grid of buttons
function createGrid() {
    
    // Set size of grid based on difficulty
    if (difficulty === "easy") {
        var iBound = 8;
        var jBound = 10;
        var container = document.getElementById("container");
        // Dimensions based on 25px buttons
        container.style.width = "250px";
        container.style.height = "200px";
    }
    else if (difficulty === "medium") {
        var iBound = 14;
        var jBound = 18;
        var container = document.getElementById("container");
        // Dimensions based on 20px buttons
        container.style.width = "360px";
        container.style.height = "280px";
    }
    else {
        var iBound = 20;
        var jBound = 24;
        var container = document.getElementById("container");
        // Dimensions based on 15px buttons
        container.style.width = "360px";
        container.style.height = "300px";
    }
    
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

function createBombsEasy() {

}

createGrid();