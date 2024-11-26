// src/utils/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCGRe_6dkwdu8adXJq75TSNiLx-NmrN-nQ",
    authDomain: "vue-firebase-9b87e.firebaseapp.com",
    projectId: "vue-firebase-9b87e",
    storageBucket: "vue-firebase-9b87e.firebasestorage.app",
    messagingSenderId: "997892392239",
    appId: "1:997892392239:web:08117f65d69967abfe0dda",
    measurementId: "G-X16K54NF27"
  };

const firebase = initializeApp(firebaseConfig);
const auth = getAuth(firebase);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(firebase);

export { auth, googleProvider, db };