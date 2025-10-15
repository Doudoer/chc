// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBQEVlZLZzcyQ2qJvbtBeRN7hsV7S2KR58",
  authDomain: "gestion-chc.firebaseapp.com",
  projectId: "gestion-chc",
  storageBucket: "gestion-chc.firebasestorage.app",
  messagingSenderId: "853356444197",
  appId: "1:853356444197:web:01ed88a7a4c2f17252ddcc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
