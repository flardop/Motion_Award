// Función para mostrar los videos de cada categoría
function showVideos() {
    // Categorías y URLs de los videos
    const categories = ["Los Mejores / Cinemática Realista", "Los Mejores / 3D / Cinemáticas Detallistas", "Promo de juego", "Secuencia de título de juego", "Mejor Trailer Cinemático", "Mejor Diseño de Personajes", "Mejor Dirección de Arte", "Mejor Animación", "Mejor Diseño de Mundo", "Mejor Uso de Efectos Visuales", "Mejor Montaje de Trailer"];
    const videoURLs = [
        ["https://www.youtube.com/watch?v=vovkzbtYBC8&ab_channel=Ubisoft", "https://www.youtube.com/watch?v=0ecv0bT9DEo&ab_channel=HeroesoftheStorm", "https://www.youtube.com/watch?v=YrlaQfHRjjo&ab_channel=PlayStation"],
        ["https://www.youtube.com/watch?v=6jY2f6OkpBo&ab_channel=GameSpotTrailers"],
        ["https://www.youtube.com/watch?v=D8KbXpk2J9Y&ab_channel=ARK%3ASurvivalAscended", "https://www.youtube.com/watch?v=TcM4DUo3hkA&ab_channel=NintendoofAmerica", "https://www.youtube.com/watch?v=VEAusFKB368&ab_channel=NintendoofAmerica"],
        ["https://www.youtube.com/watch?v=1qK958JRN-g&ab_channel=Nintendúo", "https://www.youtube.com/watch?v=ma2q9yYj_XM&ab_channel=GameSpot", "https://www.youtube.com/watch?v=1qK958JRN-g&ab_channel=Nintendúo"],
        ["https://www.youtube.com/watch?v=vovkzbtYBC8&ab_channel=Ubisoft", "https://www.youtube.com/watch?v=0ecv0bT9DEo&ab_channel=HeroesoftheStorm", "https://www.youtube.com/watch?v=YrlaQfHRjjo&ab_channel=PlayStation"],
        ["https://www.youtube.com/watch?v=dGQ4k4xnWvI&ab_channel=GameSpot", "https://www.youtube.com/watch?v=ma2q9yYj_XM&ab_channel=GameSpot", "https://www.youtube.com/watch?v=1qK958JRN-g&ab_channel=Nintendúo"],
        ["https://www.youtube.com/watch?v=3ZtedjN1JXY&ab_channel=WorldofWarcraft", "https://www.youtube.com/watch?v=-V-0L1HeeAA&ab_channel=PlayStationEurope"],
        ["https://www.youtube.com/watch?v=6uT8wGtB3yQ&ab_channel=BANDAINAMCOEurope", "https://www.youtube.com/watch?v=0SSYzl9fXOQ&ab_channel=IGN", "https://www.youtube.com/watch?v=ZHhqwBwmRkI&ab_channel=LeagueofLegends", "https://www.youtube.com/watch?v=1JSjZqV-YK8&ab_channel=Minecraft", "https://www.youtube.com/watch?v=YrlaQfHRjjo&ab_channel=PlayStation"],
        ["https://www.youtube.com/watch?v=grp2-rpoMYw&ab_channel=BestGameCGI", "https://www.youtube.com/watch?v=G203e1HhixY&ab_channel=PlayStation", "https://www.youtube.com/watch?v=Axmg1E4HrVE&ab_channel=Ubisoft"],
        ["https://www.youtube.com/watch?v=jNZ_3rE1Utk&ab_channel=WildGamerSK", "https://www.youtube.com/watch?v=ssrNcwxALS4&ab_channel=IGN", "https://www.youtube.com/watch?v=vovkzbtYBC8&ab_channel=Ubisoft", "https://www.youtube.com/watch?v=CNM6o9um1dc&ab_channel=PlayStation"]
    ];

    // Imágenes correspondientes a cada video
    const videoImages = [
        ["URL_IMAGEN1", "URL_IMAGEN2", "URL_IMAGEN3"],
        ["URL_IMAGEN4"],
        ["URL_IMAGEN5", "URL_IMAGEN6", "URL_IMAGEN7"],
        ["URL_IMAGEN8", "URL_IMAGEN9", "URL_IMAGEN10"],
        ["URL_IMAGEN11", "URL_IMAGEN12", "URL_IMAGEN13"],
        ["URL_IMAGEN14", "URL_IMAGEN15", "URL_IMAGEN16"],
        ["URL_IMAGEN17", "URL_IMAGEN18"],
        ["URL_IMAGEN19", "URL_IMAGEN20", "URL_IMAGEN21", "URL_IMAGEN22", "URL_IMAGEN23"],
        ["URL_IMAGEN24", "URL_IMAGEN25", "URL_IMAGEN26"],
        ["URL_IMAGEN27", "URL_IMAGEN28", "URL_IMAGEN29", "URL_IMAGEN30"]
    ];

    // Contenedor principal de los videos
    const videoContainer = document.getElementById("video-container");

    // Iterar sobre las categorías
    categories.forEach((category, index) => {
        // Crear un div para la categoría
        const categoryDiv = document.createElement("div");
        categoryDiv.classList.add("category");

        // Crear título de la categoría
        const categoryTitle = document.createElement("h2");
        categoryTitle.textContent = category;
        categoryDiv.appendChild(categoryTitle);

        // Crear lista de videos
        const videoList = document.createElement("ul");

        // Iterar sobre los videos de la categoría
        videoURLs[index].forEach((url, i) => {
            const videoItem = document.createElement("li");

            // Crear elemento de imagen
            const videoImage = document.createElement("img");
            videoImage.src = videoImages[index][i];
            videoImage.alt = "Video Thumbnail";
            videoImage.classList.add("video-thumbnail");

            // Añadir la imagen al elemento de la lista
            videoItem.appendChild(videoImage);

            // Crear enlace de video
            const videoLink = document.createElement("a");
            videoLink.href = url;
            videoLink.textContent = `Video ${i + 1}`;

            // Añadir enlace de video al elemento de la lista
            videoItem.appendChild(videoLink);

            // Añadir elemento de video a la lista de videos
            videoList.appendChild(videoItem);
        });

        // Añadir lista de videos al div de la categoría
        categoryDiv.appendChild(videoList);

        // Añadir div de categoría al contenedor principal de videos
        videoContainer.appendChild(categoryDiv);
    });
}

let userName;
let currentQuestionIndex = 0;
let score = 0;
let timer;
let interval;

document.getElementById('name-submit-btn').addEventListener('click', function() {
    userName = document.getElementById('name-input').value;
    document.getElementById('name-input-container').style.display = 'none';
    document.getElementById('start-quiz-btn').style.display = 'block';
});

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
    document.getElementById