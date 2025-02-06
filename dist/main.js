const choices = ["rock", "paper", "scissors"];
const players = ["user", "computer"];
const userScoreEl = document.querySelector(".score__number");
const resultComment = document.querySelector(".results__comment");
const resultContainer = document.querySelector(".results");
const playAgainBtn = document.querySelector(".playAgain");

let playerChoice;
let activePlayer;
let userScore = 12;
let message;
let playing = true;

const choiceColors = {
  paper: "hsl(230, 89%, 62%)",
  scissors: "hsl(39, 89%, 49%)",
  rock: "hsl(349, 71%, 52%)",
};

//selecting the choices
const choicesContainer = document.querySelector(".container");
let choicesEl;

choicesContainer.addEventListener("click", function (e) {
  if (playing) {
    if (e.target === e.currentTarget) return;
    const selectedContainer = e.target.closest(".choice");
    console.log(selectedContainer);

    if (selectedContainer.tagName === "DIV") {
      //when selecting tagName, it should be in caps;
      choicesEl = document.querySelectorAll(".choice");
      console.log(choicesEl);
      choicesEl.forEach((choice) => {
        choice.style.display = "none";
        choicesContainer.style.background = "none";

        if (choice === selectedContainer) {
          const choiceClass = choice.classList[1];
          console.log(choiceClass);
          choice.style.display = "block";
          choice.classList.remove(`${choiceClass}`);
          choice.classList.add("activeChoice");
          choice.style.border = `15px solid ${choiceColors[choiceClass]} `;

          const houseSpace = document.createElement("div");
          choicesContainer.append(houseSpace);
          houseSpace.classList.add("choice", "houseSpace");
          houseSpace.style.backgroundColor = `${choiceColors.paper}`;

          const pickTexts = [...document.querySelectorAll(".pickText")];
          pickTexts.forEach((text) => (text.style.display = "block"));

          const housePickTimeOut = function () {
            const pickNum = Math.ceil(Math.random() * 3) - 1;
            const houseClass = choices[pickNum];
            choicesEl = [...document.querySelectorAll(".choice")];
            console.log(choiceClass, pickNum, houseClass);

            if (choiceClass === houseClass) {
              console.log("the same thing");
              const houseChoiceEl = document.createElement("div");
              houseChoiceEl.classList.add("choice", "houseChoice");
              houseChoiceEl.style.border = `15px solid ${choiceColors[houseClass]} `;

              const imgHtml = `<img class="${houseClass}__img icon" src="./img/icon-${houseClass}.svg" alt="${houseClass} img"/>`;
              houseChoiceEl.innerHTML = imgHtml;
              choicesContainer.append(houseChoiceEl);
            } else {
              console.log("not the same");
              const houseChoiceEl = choicesEl.find((choice) => {
                if (choice.classList[1] === houseClass) return choice;
              });

              console.log(true, houseChoiceEl);
              houseChoiceEl.classList.remove(`${houseClass}`);
              houseChoiceEl.classList.add("houseChoice");
              houseChoiceEl.style.border = `15px solid ${choiceColors[houseClass]} `;
              houseSpace.style.display = "none";
              houseChoiceEl.style.display = "block";
            }

            //results
            const displayResult = () =>
              (resultContainer.style.display = "block");
            if (choiceClass === houseClass) {
              message = "IT'S A TIE";
              resultComment.textContent = message;
              userScore = 12;
              userScoreEl.textContent = userScore;
              displayResult();
              playing = false;
            } else if (
              (choiceClass === "paper" && houseClass === "rock") ||
              (choiceClass === "rock" && houseClass === "scissors") ||
              (choiceClass === "scissors" && houseClass === "paper")
            ) {
              message = "YOU WIN";
              resultComment.textContent = message;
              userScore++;
              userScoreEl.textContent = userScore;
              displayResult();
              playing = false;
            } else {
              message = "YOU LOSE";
              resultComment.textContent = message;
              userScore--;
              userScoreEl.textContent = userScore;
              displayResult();
              playing = false;
            }
          };

          setTimeout(housePickTimeOut, 2000);
        }
      });
    }
  }
});

playAgainBtn.addEventListener("click", function () {
  playing = true;
  resultContainer.style.display = "none";
});
