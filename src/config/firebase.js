// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBcE-91eKA7qVpBL1b__8SNUSiHyZb7W_0",
  authDomain: "react-banking-system-d960a.firebaseapp.com",
  projectId: "react-banking-system-d960a",
  storageBucket: "react-banking-system-d960a.appspot.com",
  messagingSenderId: "217915213105",
  appId: "1:217915213105:web:46d42614db4acd795f9c10",
  measurementId: "G-5BQCWKX5CE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);