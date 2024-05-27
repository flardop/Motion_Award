const categoriesData = [
    { question: "¿Cuál es tu película favorita?", options: ["Inception", "Titanic", "Avatar", "The Matrix"] },
    { question: "¿Cuál es tu color favorito?", options: ["Rojo", "Azul", "Verde", "Amarillo"] },
    { question: "¿Cuál es tu comida favorita?", options: ["Pizza", "Sushi", "Hamburguesa", "Ensalada"] }
];

// Función para barajar el array de categorías
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Barajamos las categorías al inicio
shuffleArray(categoriesData);

let userName;
document.getElementById('name-submit-btn').addEventListener('click', function() {
    userName = document.getElementById('name-input').value;
    document.getElementById('name-input-container').style.display = 'none';
    document.getElementById('start-quiz-btn').style.display = 'block';
});

const questionElement = document.getElementById("question");
const optionsContainer = document.getElementById("options-container");
const feedbackElement = document.getElementById("feedback");
const timerElement = document.getElementById("timer-value");
const notasElement = document.getElementById("mensajenota");

const backgroundMusic = document.getElementById("background-music");

let currentQuestionIndex = 0;
let votes = {};
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
    timer = categoriesData.length * 10;

    document.getElementById("question-container").style.display = 'block';

    showQuestion();

    startTimer();
    playMusic();
}

function showQuestion() {
    const currentCategory = categoriesData[currentQuestionIndex];
    questionElement.textContent = currentCategory.question;
    optionsContainer.innerHTML = "";
    currentCategory.options.forEach(option => {
        const button = document.createElement("button");
        button.textContent = option;
        button.classList.add('btn', 'btn-outline-primary', 'mb-2');
        button.addEventListener("click", () => registerVote(option));
        optionsContainer.appendChild(button);
    });
}

function registerVote(selectedOption) {
    const currentCategory = categoriesData[currentQuestionIndex];
    if (!votes[currentCategory.question]) {
        votes[currentCategory.question] = {};
    }
    if (!votes[currentCategory.question][selectedOption]) {
        votes[currentCategory.question][selectedOption] = 0;
    }
    votes[currentCategory.question][selectedOption]++;

    currentQuestionIndex++;

    if (currentQuestionIndex < categoriesData.length) {
        showQuestion();
    } else {
        endQuiz();
    }
}

function startTimer() {
    timer = categoriesData.length * 10;
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
    timer = 0;
    votes = {};
    clearInterval(interval);

    notasElement.textContent = "";
    feedbackElement.textContent = "";
    timerElement.textContent = "";

    document.getElementById('restart-container').style.display = 'none';

    document.getElementById('exit-quiz-btn').style.display = 'block';
    document.getElementById('end-quiz-btn').style.display = 'block';

    startQuiz();
});

document.getElementById('return-home-btn').addEventListener('click', function() {
    location.reload();
});

function endQuiz() {
    clearInterval(interval);

    let resultsHTML = "<h2>Resultados de la votación:</h2><ul>";
    for (const category in votes) {
        resultsHTML += `<li>${category}:<ul>`;
        for (const option in votes[category]) {
            resultsHTML += `<li>${option}: ${votes[category][option]} votos</li>`;
        }
        resultsHTML += "</ul></li>";
    }
    resultsHTML += "</ul>";

    feedbackElement.innerHTML = resultsHTML;

    questionElement.textContent = "¡Votación terminada!";
    optionsContainer.innerHTML = "";
    document.getElementById('restart-container').style.display = 'block';

    document.getElementById('exit-quiz-btn').style.display = 'none';
    document.getElementById('end-quiz-btn').style.display = 'none';

    stopMusic();
}

function playMusic() {
    backgroundMusic.play();
}

function stopMusic() {
    backgroundMusic.pause();
    backgroundMusic.currentTime = 0;
}
firebase.initializeApp({
    apiKey: "AIzaSyDYMG0FW5YwwBVCbF734emZEUH8oGhv16g",
    authDomain: "motion-awards.firebaseapp.com",
    projectId: "motion-awards",
    storageBucket: "motion-awards.appspot.com",
    messagingSenderId: "787587578699",
    appId: "1:787587578699:web:e3883c7a00e32326f906ce",
    measurementId: "G-R15NZZ1KV4"
});
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// Función para enviar el nombre del usuario
document.getElementById('name-submit-btn').addEventListener('click', () => {
    const userName = document.getElementById('name-input').value;
    if (userName) {
        db.collection('users').add({
            name: userName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        }).then(() => {
            document.getElementById('name-input-container').style.display = 'none';
            document.getElementById('start-quiz-btn').style.display = 'block';
        }).catch(error => {
            console.error("Error adding document: ", error);
        });
    }
});

// Lógica para iniciar la votación
document.getElementById('start-quiz-btn').addEventListener('click', () => {
    document.getElementById('question-container').style.display = 'block';
    loadQuestion();
});

// Función para cargar una pregunta
function loadQuestion() {
    // Aquí deberías implementar la lógica para cargar una pregunta desde Firestore
    db.collection('questions').doc('someQuestionId').get().then((doc) => {
        if (doc.exists) {
            document.getElementById('question').innerText = doc.data().questionText;
            // Aquí deberías añadir la lógica para mostrar las opciones de respuesta
        } else {
            console.log("No such document!");
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
}

// Función para manejar la salida de la votación
document.getElementById('exit-quiz-btn').addEventListener('click', () => {
    document.getElementById('question-container').style.display = 'none';
    document.getElementById('restart-container').style.display = 'block';
});

// Función para manejar el fin de la votación
document.getElementById('end-quiz-btn').addEventListener('click', () => {
    // Aquí puedes añadir lógica para guardar los resultados y finalizar la votación
    document.getElementById('question-container').style.display = 'none';
    document.getElementById('feedback').innerText = 'Gracias por participar!';
});

// Función para reiniciar la votación
document.getElementById('restart-btn').addEventListener('click', () => {
    document.getElementById('restart-container').style.display = 'none';
    document.getElementById('name-input-container').style.display = 'block';
});

document.getElementById('return-home-btn').addEventListener('click', () => {
    // Aquí puedes añadir lógica para volver al inicio
    location.reload();
});