// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB-h2LZ1tPPybn63aYYSi82km6ON4sqP1M",
  authDomain: "bloctrace.firebaseapp.com",
  projectId: "bloctrace",
  storageBucket: "bloctrace.appspot.com",
  messagingSenderId: "563098088813",
  appId: "1:563098088813:web:147968f8bb152515f95664",
  measurementId: "G-D6EMWL2H56",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
