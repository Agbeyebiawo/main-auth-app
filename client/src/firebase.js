// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "mern-auth-6f4e4.firebaseapp.com",
  projectId: "mern-auth-6f4e4",
  storageBucket: "mern-auth-6f4e4.appspot.com",
  messagingSenderId: "122615692702",
  appId: "1:122615692702:web:a92cb688339d072f6a2a8f"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);