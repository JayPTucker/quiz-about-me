// --- MAIN VARIABLES START ---

var currentQuestion = 0;
var score = 0;
var totQuestions = questions.length;

var quizBox = document.getElementById('quiz');
var questionEl = document.getElementById('question');
var opt1 = document.getElementById('opt1');
var opt2 = document.getElementById('opt2');
var opt3 = document.getElementById('opt3');
var opt4 = document.getElementById('opt4');
var answers = document.getElementById('answers');
var nextButton = document.getElementById('nextButton');
var resultCont = document.getElementById('result');
var timerScore = document.getElementById('timerScore');
var leaderboard = document.getElementById('leaderboard');
var title = document.getElementById('quizTitle');

// --- MAIN VARIABLES END ---

// --- QUIZ TIMER START ---

var sec = 60;

function timer(){
    var timer = setInterval(function(){
        document.getElementById('timer').innerText = "Time Remaining:  " + sec;
        sec--;
        // 0 Seconds left Actions:
        if (sec < -1) {
            clearInterval(timer);
            alert("Time's up!  Try Again.");
            window.location.replace("index.html");
        }

        // Once all Questions are Completed:
        if(currentQuestion == totQuestions) {
            clearInterval(timer);
            leaderboardScore();
            title.innerText = "Leaderboard"
        }

        // Less than 15 Seconds warning:

        if(sec < 15) {
            document.getElementById('timer').style.color = "red";
        }
        else {
            document.getElementById('timer').style.color = "white";
        }
    }, 1000);
};

timer();
// --- QUIZ TIMER END ---


// --- LEADERBOARD FUNCTIONALITY START ---

function leaderboardScore() {
    // Getting the Player's name:
    var name = prompt("You Finished!  What's your name?");


    localStorage.setItem("leaderboard", name + ' ' + JSON.stringify(score));


    quizBox.innerHTML = "";
    quizBox.innerHTML = "<hr><h1 class='LBScore'>Score:<br> " + localStorage.getItem('leaderboard') + "</h1>";

};

    // Leaderboard Button
function loadLeaderboard() {
    clearInterval(timer);
    quizBox.innerHTML = "";
    quizBox.innerHTML = "<hr><h1 class='LBScore'>Score:<br> " + localStorage.getItem('leaderboard') + "</h1>";
    clearInterval(timer);
    title.innerText = "Leaderboard";
};

// --- LEADERBOARD FUNCTIONALITY END ---


// --- LOADING THE QUESTIONS START ---

function loadQuestion (questionIndex) {
    var q = questions[questionIndex];
    questionEl.textContent = (questionIndex + 1) + '.) ' + q.question;
    opt1.textContent = "A.  " + q.option1;
    opt2.textContent = "B.  " + q.option2;
    opt3.textContent = "C.  " + q.option3;
    opt4.textContent = "D.  " + q.option4;
};

function loadNextQuestion () {
    var selectedOption = document.querySelector('input[type=radio]:checked');
    if(!selectedOption){
        alert('No Skipping!  You must select at least ONE answer below before continuing.');
        return;
    }

    // Next Question
    selectedOption.checked = false;
    currentQuestion++;
    if(currentQuestion == totQuestions - 1){
        nextButton.textContent = 'Finish';
    }

    // Score/Timer Calculator
    var answer = selectedOption.value;
    if(questions[currentQuestion].answer == answer) {
        score += 10;
        sec += 10;
        timerScore.style.color = "lightgreen";
        timerScore.innerHTML = "<p>Correct!  +10 to the Timer!</p>";
    } else {
        score -= 5;
        sec -= 20;
        timerScore.style.color = "red";
        timerScore.innerHTML = "<p>Incorrect!  -15 from the Timer!</p>";
    }

    loadQuestion(currentQuestion);

// --- LOADING THE QUESTIONS END ---
}

loadQuestion(currentQuestion);

