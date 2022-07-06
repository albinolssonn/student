import { initializeApp } from "firebase/app";
import{ getFirestore } from "@firebase/firestore";
import{ getAuth } from "firebase/auth"; 

const firebaseConfig = {
  apiKey: "AIzaSyD7W5OrkWC--sjcv5vGDWDw_s8rdsiW29g",
  authDomain: "student-data-eb35e.firebaseapp.com",
  projectId: "student-data-eb35e",
  storageBucket: "student-data-eb35e.appspot.com",
  messagingSenderId: "1004925092314",
  appId: "1:1004925092314:web:f6b049f95697ddb2acc0e3"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)

export const auth = getAuth(app)