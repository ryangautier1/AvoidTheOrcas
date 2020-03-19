function createEasy (){
    for (var i = 0; i < 8; i++){
        for(var j = 0; j < 10; j++){
            var dummy = document.createElement("button");
            document.getElementById("container-easy").appendChild(dummy);
            dummy.setAttribute("class", "easy-button");
            //convert i and j to sgtrings, add them, set that string to new vaiable
            var id = i.toString() + j.toString();
            dummy.setAttribute("id", id)
        }
    }
}

createEasy();