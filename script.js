"use strict";
const secretNumber = Math.floor(Math.random() * 20) + 1;
// console.log(`Secret number: ${secretNumber}`);

let score = 20;
let highestScore = Number(window.localStorage.getItem("highestScore")) || 1;

let finished = false;

let messageEl = $(`#message`);

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
  messageEl.text("⛔ No number!");
}

function rightAnswer() {
  finished = true;

  messageEl.text("🎉 You got it right!!!");
  messageEl.css({ color: `white` });
  $(`body`).css({ backgroundColor: `green` });

  $(`#secretNumber`).text(secretNumber);

  if (score > highestScore) setHighestScore(score);
}

function wrongAnswer(guess) {
  score--;

  messageEl.css({ color: `red` });
  messageEl.text(guess < secretNumber ? `Too LOW.` : `Too HIGH.`);

  $(`#score`).text(score);

  if (score === 0) looseGame();
}

function looseGame() {
  finished = true;
  messageEl.text("💥 You lost.");
  messageEl.css({ color: `white` });
  $(`body`).css({ backgroundColor: `red` });
}

function setHighestScore(score) {
  highestScore = score;
  $(`#highestScore`).text(highestScore);
  window.localStorage.setItem(`highestScore`, highestScore);
}

$(`#score`).text(score);
$(`#highestScore`).text(highestScore);

$(`#checkButton`).click((e) => {
  const guess = Number($(`#number`).val());
  checkAnswer(guess);
});

$(`#reloadButton`).click((e) => {
  location.reload();
});
