import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB7ehGEcTOLPtKx3Jjsn2bulxO-zPnXaOY",
  authDomain: "iiitj-b25f8.firebaseapp.com",
  projectId: "iiitj-b25f8",
  storageBucket: "iiitj-b25f8.firebasestorage.app",
  messagingSenderId: "963701495686",
  appId: "1:963701495686:web:ee8488ba26851807b17e07",
  measurementId: "G-37ESY8JY0F",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
