// Selector

const word = document.getElementById("word");
const typingWord = document.getElementById("typing-word");
const inputs = document.getElementById("input-container");
const newWord = document.getElementById("newWord");
const resetWord = document.getElementById("resetWord");
const attemps = document.getElementById("attemps");
const mistakes = document.getElementById("mistakes");

const apiURL = "https://random-word-api.herokuapp.com/word";
let fetchWord, maxAttemps, correct = [], mistake = [];

// Functions

function generate() {
    fetch(apiURL)
        .then(response => response.json())
        .then(data => {
            fetchWord = data[0];
            maxAttemps = 0; correct = []; mistake = [];
            console.log(fetchWord);
            word.innerHTML = randomLetter(fetchWord);
            attemps.innerHTML = `${maxAttemps} / 5`;
            attemps.innerHTML = mistake;
            inputs.innerHTML = createInputs(fetchWord);
        })
        .catch(error => console.log("Error:", error));
}

generate();

function randomLetter(word) {
    let letter = word.split("");

    letter.sort(() => {
        return 0.5 - Math.random();
    });

    let letterRandom = letter.join("");
    return letterRandom
}

function createInputs(word) {
    let input = "";

    for(let i = 0 ; i < word.length ; i++) {
        input += `<input type="text" class="input" maxlength="1" disabled>`
    }

    return input
}

function initGame(e) {
    const REGEX = /^[a-zA-Z]+$/;
    let key = e.target.value.toLowerCase();
    
    if(key.match(REGEX) && !mistake.includes(` ${key}` && correct.includes(key))) {
        console.log(key);
        if(fetchWord.includes(key)) {
            for (let i = 0; i < fetchWord.length; i++) {
                if(fetchWord[i] === key) {
                    correct.push(key);
                    inputs.querySelectorAll("input")[i].value = key;
                }
            }
        } else {
            maxAttemps++;
            mistake.push(` ${key}`);
        };
        attemps.innerHTML = `${maxAttemps} / 5`;
        mistakes.innerHTML = mistake;
    }
    typingWord.value = "";

    setTimeout(() => {
        if(correct.length === fetchWord.length){
            alert(`Kudos 👏, you found the word 🎉🥳🎊 ${fetchWord.toUpperCase()} 🎊🥳🎉`);
            generate();
        } else if(maxAttemps === 5) {
            alert("💀 Game Over❗☠️, you ran out of attemps❗");
            for (let i = 0; i < fetchWord.length; i++) {
                inputs.querySelectorAll("input")[i].value = fetchWord[i];
            }
        }
    });
}

// Events

newWord.addEventListener("click", generate);

resetWord.addEventListener("click", () => {
    maxAttemps = 0; correct = []; mistake = [];
    
    attemps.innerHTML = `${maxAttemps} / 5`;
    mistakes.innerHTML = mistake;
    for (let i = 0; i < fetchWord.length; i++) {
        inputs.querySelectorAll("input")[i].value = "";
    }
});

typingWord.addEventListener("input", initGame);
inputs.addEventListener("click", () => typingWord.focus());
document.addEventListener("keydown", () => typingWord.focus());