const secretNumber = Math.floor(Math.random() * 20) + 1;
// console.log(`Secret number: ${secretNumber}`);

let score = 20;
let highestScore = Number(window.localStorage.getItem("highestScore")) || 1;

let finished = false;

function checkAnswer(guess) {
  const messageEl = document.getElementById(`message`);
  if (finished === false) {
    !guess
      ? noAnswer(messageEl)
      : guess === secretNumber
      ? rightAnswer(messageEl)
      : wrongAnswer(guess, messageEl);
  }
}

function noAnswer(messageEl) {
  messageEl.textContent = "⛔ No number!";
}

function rightAnswer(messageEl) {
  finished = true;

  messageEl.textContent = "🎉 You got it right!!!";
  messageEl.style.color = "white";
  document.body.style.backgroundColor = `green`;

  document.getElementById(`secretNumber`).textContent = secretNumber;

  if (score > highestScore) setHighestScore(score);
}

function wrongAnswer(guess, messageEl) {
  score--;

  messageEl.style.color = `red`;
  messageEl.textContent = guess < secretNumber ? `Too LOW.` : `Too HIGH.`;

  document.getElementById(`score`).textContent = score;

  if (score === 0) looseGame();
}

function looseGame() {
  finished = true;
  document.body.style.backgroundColor = `red`;
  messageEl.style.color = `white`;
  messageEl.textContent = "💥 You lost.";
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
