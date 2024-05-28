firebase.initializeApp({
    apiKey: "AIzaSyDYMG0FW5YwwBVCbF734emZEUH8oGhv16g",
    authDomain: "motion-awards.firebaseapp.com",
    projectId: "motion-awards",
    storageBucket: "motion-awards.appspot.com",
    messagingSenderId: "787587578699",
    appId: "1:787587578699:web:e3883c7a00e32326f906ce",
    measurementId: "G-R15NZZ1KV4"
});

// Inicializar Firebase
const app = firebase.initializeApp(firebaseConfig);

// Inicializar Firestore
const db = firebase.firestore();