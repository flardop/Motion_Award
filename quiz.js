let userName;
let currentCategoryIndex = 0;
let votedCategories = new Set();

const categories = [
    "Promo de juego", 
    "Secuencia de título de juego", 
    "Mejor Trailer Cinemático", 
    "Mejor Diseño de Personajes", 
    "Mejor Dirección de Arte",
    "Mejor Animación", 
    "Mejor Diseño de Mundo", 
    "Mejor Uso de Efectos Visuales", 
    "Mejor Montaje de Trailer"
];

const videoURLs = [
    [
        "https://www.youtube.com/watch?v=InTFsZ8WvD8&ab_channel=GameSpot",
        "https://www.youtube.com/watch?v=_zDZYrIUgKE&ab_channel=BandaiNamcoEntertainmentAmerica"
    ],
    [
        "https://2020.motionawards.com/winner/gaming-game-title-sequence/",
        "https://vimeo.com/105513191"
    ],
    [
        "https://www.youtube.com/watch?v=D8KbXpk2J9Y&ab_channel=ARK%3ASurvivalAscended", 
        "https://www.youtube.com/watch?v=TcM4DUo3hkA&ab_channel=NintendoofAmerica", 
        "https://www.youtube.com/watch?v=VEAusFKB368&ab_channel=NintendoofAmerica"
    ],
    [
        "https://www.youtube.com/watch?v=1qK958JRN-g&ab_channel=Nintendúo", 
        "https://www.youtube.com/watch?v=ma2q9yYj_XM&ab_channel=GameSpot", 
        "https://www.youtube.com/watch?v=1qK958JRN-g&ab_channel=Nintendúo"
    ],
    [
        "https://www.youtube.com/watch?v=3ZtedjN1JXY&ab_channel=WorldofWarcraft", 
        "https://www.youtube.com/watch?v=-V-0L1HeeAA&ab_channel=PlayStationEurope"
    ],
    [
        "https://www.youtube.com/watch?v=6uT8wGtB3yQ&ab_channel=BANDAINAMCOEurope", 
        "https://www.youtube.com/watch?v=0SSYzl9fXOQ&ab_channel=IGN", 
        "https://www.youtube.com/watch?v=ZHhqwBwmRkI&ab_channel=LeagueofLegends", 
        "https://www.youtube.com/watch?v=1JSjZqV-YK8&ab_channel=Minecraft"
    ],
    [
        "https://www.youtube.com/watch?v=grp2-rpoMYw&ab_channel=BestGameCGI", 
        "https://www.youtube.com/watch?v=G203e1HhixY&ab_channel=PlayStation", 
        "https://www.youtube.com/watch?v=Axmg1E4HrVE&ab_channel=Ubisoft"
    ],
    [
        "https://www.youtube.com/watch?v=jNZ_3rE1Utk&ab_channel=WildGamerSK", 
        "https://www.youtube.com/watch?v=ssrNcwxALS4&ab_channel=IGN", 
        "https://www.youtube.com/watch?v=vovkzbtYBC8&ab_channel=Ubisoft",
        "https://www.youtube.com/watch?v=CNM6o9um1dc&ab_channel=PlayStation"
        
    ],
    [
        "https://www.youtube.com/watch?v=UrPQ6L1nXlM&ab_channel=PlayStation", 
        "https://www.youtube.com/watch?v=zvborgKG7fw&ab_channel=WarnerBros.Games", 
        "https://www.youtube.com/watch?v=2VawSnaxtSI&ab_channel=KINGDOMHEARTS"
    ]
];

const videoImages = [
    ["/img/fortnite s2 ch6.webp", "/img/souls 3.webp"],
    ["/img/metro 3.jpg","/img/destiny.webp"],
    ["/img/arck 2.webp", "/img/mario kong.jpg", "/img/mario rabbids.jpg"],
    ["/img/pokemon scarlet and violet.jpg", "/img/pokemon scarlet and violet.jpg", "/img/pokemon leyendas z.webp"],
    ["/img/dragon fligth wow.jpg", "/img/jurrasic world evolution.jpg"],
    ["/img/elden ring.webp", "/img/descarga.jpg", "/img/lol.jpg", "/img/minecraft legends.jpg"],
    ["/img/biomutant.jpg", "/img/bloodborne.jpg", "/img/avatar.jpg"],
    ["/img/mirage.png", "/img/valhala.webp", "/img/assesinds shadow.webp", "/img/final xv.png"],
    ["/img/mickey.jpg", "/img/multiversus.webp", "URL_IMAGEN_33", "kindom 3.jpg"]
];

