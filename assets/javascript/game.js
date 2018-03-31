var letters = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q"
    ,"r","s","t","u","v","w","x","y","z"];

var GameState = {
    computerChoice: '',
    wins: 0,
    losses: 0,
    guessesLeft: 9,
    userGuesses: [],

    gameStart: function() {
        // Starts the game by generating a random letter and rendering the 
        // values into the page
        this.letterGenerator();
        this.render();

        //onkeydown event calling handleKeyEvent method
        document.onkeydown = this.handleKeyEvent.bind(this);
    },
    
    //Creates the function for generating a random letter
    letterGenerator: function() {
        var randomIndex = Math.floor(Math.random() * (letters.length -1));
        this.computerChoice = letters[randomIndex];
    },

    //Regester key events
    handleKeyEvent: function(event) {
        var theKey = event.key;

        //use only letter keys
        if(event.keyCode < 65 || event.keyCode > 90) {
            return;
        };
        
        //Handles correct guesses and resets the game
        if(theKey === this.computerChoice) {
            console.log("you got it");
            this.wins += 1;
            this.reset();
            this.render();
        }
        //Handles wrong guesses
        else if((this.guessesLeft - 1) > 0) {
            this.guessesLeft -= 1; 
            //pushes letters to an array
            this.userGuesses.push(theKey);    
            this.render();                                                                                                                          
        }
        //Handles a loss and resets the game
        else{
            this.losses +=1;
            this.reset();
            this.render();
        }
    },

    //Resets Guesses left and clears the array
    reset: function() {
        this.letterGenerator();
        this.guessesLeft = 9;
        this.userGuesses = [];
    },

    //A function for rendering the values into the page
    render: function(){
        var winsElement = document.getElementById("wins");
        var lossesElement = document.getElementById("losses");
        var guessesLeftElement = document.getElementById("guesses-left");
        var userGuessesElement = document.getElementById("user-guesses");

        winsElement.textContent = this.wins;
        lossesElement.textContent = this.losses;
        guessesLeftElement.textContent = this.guessesLeft;
        userGuessesElement.textContent = this.userGuesses.join(", ");
    },
}

GameState.gameStart();
