// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDzF9qufYu1pUy4_VoqTVQDXdNIqjFompI",
  authDomain: "crypto-tracker-85083.firebaseapp.com",
  projectId: "crypto-tracker-85083",
  storageBucket: "crypto-tracker-85083.firebasestorage.app",
  messagingSenderId: "627789194700",
  appId: "1:627789194700:web:f98e2c0fa3bad8c7f5a969",
  measurementId: "G-BK289266HX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getDatabase(app);