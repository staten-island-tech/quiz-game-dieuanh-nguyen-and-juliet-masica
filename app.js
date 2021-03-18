const question = document.querySelector("#question");
const choices = Array.from(document.querySelectorAll(".choice-text"));
const scoreText = document.querySelector("#score");

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let availableQuestions = [];
let questions = [
  {
    question: "What country is Venice located in?",
    choice1: "France",
    choice2: "Italy",
    choice3: "Australia",
    choice4: "Japan",
    answer: 2,
  },
  {
    question: "Who is the main character in Harry Potter?",
    choice1: "Henry Porter",
    choice2: "Hairy Potter",
    choice3: "Harry Potter",
    choice4: "Henrie Potsticker",
    answer: 3,
  },
  {
    question: "Which of these Avengers isn't dead?",
    choice1: "Iron Man",
    choice2: "Hawkeye",
    choice3: "Black Widow",
    choice4: "Vision",
    answer: 2,
  },
  {
    question: "Who is the best spiderman?",
    choice1: "Tobey Maguire",
    choice2: "Andrew Garfield",
    choice3: "Tom Holland",
    choice4: "none of them",
    answer: 3,
  },
  {
    question:
      "Which character from Criminal Minds have suffered the most trauma?",
    choice1: "Spencer Reid",
    choice2: "JJ",
    choice3: "Aaron Hotch",
    choice4: "Emily Prentis",
    answer: 1,
  },
  {
    question: "What does mintchip icecream taste like?",
    choice1: "mint flavored icecream with chocolate",
    choice2: "mint",
    choice3: "chocolate",
    choice4: "toothpaste",
    answer: 4,
  },
  {
    question: "What is the captial of the US?",
    choice1: "Washington DC",
    choice2: "Boston",
    choice3: "New York",
    choice4: "San Francisco",
    answer: 1,
  },
  {
    question: "Which of these items can't you write with?",
    choice1: "pencil",
    choice2: "carrot",
    choice3: "pen",
    choice4: "highlighter",
    answer: 2,
  },
  {
    question: "Which of these is a vegetable?",
    choice1: "cows",
    choice2: "dirt",
    choice3: "lettuce",
    choice4: "ice cubes",
    answer: 3,
  },
  {
    question: "How hard was this quiz?",
    choice1: "easy",
    choice2: "too easy",
    choice3: "extremely easy",
    choice4: "hardest quiz i've ever taken",
    answer: 4,
  },
];

const scorePoints = 10;
const maxQuestions = 10;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter > maxQuestions) {
    localStorage.setItem("mostRecentScore", score);

    return window.location.assign("/end.html");
  }

  const questionsIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionsIndex];
  question.innerText = currentQuestion.question;

  choices.forEach((choice) => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuestions.splice(questionsIndex, 1);

  acceptingAnswers = true;
};

choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    let classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(scorePoints);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = (num) => {
  score += num;
  scoreText.innerText = score;
};

startGame();
