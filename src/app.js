import { questions } from "./questions";

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

const scorePoints = 10;
const maxQuestions = 10;

startGame = () => {
  //add const or let
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions]; //collects values from questions
  getNewQuestion();
};

getNewQuestion = () => {
  //add const or let
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