// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLICK_FIREBASE_API_KEY,
  authDomain: "meeting-app-c572f.firebaseapp.com",
  projectId: "meeting-app-c572f",
  storageBucket: "meeting-app-c572f.firebasestorage.app",
  messagingSenderId: "471606261990",
  appId: "1:471606261990:web:a04f2a322cfc0aef9a2327",
  measurementId: "G-EVHMP2ELDL",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
