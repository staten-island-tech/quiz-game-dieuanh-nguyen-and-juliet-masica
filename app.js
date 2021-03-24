const question = document.querySelector("#question"); //allows you to change the nature of the element (class to id, vice versa)
const choices = Array.from(document.querySelectorAll(".choice-text"));
const scoreText = document.querySelector("#score");
const startButton = document.getElementById("start-btn");

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0; //score starts at 0
let questionCounter = 0; //questions start at 0
let availableQuestions = [];

//startButton.addEventListener("click", startGame);

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
  availableQuestions = [...questions]; //collects values from questions
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter > maxQuestions) {
    localStorage.setItem("mostRecentScore", score);

    return window.location.assign("/end.html"); //keeps track of score
  }

  const questionsIndex = Math.floor(Math.random() * availableQuestions.length); //calculates the value of the question index
  currentQuestion = availableQuestions[questionsIndex]; //keeps track of what question we are on
  question.innerText = currentQuestion.question; //determines what question to ask

  choices.forEach((choice) => {
    const number = choice.dataset["number"]; //recognizes what choice is being clicked on
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
      incrementScore(scorePoints); //increases score by 10 when a question is answered correct
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      //whenever we answer a question, it'll have time to show
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