document.getElementById('name-submit-btn').addEventListener('click', () => {
    userName = document.getElementById('name-input').value.trim();
    if (userName) {
        document.getElementById('name-input-container').style.display = 'none';
        document.getElementById('start-quiz-btn').style.display = 'block';
    }
});

document.getElementById('start-quiz-btn').addEventListener('click', () => {
    document.getElementById('start-quiz-btn').style.display = 'none';
    document.getElementById('category-container').style.display = 'block';
    showCategory();
});

document.getElementById('next-category-btn').addEventListener('click', () => {
    if (currentCategoryIndex < categories.length - 1) {
        currentCategoryIndex++;
        showCategory();
    }
});

document.getElementById('prev-category-btn').addEventListener('click', () => {
    if (currentCategoryIndex > 0) {
        currentCategoryIndex--;
        showCategory();
    }
});

document.getElementById('skip-category-btn').addEventListener('click', () => {
    if (currentCategoryIndex < categories.length - 1) {
        currentCategoryIndex++;
        showCategory();
    }
});

function showCategory() {
    const category = categories[currentCategoryIndex];
    const container = document.getElementById('video-container');
    container.innerHTML = `<h2>${category}</h2>`;

    videoURLs[currentCategoryIndex].forEach((url, index) => {
        const imageUrl = videoImages[currentCategoryIndex][index];
        const videoItem = document.createElement('div');
        videoItem.className = 'video-item';

        const thumbnail = document.createElement('img');
        thumbnail.src = imageUrl;
        thumbnail.className = 'video-thumbnail';
        thumbnail.addEventListener('click', () => openVideoPopup(url));
        videoItem.appendChild(thumbnail);

        const voteButton = document.createElement('button');
        voteButton.className = 'btn btn-primary mt-2';
        voteButton.textContent = 'Votar';
        voteButton.addEventListener('click', () => voteForNominee(category, url));
        videoItem.appendChild(voteButton);

        container.appendChild(videoItem);
    });
}

function openVideoPopup(url) {
    const videoPopup = document.getElementById('video-popup');
    const overlay = document.getElementById('overlay');
    const videoPlayer = document.getElementById('video-player');
    
    // Check if the URL is from YouTube and format it correctly
    let embedUrl;
    if (url.includes("youtube.com")) {
        const videoId = url.split("v=")[1].split("&")[0];
        embedUrl = `https://www.youtube.com/embed/${videoId}`;
    } else {
        // Handle other video URLs if necessary
        embedUrl = url;
    }

    videoPlayer.src = embedUrl;
    videoPopup.style.display = 'block';
    overlay.style.display = 'block';
}

function closeVideoPopup() {
    const videoPopup = document.getElementById('video-popup');
    const overlay = document.getElementById('overlay');
    const videoPlayer = document.getElementById('video-player');
    videoPlayer.src = '';
    videoPopup.style.display = 'none';
    overlay.style.display = 'none';
}

document.getElementById('close-video-popup').addEventListener('click', closeVideoPopup);


function voteForNominee(category, url) {
    if (votedCategories.has(category)) {
        alert('Ya has votado en esta categoría.');
        return;
    }
    votedCategories.add(category);
    alert('Gracias por tu voto!');
}

function playVideo(url) {
    const videoPopup = document.getElementById('video-popup');
    const overlay = document.getElementById('overlay');
    const videoPlayer = document.getElementById('video-player');
    videoPlayer.src = url.replace("watch?v=", "embed/");
    videoPopup.style.display = 'block';
    overlay.style.display = 'block';
}

document.getElementById('close-video-popup').addEventListener('click', () => {
    const videoPopup = document.getElementById('video-popup');
    const overlay = document.getElementById('overlay');
    const videoPlayer = document.getElementById('video-player');
    videoPlayer.src = '';
    videoPopup.style.display = 'none';
    overlay.style.display = 'none';
});

// Controles de música
const backgroundMusic = document.getElementById('background-music');
const muteMusicButton = document.getElementById('mute-music-btn');

muteMusicButton.addEventListener('click', () => {
    if (backgroundMusic.paused) {
        backgroundMusic.play();
        muteMusicButton.textContent = 'Silenciar Música';
    } else {
        backgroundMusic.pause();
        muteMusicButton.textContent = 'Reproducir Música';
    }
});
