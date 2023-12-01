const hangmanImage = document.getElementById("Hangman");
const wordDisplay = document.querySelector(".Word");
const guessesText = document.querySelector("#Incorrect");
const keyboardDiv = document.querySelector("#keyboard");
const gameModal = document.querySelector(".content")
const playAgainBtn = document.querySelector("#PlayAgain")


//Confetti
const canvas = document.querySelector('#confetti');
const jsConfetti = new JSConfetti();

var sound3 = new Audio();
sound3.src = "sounds/mixkit-happy-party-horn-sound-530.wav";
function confettiWin(){
    jsConfetti.addConfetti();
    sound3.play();
}


let currentWord, correctLetters, wrongGuessCount;
const maxGuesses = 6;


const resetGame = () =>{
    //Game resets when you click Play Again
     correctLetters =[];
     wrongGuessCount = 0;

     hangmanImage.src = "images/hang" + wrongGuessCount + ".png";
     guessesText.innerText = `${wrongGuessCount}/ ${maxGuesses}`;
     keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = false);


     wordDisplay.innerHTML = currentWord.split("").map(() => '<li class="letter"></li>').join("");
     
     gameModal.classList.remove("show");

     

}

const getRandomWord = () =>{
    //Slecting random word and hint from WordList
    const { word,hint }= wordList[Math.floor(Math.random()*wordList.length)];
    currentWord = word;
   
    document.getElementById("Hint").innerHTML = hint;
    resetGame();
    
};

const gameOver = (isVictory) => {

    //Game over screen
    setTimeout(() =>{
        const modalText = isVictory ? "You found the word" : "The correct word was";
        gameModal.querySelector("h4").innerHTML = `${isVictory ? `Congrats!` : `Game Over!`}`;
        gameModal.querySelector("#correctword").innerHTML = `${currentWord}`;
        gameModal.classList.add("show");
        if (isVictory === true){
            confettiWin()
        }
    }, 300);
}

//Checking if letter that was clicked is in word
const initGame = (button, clickedLetter) => {
    if(currentWord.includes(clickedLetter)){
        //Showing all correct letters on the word display
        [...currentWord].forEach((letter, index) =>{
            if(letter === clickedLetter){
                correctLetters.push(letter)
                wordDisplay.querySelectorAll("li")[index].innerHTML = letter;
                wordDisplay.querySelectorAll("li")[index].classList.add("guessed");

            }
        })
    } else{
        //If clicked letter doesn't exist then update the wrongGuessCount and hangman image
        wrongGuessCount++;
        console.log(wrongGuessCount);
        hangmanImage.src = "images/hang" + wrongGuessCount + ".png";

    }
    button.disabled = true;
    guessesText.innerText = `${wrongGuessCount}/ ${maxGuesses}`;



    //Calling gameOver if any condition is met
    if(wrongGuessCount === maxGuesses) return gameOver(false)
    if(correctLetters.length === currentWord.length) return gameOver(true)
};

//Keyboard buttons and event listeners
for (let i=97; i<=122; i++){
    const button=document.createElement("button");
    button.innerText = String.fromCharCode(i);
    keyboardDiv.appendChild(button);
    button.addEventListener("click", e=>initGame(e.target,String.fromCharCode(i)));
};

getRandomWord();
playAgainBtn.addEventListener("click", getRandomWord)
