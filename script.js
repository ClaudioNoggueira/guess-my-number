const secretNumber = Math.floor(Math.random() * 20) + 1;
// console.log(`Secret number: ${secretNumber}`);

let score = 20;
let highestScore = Number(window.localStorage.getItem("highestScore")) || 1;

let finished = false;

function checkAnswer(guess) {
  if (finished === false) {
    !guess
      ? noAnswer()
      : guess === secretNumber
      ? rightAnswer()
      : wrongAnswer(guess);
  }
}

function noAnswer() {
  document.getElementById(`message`).textContent = "⛔ No number!";
}

function rightAnswer() {
  finished = true;

  document.getElementById(`message`).textContent = "🎉 You got it right!!!";
  document.getElementById(`message`).style.color = `green`;

  document.getElementById(`secretNumber`).textContent = secretNumber;

  if (score > highestScore) setHighestScore(score);
}

function wrongAnswer(guess) {
  score--;

  document.getElementById(`message`).style.color = `red`;
  document.getElementById(`message`).textContent =
    guess < secretNumber ? `Too LOW.` : `Too HIGH.`;

  document.getElementById(`score`).textContent = score;
}

function setHighestScore(score) {
  highestScore = score;
  document.getElementById(`highestScore`).textContent = highestScore;
  window.localStorage.setItem(`highestScore`, highestScore);
}

document.getElementById(`score`).textContent = score;
document.getElementById(`highestScore`).textContent = highestScore;

document.getElementById(`checkButton`).addEventListener("click", () => {
  const numberEl = document.getElementById(`number`);
  const guess = Number(numberEl.value);
  checkAnswer(guess);
});

document.getElementById(`reloadButton`).addEventListener(`click`, () => {
  location.reload();
});
