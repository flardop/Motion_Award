import { database } from 'C:\Users\flard\Desktop\categorygames\firebase-config.js'; // Importa el objeto database
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();
console.log("Firebase loaded");

// Función para cargar los datos en la base de datos
function cargarDatos() {
  // Obtiene una referencia a la ubicación de los datos en la base de datos
  const ref = database.ref('nominados');

  // Guarda los datos en la base de datos
  ref.set({
    "Mejor Trailer Cinemático": [
      {
        "titulo": "ARK 2 Trailer",
        "link": "https://www.youtube.com/watch?v=D8KbXpk2J9Y&ab_channel=ARK%3ASurvivalAscended"
      },
      {
        "titulo": "Mario vs. Donkey Kong — A Heist of Mini Proportions",
        "link": "https://www.youtube.com/watch?v=TcM4DUo3hkA&ab_channel=NintendoofAmerica"
      },
      {
        "titulo": "Mario + Rabbids Sparks of Hope - Cinematic Launch Trailer",
        "link": "https://www.youtube.com/watch?v=VEAusFKB368&ab_channel=NintendoofAmerica"
      }
    ],
    "Mejor Diseño de Personajes": [
      {
        "titulo": "Pokemon Scarlet and Violet Get Mew and Mewtwo Trailer",
        "link": "https://www.youtube.com/watch?v=dGQ4k4xnWvI&ab_channel=GameSpot"
      },
      {
        "titulo": "Pokémon Scarlet and Violet Ghost Hunt Cinematic Trailer",
        "link": "https://www.youtube.com/watch?v=ma2q9yYj_XM&ab_channel=GameSpot"
      },
      {
        "titulo": "Leyendas Pokémon Z-A - Trailer Oficial",
        "link": "https://www.youtube.com/watch?v=1qK958JRN-g&ab_channel=Nintendúo"
      }
    ]
    // Otras categorías...
  });
}

// Llama a la función para cargar los datos en la base de datos
cargarDatos();