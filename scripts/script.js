const wordDisplay = document.querySelector(".Word");
const guessesText = document.querySelector("#Incorrect");
const keyboardDiv = document.querySelector("#keyboard");

let currentWord, wrongGuessCount = 0;
const maxGuesses = 6;

const getRandomWord = () =>{
    //Slecting random word and hint from WordList
    const { word,hint }= wordList[Math.floor(Math.random()*wordList.length)];
    currentWord = word;
    document.getElementById("Hint").innerHTML = hint;
    wordDisplay.innerHTML = word.split("").map(() => '<li class="letter"></li>').join("");
};

//Checking if letter that was clicked is in word
const initGame = (button, clickedLetter) => {
    if(currentWord.includes(clickedLetter)){
        //Showing all correct letters on the word display
        [...currentWord].forEach((letter, index) =>{
            if(letter === clickedLetter){
                wordDisplay.querySelectorAll("li")[index].innerHTML = letter;
                wordDisplay.querySelectorAll("li")[index].classList.add("guessed");

            }
        })
    } else{
        wrongGuessCount++;
        document.querySelector(".guessLetter").innerHTML = clickedLetter;

    }
};

//Keyboard buttons and event listeners
for (let i=97; i<=122; i++){
    const button=document.createElement("button");
    button.innerText = String.fromCharCode(i);
    keyboardDiv.appendChild(button);
    button.addEventListener("click", e=>initGame(e.target,String.fromCharCode(i)));
};

getRandomWord();