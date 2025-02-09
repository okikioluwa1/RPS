const userScoreEl = document.querySelector(".score__number");
const resultComment = document.querySelector(".results__comment");
const resultContainer = document.querySelector(".results");
const playAgainBtn = document.querySelector(".playAgain");
const pickTexts = [...document.querySelectorAll(".pickText")];
const iChoicesEl = [...document.querySelectorAll(".choice")];
const choicesContainer = document.querySelector(".container");
const rulesBtn = document.querySelector(".rules");
const rulesContainer = document.querySelector(".rules__container");
const closeBtn = document.querySelector(".rules-close");

const choices = ["rock", "paper", "scissors"];
let fChoicesEl = [];
let userScore = 2;
let playing = true;

const choiceColors = {
  paper: "hsl(230, 89%, 62%)",
  scissors: "hsl(39, 89%, 49%)",
  rock: "hsl(349, 71%, 52%)",
};

rulesBtn.addEventListener("click", function () {
  rulesContainer.style.transform = "translateY(0)";
  closeBtn.style.display = "block";
});

closeBtn.addEventListener("click", function () {
  if (rulesContainer.style.transform === "translateY(0px)") {
    rulesContainer.style.transform = "translateY(100%)";
    closeBtn.style.display = "none";
  }
});

//selecting the choices2
choicesContainer.addEventListener("click", function (e) {
  if (playing) {
    if (e.target === e.currentTarget) return;
    const playerChoice = e.target.closest(".choice");

    if (playerChoice.tagName !== "DIV") return;
    //when selecting tagName, it should be in caps;

    iChoicesEl.forEach((choice) => {
      choice.style.display = "none";
      choicesContainer.style.background = "none";

      if (choice !== playerChoice) return;
      const playerClass = choice.classList[1];
      const playerChoiceEl = document.createElement("div");
      console.log(playerClass);

      //a function that creates a cloned div of selected container.
      const displayChoiceEl = function (choiceEl, classPicked, addedClass) {
        choiceEl.classList.add("choice", addedClass);
        choiceEl.style.border = `15px solid ${choiceColors[classPicked]}`;
        const imgHtml = `<img class="${classPicked}__img icon" src="./img/icon-${classPicked}.svg" alt="${classPicked} img"/>`;
        choiceEl.innerHTML = imgHtml;
        choicesContainer.append(choiceEl);
        fChoicesEl.push(choiceEl);
      };

      //displaying th clone of the selected container  (playerChoice)
      displayChoiceEl(playerChoiceEl, playerClass, "playerChoice");

      //creating an empty space div for the houseChoice to fill;
      const houseSpace = document.createElement("div");
      choicesContainer.append(houseSpace);
      houseSpace.classList.add("choice", "houseSpace");
      houseSpace.style.backgroundColor = `${choiceColors.paper}`;
      fChoicesEl.push(houseSpace);

      //displaying the text for the choices
      pickTexts.forEach((text) => (text.style.display = "block"));

      const housePickTimeOut = function () {
        const pickNum = Math.ceil(Math.random() * 3) - 1;
        const houseClass = choices[pickNum];
        const houseChoiceEl = document.createElement("div");

        //displaying the clone of the selected container (houseChoice)
        displayChoiceEl(houseChoiceEl, houseClass, "houseChoice");
        console.log(fChoicesEl);

        //results
        let message;

        // displaying the result
        const displayResult = (message) => {
          resultComment.textContent = message;
          resultContainer.style.display = "flex";
          userScoreEl.textContent = userScore;
          playing = false;
          choicesContainer.classList.add("finalDesktopView");
          if (userScore < 1) {
            playAgainBtn.textContent = "GAME OVER";
          }
        };

        if (playerClass === houseClass) {
          message = "IT'S A TIE";
          displayResult(message);
        } else if (
          (playerClass === "paper" && houseClass === "rock") ||
          (playerClass === "rock" && houseClass === "scissors") ||
          (playerClass === "scissors" && houseClass === "paper")
        ) {
          message = "YOU WIN";
          userScore++;
          displayResult(message);
        } else {
          message = "YOU LOSE";
          userScore--;
          displayResult(message);
        }
      };

      setTimeout(housePickTimeOut, 2000);
    });
  }
});

playAgainBtn.addEventListener("click", function () {
  if (userScore >= 1) {
    fChoicesEl.forEach((el) => el.remove());
    resultContainer.style.display = "none";
    fChoicesEl = [];
    choicesContainer.style.background =
      "url('/dist/img/bg-triangle.svg') center/contain no-repeat";
    pickTexts.forEach((text) => (text.style.display = "none"));
    iChoicesEl.forEach((choice) => (choice.style.display = "block"));
    if (choicesContainer.classList.contains("finalDesktopView")) {
      choicesContainer.classList.remove("finalDesktopView");
    }
    playing = true;
  }
});
