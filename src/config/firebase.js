// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA50FUoZnRImIqoUhUB2N4k4atwrcEvS60",
  authDomain: "minimalism-646db.firebaseapp.com",
  projectId: "minimalism-646db",
  storageBucket: "minimalism-646db.appspot.com",
  messagingSenderId: "1074079050953",
  appId: "1:1074079050953:web:a14543f087a9a1264bb118",
  measurementId: "G-F9RSJYWPF8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();
