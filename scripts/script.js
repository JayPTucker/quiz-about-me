var currentQuestion = 0;
var score = 0;
var totQuestions = questions.length;

// MAIN MENU START

// MAIN MENU END

var container = document.getElementById('quizContainer');
var questionEl = document.getElementById('question');
var opt1 = document.getElementById('opt1');
var opt2 = document.getElementById('opt2');
var opt3 = document.getElementById('opt3');
var opt4 = document.getElementById('opt4');
var answers = document.getElementById('answers');
var nextButton = document.getElementById('nextButton');
var resultCont = document.getElementById('result');

// QUIZ TIMER START
var sec = 60;

function timer(){
    var timer = setInterval(function(){
        
        document.getElementById('timer').innerText = "Time Left: " + sec;
        sec--;
        if (sec < 0) {
            alert("Time's up!")
            clearInterval(timer);
        }
        if(currentQuestion == totQuestions){
            clearInterval(timer);
        }
    }, 1000);
}

timer();
// QUIZ TIMER END

function loadQuestion (questionIndex) {
    var q = questions[questionIndex];
    questionEl.textContent = (questionIndex + 1) + '. ' + q.question;
    opt1.textContent = q.option1;
    opt2.textContent = q.option2;
    opt3.textContent = q.option3;
    opt4.textContent = q.option4;
};

function loadNextQuestion () {
    var selectedOption = document.querySelector('input[type=radio]:checked');
    if(!selectedOption){
        alert('Please select your answer!');
        return;
    }

    // SCORE CALCULATOR
    var answer = selectedOption.value;
    if(questions[currentQuestion].answer == answer) {
        score += 10;
        document.getElementById('timerScore').innerHTML = "<p>Correct!  +10 to the Timer!</p>"
    } else {
        score -= 15;
        document.getElementById('timerScore').innerHTML = "<p>Incorrect!  -15 from the Timer!</p>"
    }

    // TIMER CALCULATOR
    if(questions[currentQuestion].answer == answer) {
        sec += 10;
    } else {
        sec -= 15;
    }

    selectedOption.checked = false;
    currentQuestion++;
    if(currentQuestion == totQuestions - 1){
        nextButton.textContent = 'Finish';
    }
    if(currentQuestion == totQuestions){
        console.log('Your score: ' + score)
        return;
    }
    loadQuestion(currentQuestion);
}

loadQuestion(currentQuestion);