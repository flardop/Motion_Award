const quizData = [
    { question: "¿Cuál es la capital de Francia?", options: ["París", "Berlín", "Madrid", "Roma"], answer: "París" },
    { question: "¿Cuánto es 2 + 2?", options: ["3", "4", "5", "6"], answer: "4" },
    { question: "¿Cuál es la capital de España?", options: ["París", "Berlín", "Madrid", "Roma"], answer: "Madrid" },
];

// Función para barajar el array de preguntas
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Barajamos las preguntas al inicio
shuffleArray(quizData);

let userName;
document.getElementById('name-submit-btn').addEventListener('click', function() {
    userName = document.getElementById('name-input').value;
    document.getElementById('name-input-container').style.display = 'none';
    document.getElementById('start-quiz-btn').style.display = 'block';
});

const questionElement = document.getElementById("question");
const optionsContainer = document.getElementById("options-container");
const feedbackElement = document.getElementById("feedback");
const scoreElement = document.getElementById("score-value");
const timerElement = document.getElementById("timer-value");
const notasElement = document.getElementById("mensajenota");
const score2Element = document.getElementById("score");
const timer2Element = document.getElementById("timer");

const backgroundMusic = document.getElementById("background-music");

let currentQuestionIndex = 0;
let score = 0;
let timer;
let interval;

document.getElementById('start-quiz-btn').addEventListener('click', function() {
    document.getElementById('start-quiz-btn').style.display = 'none';
    document.getElementById('exit-quiz-btn').style.display = 'block';
    document.getElementById('end-quiz-btn').style.display = 'block';
    startQuiz();
});

document.getElementById('exit-quiz-btn').addEventListener('click', function() {
    if (confirm('¿Estás seguro de que deseas salir de la partida?')) {
        location.reload();
    }
});

document.getElementById('end-quiz-btn').addEventListener('click', function() {
    if (confirm('¿Estás seguro de que deseas terminar el intento?')) {
        endQuiz();
    }
});

function startQuiz() {
    timer = quizData.length * 10;

    document.getElementById("question-container").style.display = 'block';
    document.getElementById("score").style.display = 'block';
    document.getElementById("timer").style.display = 'block';

    showQuestion();

    startTimer();
    playMusic();
}

function showQuestion() {
    const currentQuestion = quizData[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    optionsContainer.innerHTML = "";
    currentQuestion.options.forEach(option => {
        const button = document.createElement("button");
        button.textContent = option;
        button.classList.add('btn', 'btn-outline-primary', 'mb-2');
        button.addEventListener("click", () => checkAnswer(option));
        optionsContainer.appendChild(button);
    });
}

function checkAnswer(selectedOption) {
    const currentQuestion = quizData[currentQuestionIndex];
    if (selectedOption === currentQuestion.answer) {
        feedbackElement.textContent = "¡Correcto!";
        score++;
    } else {
        feedbackElement.textContent = "¡Incorrecto!";
    }
    scoreElement.textContent = score;
    currentQuestionIndex++;

    if (currentQuestionIndex < quizData.length) {
        showQuestion();
    } else {
        endQuiz();
    }
}

function startTimer() {
    timer = quizData.length * 10;
    interval = setInterval(() => {
        timer--;
        timerElement.textContent = timer;
        if (timer <= 0) {
            clearInterval(interval);
            endQuiz();
        }
    }, 1000);
}

document.getElementById('restart-btn').addEventListener('click', function() {
    currentQuestionIndex = 0;
    score = 0;
    timer = 0;
    clearInterval(interval);
    
    notasElement.textContent = "";
    feedbackElement.textContent = "";
    timerElement.textContent = "";
    scoreElement.textContent = "";

    document.getElementById('restart-container').style.display = 'none';

    // Asegurarse de que los botones vuelvan a aparecer
    document.getElementById('exit-quiz-btn').style.display = 'block';
    document.getElementById('end-quiz-btn').style.display = 'block';

    startQuiz();
});

document.getElementById('return-home-btn').addEventListener('click', function() {
    location.reload();
});

function endQuiz() {
    clearInterval(interval);
    let nota = (score * 10) / quizData.length;
    nota = nota.toFixed(2);
    let message;

    if (nota < 5) {
        message = `Vaya, ${userName}, ¡has suspendido el quiz!`;
    } else if (nota >= 5 && nota < 7) {
        message = `Bien, ${userName}, ¡has aprobado el quiz!`;
    } else if (nota >= 7 && nota < 9) {
        message = `Muy bien, ${userName}, ¡has sacado un notable en el quiz!`;
    } else if (nota >= 9 && nota <= 10) {
        message = `¡Excelente, ${userName}, has sacado un sobresaliente en el quiz!`;
    }

    notasElement.innerHTML = `<span class="quiz-feedback">${message}</span>`;
    feedbackElement.innerHTML = `Tu puntuación final es: <span class="quiz-feedback">${score} de ${quizData.length}</span>!<br>La nota del quiz es: <span class="quiz-feedback">${nota}/10</span>.<br>Tu tiempo final es: <span class="quiz-feedback">${quizData.length * 10 - timer} segundos</span>!`;

    questionElement.textContent = "Quiz acabado!";
    optionsContainer.innerHTML = "";
    timerElement.style.display = "none";
    score2Element.style.display = "none";
    timer2Element.style.display = "none";
    document.getElementById('restart-container').style.display = 'block';

    // Ocultar los botones de "Salir de partida" y "Terminar intento"
    document.getElementById('exit-quiz-btn').style.display = 'none';
    document.getElementById('end-quiz-btn').style.display = 'none';

    stopMusic();
}
    
    function playMusic() {
        backgroundMusic.play();
    }
    
    function stopMusic() {
        backgroundMusic.pause();
        backgroundMusic.currentTime = 0; // Reiniciar la música al inicio
    }