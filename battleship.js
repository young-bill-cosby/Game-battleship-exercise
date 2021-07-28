

var model = {                               //creating model object 
    boardSize: 7,
    numShips: 3,
    shipLength: 3,
    shipsSunk: 0,

    ships: [{ locations: ["0", "0", "0"], hits: ["", "", ""]},
             { locations: ["0", "0", "0"], hits: ["", "", ""]},
             { locations: ["0", "0", "0"], hits: ["", "", ""]}],
    
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
      },

      generateShipLocations: function() {               //ship generators
		var locations;
		for (var i = 0; i < this.numShips; i++) {
			do {
				locations = this.generateShip();
			} while (this.collision(locations));
			this.ships[i].locations = locations;
		}
		console.log("Tablica okrętów: ");
		console.log(this.ships);
	},

	generateShip: function() {
		var direction = Math.floor(Math.random() * 2);
		var row, col;

		if (direction === 1) { 
			row = Math.floor(Math.random() * this.boardSize);   // horizontal
			col = Math.floor(Math.random() * (this.boardSize - this.shipLength));
		} else {
			row = Math.floor(Math.random() * (this.boardSize - this.shipLength));
			col = Math.floor(Math.random() * this.boardSize);   // vertical 
		}

		var newShipLocations = [];
		for (var i = 0; i < this.shipLength; i++) {
			if (direction === 1) {
				newShipLocations.push(row + "" + (col + i));
			} else {
				newShipLocations.push((row + i) + "" + col);
			}
		}
		return newShipLocations;
	},

	collision: function(locations) {            //collision block
		for (var i = 0; i < this.numShips; i++) {
			var ship = this.ships[i];
			for (var j = 0; j < locations.length; j++) {
				if (ship.locations.indexOf(locations[j]) >= 0) {
					return true;
				}
			}
		}
		return false;
	}
	
};


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

var controller = {
	guesses: 0,

	processGuess: function(guess) {
		var location = parseGuess(guess);
		if (location) {
			this.guesses++;
			var hit = model.fire(location);
			if (hit && model.shipsSunk === model.numShips) {
               view.displayMessage(`You destroyed all my ships in ${this.guesses} guesses`);
			}
		}
	}
}

function parseGuess(guess) {                        // customer service
	var alphabet = ["A", "B", "C", "D", "E", "F", "G"];

	if (guess === null || guess.length !== 2) {
		alert("Please eneter the valid coords eg. B6");
	} else {
		var firstChar = guess.charAt(0);
		var row = alphabet.indexOf(firstChar);
		var column = guess.charAt(1);
		
		if (isNaN(row) || isNaN(column)) {
			alert("There are not a coords!");
		} else if (row < 0 || row >= model.boardSize ||
		           column < 0 || column >= model.boardSize) {
			alert("This is out of the game");
		} else {
			return row + column;
		}
	}
	return null;
}



function handleFireButton() {
    var guessInput = document.getElementById("guessInput");
    var guess = guessInput.value;
    controller.processGuess(guess);
    guessInput.value = "";
}

function handleKeyPress(e) {   // adding keypress function
    var fireButton = document.getElementById("fireButton");
    if (e.keyCode === 13) {
        fireButton.click();
        return false;
    }
};

window.onload = init; 

function init() {                           // event handling procedure
    var fireButton = document.getElementById("fireButton");
    fireButton.onclick = handleFireButton;
    var guessInput = document.getElementById("guessInput");
    guessInput.onkeypress = handleKeyPress; 

    model.generateShipLocations();
}