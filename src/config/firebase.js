// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyADLVTP8mQyayDxArzFDK7U3vawegR_APA",
  authDomain: "pokefake-5a17c.firebaseapp.com",
  projectId: "pokefake-5a17c",
  storageBucket: "pokefake-5a17c.appspot.com",
  messagingSenderId: "380965166014",
  appId: "1:380965166014:web:82b57c1338af50f0f037ef"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app)
