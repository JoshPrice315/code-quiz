var startBtn = document.querySelector("#btnStart");
var scoreBtn = document.querySelector("#btnScore");
var btnOptionOne = document.querySelector("#btnOptionOne");
var btnOptionTwo = document.querySelector("#btnOptionTwo");
var btnOptionThree = document.querySelector("#btnOptionThree");
var btnOptionFour = document.querySelector("#btnOptionFour");
var submitBtn = document.querySelector("#submit");
var initials = document.querySelector("#initials");
var notScores = document.querySelector("#notScores");
var homeBtn = document.querySelector("#home");
var beginButtons = document.querySelector("#beginButtons");
var scoreTable = document.querySelector("#scoreTable");
var scoreHeader = document.querySelector("#scoreHeader");

var timer = document.querySelector("#timer");
var title = document.querySelector("#codeTitle");
var questions = document.querySelector("#questionPrompt");
var description = document.querySelector("#description");

startBtn.addEventListener("click", startGame);
scoreBtn.addEventListener("click", showScores);
btnOptionOne.addEventListener("click", answerSubmit);
btnOptionTwo.addEventListener("click", answerSubmit);
btnOptionThree.addEventListener("click", answerSubmit);
btnOptionFour.addEventListener("click", answerSubmit);
submitBtn.addEventListener("click", storeScore);
homeBtn.addEventListener("click", goHome);

var Quiz = [
  {
    answers: ["boolean"],
    options: ["integer", "boolean", "string", "float"],
    question: "Q: What data type is the following: true"
  },
  {
    answers: ["[]"],
    options: ["[hey]", "{}", "[]", "''"],
    question: "Q: Select the empty array."
  },
  {
    answers: [".appendChild"],
    options: [".addChild", ".add", ".createElement", ".appendChild"],
    question:
      "Q: What built in Javascript method allows you to move an element from current position to a new position?"
  },
  {
    answers: [".js"],
    options: [".js", ".css", ".script", ".java"],
    question: "Q: What extension do Javascript files have?"
  },
  {
    answers: ["var A = 1"],
    options: ["var A =-= 1", "varA =1", "VAR A=1", "var A = 1"],
    question:
      "Q: Which of the following is the proper way to annouce a varible?"
  }
];

const checkTime = () => {
  if (mainCountDownTimer <= 15) {
    mainCountDownTimer = 0;
    endGame();
  } else {
    mainCountDownTimer -= 15;
    if (counter == Quiz.length) {
      endGame();
    } else {
      playGameStart();
    }
  }
};

var counter = 0;
var otherCounter = 0;
function answerSubmit(e) {
  counter += 1;
  if (Quiz[counter] && !Quiz[counter - 1].answers.includes(e.target.value)) {
    console.log(mainCountDownTimer);
    checkTime();
  } else if (!Quiz[counter]) {
    if (!Quiz[counter - 1].answers.includes(e.target.value)) {
      checkTime();
      endGame();
    } else {
      endGame();
    }
  } else if (counter == Quiz.length) {
    console.log(counter);

    endGame();
  } else if (mainCountDownTimer == 0) {
    endGame();
  } else {
    playGameStart();
  }
}

var startingCountDownTimer = 5;
function startGame() {
  hideElements([scoreBtn, startBtn]);
  var timerInterval = setInterval(function () {
    startingCountDownTimer--;
    description.textContent =
      startingCountDownTimer + " seconds left before game starts";

    if (startingCountDownTimer === 0) {
      clearInterval(timerInterval);
      startGameTimer();
      playGameStart();
    }
  }, 1000);
}
var timerInterval2;

var mainCountDownTimer = 75;
function startGameTimer() {
  timerInterval2 = setInterval(function () {
    if (mainCountDownTimer <= 0) {
      clearInterval(timerInterval2);
      endGame();
    } else {
      mainCountDownTimer--;
    }
    showElements([timer]);

    timer.textContent = mainCountDownTimer + " seconds left before game ends";
  }, 1000);
}

function playGameStart() {
  title.textContent = "Begin!";
  description.textContent = "Choose an answer below and hit submit";
  startBtn.style.display = "none";
  scoreBtn.style.display = "none";

  btnOptionOne.style.display = "block";
  btnOptionTwo.style.display = "block";
  btnOptionThree.style.display = "block";
  btnOptionFour.style.display = "block";

  btnOptionOne.textContent = Quiz[counter].options[0];
  btnOptionOne.value = Quiz[counter].options[0];

  btnOptionTwo.textContent = Quiz[counter].options[1];
  btnOptionTwo.value = Quiz[counter].options[1];

  btnOptionThree.textContent = Quiz[counter].options[2];
  btnOptionThree.value = Quiz[counter].options[2];

  btnOptionFour.textContent = Quiz[counter].options[3];
  btnOptionFour.value = Quiz[counter].options[3];

  questions.textContent = Quiz[counter].question;
}
var score;
function endGame() {
  counter = 0;
  btnOptionOne.style.display = "none";
  btnOptionTwo.style.display = "none";
  btnOptionThree.style.display = "none";
  btnOptionFour.style.display = "none";
  description.textContent = "Game Over, your score is " + mainCountDownTimer;
  score = mainCountDownTimer;
  clearInterval(timerInterval2);
  timer.style.display = "none";
  questions.style.display = "none";
  title.textContent = "Game over!";
  initials.style.display = "block";
  submitBtn.style.display = "block";
  timer.textContent = "Timer";
}

function storeScore() {
  var oldHighScore = parseInt(localStorage.getItem(initials.value));
  if (oldHighScore) {
    if (parseInt(score) > oldHighScore) {
      window.localStorage.setItem(initials.value, score);
    }
  } else {
    window.localStorage.setItem(initials.value, score);
  }
  hideElements([initials, submitBtn]);
  showScores();
}

function showScores() {
  scoreHeader.style.display = "block";
  scoreHeader.style.color = "Purple";

  scoreTable.innerHTML = "";
  notScores.style.display = "none";
  showElements([homeBtn, scoreTable]);
  const scoreInfo = Object.entries(window.localStorage);
  scoreInfo.sort((a, b) => parseInt(b[1]) - parseInt(a[1]));

  var iniRow = document.createElement("tr");
  var initialsCol = document.createElement("th");
  var scoreCol = document.createElement("th");
  initialsCol.textContent = "Initials";
  scoreCol.textContent = "Score";
  iniRow.appendChild(initialsCol);
  iniRow.appendChild(scoreCol);
  scoreTable.appendChild(iniRow);
  console.log("hello");
  for (var i = 0; i < Object.values(window.localStorage).length; i++) {
    var row = document.createElement("tr");
    var name = document.createElement("th");
    var score = document.createElement("th");
    name.textContent = scoreInfo[i][0];
    score.textContent = scoreInfo[i][1];
    row.appendChild(name);
    row.appendChild(score);
    scoreTable.appendChild(row);
  }
}

const hideElements = elements => {
  elements.forEach(element => (element.style.display = "none"));
};
const showElements = elements => {
  elements.forEach(element => (element.style.display = "block"));
};

function goHome() {
  startingCountDownTimer = 5;
  mainCountDownTimer = 75;
  codeTitle.textContent = "Welcome to Coding quiz!";
  description.textContent =
    "To begin the quiz, press start. To view highscores, presshigh scores";
  showElements([startBtn, scoreBtn, notScores, timer]);
  hideElements([homeBtn, scoreTable, scoreHeader]);
}