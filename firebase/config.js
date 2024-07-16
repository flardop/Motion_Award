// firebase.js

// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDr11O0ExK3FBaaeV6bBWjku1OkHbEMqBM",
    authDomain: "rimaniaslots.firebaseapp.com",
    projectId: "rimaniaslots",
    storageBucket: "rimaniaslots.appspot.com",
    messagingSenderId: "964729869372",
    appId: "1:964729869372:web:46e74ac0c3d6b72f311f39",
    measurementId: "G-0ESG1NRL6H"
};

// Inicializa Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();