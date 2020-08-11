const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById("progressBarFull");

let currentQuestion = {};
let score = 0;
let acceptingAnswer = false;
let questionCounter = 0;
let availableQuestion = [];

let questions = [
    {
        question: "Who is the PM of Pakistan ?",
        choice1: "IMRAN KHAN",
        choice2: "Shahid Afridi",
        choice3: "Nawaz Sharif",
        choice4: "Zardari",
        answer: 1
    },
    {
        question: "Who is the PM of USA ?",
        choice1: "IMRAN KHAN",
        choice2: "Nawaz Sharif",
        choice3: "Trump",
        choice4: "Zardari",
        answer: 3
    },
    {
        question: "JS stand for ?",
        choice1: "James smith",
        choice2: "JavaScript",
        choice3: "J script",
        choice4: "Junior Code",
        answer: 2
    },
    {
        question: "What is 2 + 2 - (3 * 6) ?",
        choice1: 10,
        choice2: -14,
        choice3: 14,
        choice4: 20,
        answer: 2
    },
    {
        question: "Who is the President of Pakistan?",
        choice1: "Shehbaz sharif",
        choice2: "Arif Alvi",
        choice3: "Imran Ismail",
        choice4: "Bilawal Bhutto",
        answer: 2
    },




]


//constants

const correct_Bonus = 10;
const max_question = 5;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestion = [...questions];
    //console.log(availableQuestion)
    getNewQuestion();
}

getNewQuestion = () => {

    if (availableQuestion.length === 0 || questionCounter >= max_question) {
        //go to end page
        localStorage.setItem("mostRecentScore", score);

        return window.location.assign("end.html");
    }


    questionCounter++;
    progressText.innerText = `Question ${questionCounter}/${max_question}`;

    progressBarFull.style.width = `${(questionCounter / max_question) * 100}%`;
    const questionIndex = Math.floor(Math.random() * availableQuestion.length);
    currentQuestion = availableQuestion[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset["number"];
        choice.innerText = currentQuestion["choice" + number];

    });

    availableQuestion.splice(questionIndex, 1);
    acceptingAnswer = true;
};

choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if (!acceptingAnswer) return;

        acceptingAnswer = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];

        const classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

        if (classToApply === 'correct') {
            incrementScore(correct_Bonus);
        }
        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);



    })
})

incrementScore = num => {
    score += num;
    scoreText.innerText = score;
}

startGame();





