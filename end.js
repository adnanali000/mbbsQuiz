
var username = document.getElementById("username");
var saveScoreBtn = document.getElementById("saveScoreBtn");
const finalScore = document.getElementById("finalScore")
const mostRecentScore = localStorage.getItem("mostRecentScore");
const scoreDiv = document.getElementById("emoji");


const highScores = JSON.parse(localStorage.getItem("highScores")) || [];


finalScore.innerText = mostRecentScore

 var scorePer = mostRecentScore;
    console.log(scorePer)

    let img = (scorePer > 40) ? "img/5.png" :
    (scorePer >= 30) ? "img/4.png" :
    (scorePer >= 20) ? "img/3.png" :
    (scorePer >= 10) ? "img/2.png" :
    "img/1.png";


    scoreDiv.innerHTML = "<img src = "+ img +">";

username.addEventListener("keyup", () => {
    saveScoreBtn.disabled = !username.value;
});


saveHighScore = e => {
    e.preventDefault();

    var key = Math.random() * 9992421;
    var score = {
        key: key.toFixed(),
        score: mostRecentScore,
        name: username.value
    };
    

    firebase.database().ref("quizResult/" + key.toFixed()).push(score);

    setTimeout(() => {
        window.location.assign("index.html")
    }, 2000)


};

