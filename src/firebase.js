import firebase from "firebase";

const firebaseConfig = firebase.initializeApp({
    apiKey: "AIzaSyAkpdy7iqw1eUEu41R2ROUYNAkh1LEvlOk",
    authDomain: "practice-934e4.firebaseapp.com",
    projectId: "practice-934e4",
    storageBucket: "practice-934e4.appspot.com",
    messagingSenderId: "915017643411",
    appId: "1:915017643411:web:be478edb3e461d918ee466",
    measurementId: "G-WNE1X9ZS4F"
  });

const auth = firebase.auth();
const storage = firebase.storage();

export {auth, storage};