import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCjIpij5qSd3GFS03Lti3W9WsLsdnaEfKs",
    authDomain: "foodhut-b3d10.firebaseapp.com",
    projectId: "foodhut-b3d10",
    storageBucket: "foodhut-b3d10.appspot.com",
    messagingSenderId: "220201145183",
    appId: "1:220201145183:web:31d15317f2fbaa43f69cea",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();