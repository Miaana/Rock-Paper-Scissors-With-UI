console.log("js file is loaded");

const playerChoiceElem = document.querySelector(".playerChoiceContainer");
const userScoreElem = document.querySelector("#userScore");
const computerScoreElem = document.querySelector("#computerScore");
const winnerElem = document.querySelector("#winnerHeading");
const btnsContainer = document.querySelector(".options");
const buttonsElem = btnsContainer.querySelectorAll("button");
const resetBtn = document.querySelector("#resetButton");
const options = ["rock", "paper", "scissors"];
let rounds = 0;

buttonsElem.forEach((button) => {
  button.addEventListener("click", () => play(button.dataset.choice));
});

resetBtn.addEventListener("click", reset);

function play(userChoice) {
  const computerChoice = randomChoice();
  let roundWinner = "";

  if (computerChoice === userChoice) {
    roundWinner = "draw";
  } else {
    switch (computerChoice) {
      case "rock":
        roundWinner = userChoice === "paper" ? "user" : "computer";
        break;

      case "paper":
        roundWinner = userChoice === "scissors" ? "user" : "computer";
        break;

      case "scissors":
        roundWinner = userChoice === "rock" ? "user" : "computer";
        break;

      default:
        console.error(`Something ain't right!`);
    }
  }
  rounds++;
  displayPlayerChoice(roundWinner, userChoice, computerChoice);
  displayResult(roundWinner);
}

function displayPlayerChoice(winner, user, computer) {
  const winners = `user choice: ${user.toUpperCase()} --- computer choice: ${computer.toUpperCase()}`;
  const draw = `both players choose: ${user.toUpperCase()}`;

  if (winner === "user" || winner === "computer") {
    playerChoiceElem.textContent = winners;
  } else if (winner === "draw") {
    playerChoiceElem.textContent = draw;
  }
}

function displayResult(winner) {
  let userScore = Number(userScoreElem.textContent);
  let compScore = Number(computerScoreElem.textContent);

  const headingMsg = `${winner.toUpperCase()} wins 🏆🏆🏆`;
  winnerElem.classList.remove("winner-1", "winner-2");

  switch (winner) {
    case "user":
      userScore++;
      winnerElem.textContent = headingMsg;
      winnerElem.classList.add("winner-1");
      userScoreElem.textContent = userScore;
      break;

    case "computer":
      compScore++;
      winnerElem.textContent = headingMsg;
      winnerElem.classList.add("winner-2");
      computerScoreElem.textContent = compScore;
      break;

    case "draw":
      winnerElem.textContent = "DRAW - all are winners, until further notice!";
      winnerElem.classList.remove("winner-1", "winner-2");
      break;

    default:
      console.console.error("no bueno...call me");
      break;
  }
}

function randomChoice() {
  const randomI = options[Math.floor(Math.random() * options.length)];
  return randomI;
}

function reset() {
  winnerElem.textContent = "";
  winnerElem.classList.remove("winner-1", "winner-2");
  playerChoiceElem.textContent = "";
  computerScoreElem.textContent = 0;
  userScoreElem.textContent = 0;
}
