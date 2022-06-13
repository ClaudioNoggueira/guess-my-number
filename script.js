const secretNumber = Math.floor(Math.random() * 20) + 1;
// console.log(`Secret number: ${secretNumber}`);

let numberOfGuesses = 20;
let highestScore = 1;

let finished = false;

function checkAnswer(guess) {
  if (finished === false) {
    guess === secretNumber ? rightAnswer() : wrongAnswer(guess);
  }
}

function rightAnswer() {
  finished = true;

  document.getElementById(`message`).textContent = "You got it right!!!";
  document.getElementById(`message`).style.color = `green`;

  document.getElementById(`secretNumber`).textContent = secretNumber;

  if (numberOfGuesses > highestScore) setHighestScore(numberOfGuesses);
}

function wrongAnswer(guess) {
  numberOfGuesses--;

  document.getElementById(`message`).style.color = `red`;
  document.getElementById(`message`).textContent =
    guess < secretNumber ? `Too LOW.` : `Too HIGH.`;

  document.getElementById(`score`).textContent = numberOfGuesses;
}

function setHighestScore(score) {
  highestScore = score;
  document.getElementById(`highestScore`).textContent = highestScore;
}

document.getElementById(`checkButton`).addEventListener("click", () => {
  const numberEl = document.getElementById(`number`);
  const guess = Number(numberEl.value);
  checkAnswer(guess);
});
