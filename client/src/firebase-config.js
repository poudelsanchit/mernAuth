import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD3H2HiI8FWBevDmYP883rGEXCsSXRqhxY",
  authDomain: "mantraarchitets.firebaseapp.com",
  projectId: "mantraarchitets",
  storageBucket: "mantraarchitets.appspot.com",
  messagingSenderId: "704125117448",
  appId: "1:704125117448:web:59bbdfd171da90ecf5ddbd",
  measurementId: "G-ZRR13ELSDT",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
