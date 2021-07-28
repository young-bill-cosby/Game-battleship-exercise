var view = {                            //creating view object
    displayMessage: function(msg) {
        var messageArea = document.getElementById("messageArea");
        messageArea.innerHTML = msg;
    },
    displayHit: function(location) {
        var cell = document.getElementById(location);
        cell.setAttribute("class", "hit");
    },
    displayMiss: function(location) {
        var cell = document.getElementById(location);
        cell.setAttribute("class", "miss");
    }
};



var model = {                               //creating model object 
    boardSize: 7,
    numShips: 3,
    shipLength: 3,
    shipsSunk: 0,

    ships: [{ locations: ["06", "16", "26"], hits: ["", "", ""]},
             { locations: ["24", "34", "44"], hits: ["", "", ""]},
             { locations: ["10", "11", "12"], hits: ["", "", ""]}],
    
    fire: function(guess) {
        for (var i = 0; i < this.numShips; i++){
            var ship = this.ships[i];
            var index = ship.locations.indexOf(guess); // shorter way to get locations
            if (index >= 0) {                          // using indexOf method
                ship.hits[index] = "hit";
                view.displayHit(guess);
                view.displayMessage("GOT ME ONCE!!");
                if (this.isSunk(ship))
                view.displayMessage("YOU COMPLETLY DESTROY MY SHIP!!! IT'S SUNK NOW") //connecting view.display
                this.shipSunk++;
                return true;
            }
        }
            view.displayMiss(guess);
            view.displayMessage("YOU MISSED !!");
            return false;
    },

    isSunk: function(ship) {                           // small function to save what's sunk
        for (var i = 0; i < this.shipLength; i++) {
            if (ship.hits[i] !== "hit") {
                return false;
            }
        } 
            return true;
      }
    
};

var controller = {
            guesses: 0,
            processGuess: function(guess) {
                var location = parseGuess(guess);
                if (location) {
                    this.guesses++;
                    var hit = model.fire(location);
                    if(hit && model.shipsSunk === model.numShips) {
                        view.displayMessage("You destroyed all my ships! in " + this.guesses + " guesses");
                    
                    }
                }
            }
};


function parseGuess(guess) {
    var alphabet = ["A", "B", "C", "D", "E", "F", "G"];

    if (guess === null || guess.length !== 2) {
        alert("Please enter the valid code!! eg. B6");
} else {
   firstChar = guess.charAt(0);
   var row = alphabet.indexOf(firstChar);
   var column = guess.charAt(1);

   if (isNaN(row) || isNaN(column)) {
       alert("Sorry there are not a coords!");
   } else if (row < 0 || row >= model.boardSize || 
                        column < 0 || column >= model.boardSize) {
       alert("You hit out of the game"); 
   } else {
       return row + column;
         }
   }
   return null;
}
