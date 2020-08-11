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
        question: " A casualty suffering from mild hypoxia will have ...?",
        choice1: "a sneezing fit",
        choice2: "dry skin",
        choice3: "difficulties thinking clearly",
        choice4: "pimples",
        answer: 3
    },
    {
        question: " How long without oxygen does it take for brain cells to start dying?",
        choice1: "15 seconds ",
        choice2: "3 minutes",
        choice3: "10 minutes",
        choice4: "5 minutes",
        answer: 2
    },
    {
        question: " The symptoms of a prolonged exposure to low levels of carbon monoxide are headaches, confusion, nausea and ...?",
        choice1: "giggling",
        choice2: "aggression",
        choice3: "lethargy",
        choice4: "allergy",
        answer: 2
    },
    {
        question: "A lung may collapse if air enters ... ?",
        choice1: "The stomach",
        choice2: "to deeply",
        choice3: "the pleural space",
        choice4: "the heart",
        answer: 3
    },
    {
        question: "A collapsed lung is called a ...?",
        choice1: "pneumothorax",
        choice2: "drowning",
        choice3: "hemothorax",
        choice4: "pulmonary contusion",
        answer: 1
    },
    {
        question: "Which one of the following bones is the only movable portion of the skull?",
        choice1: "Maxilla",
        choice2: "Mandible",
        choice3: "Frontal bone",
        choice4: "Zygomatic bone",
        answer: 2
    },
    {
        question: "Which of the following is striped muscle but not voluntary?",
        choice1: "Wrist muscles",
        choice2: "Shank",
        choice3: "Cardiac muscles",
        choice4: "Abdominal",
        answer: 3
    },
    {
        question: "Which of the following bones make up the structure of the hand?",
        choice1: "Metacarpal",
        choice2: "Tarsal",
        choice3: "Carpal",
        choice4: "Phalanges",
        answer: 1
    },
    {
        question: "Which of the following muscles draw the lower jaw, tongue and the head backward?",
        choice1: "Abductor",
        choice2: "Retractor",
        choice3: "Proctor",
        choice4: "All of these",
        answer: 2
    },
    {
        question: "Which of the following is a skull bone?",
        choice1: "Pterygoid",
        choice2: "Arytenoid",
        choice3: "Cricoid",
        choice4: "None of these",
        answer: 1
    },
    {
        question: "When falling on a out strectched hand, the most common dislocated carpal bone is the ?",
        choice1: "Scaphoid",
        choice2: "Trapezoid",
        choice3: "Capitate",
        choice4: "Lunate",
        answer: 4
    },
    {
        question: "The long thoracic nerve innervates which muscle?",
        choice1: "Anterior scalene",
        choice2: "Middle scalene",
        choice3: "serratus anterior",
        choice4: "teres major",
        answer: 3
    },
    {
        question: "Which movement would fail in case of paralysis of the quadriceps femoris muscle?",
        choice1: "Adduction at the hip",
        choice2: "Extention at the knee",
        choice3: "flexion at the knee",
        choice4: "extension at the knee",
        answer: 2
    },
    {
        question: "The deep formal artery is the principle blood source for the muscles in which compartment of the thigh?",
        choice1: "Anterior",
        choice2: "Lateral",
        choice3: "Posterior",
        choice4: "Medial",
        answer: 3
    },
    {
        question: "The femoral canal contains the : ?",
        choice1: "Femoral vein",
        choice2: "Deep inguinal lymph nodes",
        choice3: "femoral artery",
        choice4: "femoral nerve",
        answer: 2
    }




]


//constants

const correct_Bonus = 10;
const max_question = 15;

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





