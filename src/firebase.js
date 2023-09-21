// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBy5ri6qpSKmaN6I3opaIeVF7ifh87rS5Y",
  authDomain: "tasty-food-b496c.firebaseapp.com",
  projectId: "tasty-food-b496c",
  storageBucket: "tasty-food-b496c.appspot.com",
  messagingSenderId: "541177054347",
  appId: "1:541177054347:web:d080f0b67dc2a5b88a008e"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore()