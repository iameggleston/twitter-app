// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//Firebase ver9 compliant
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAEu4LITj0BUYwl-wYFBopjFmwrijpCwiY",
  authDomain: "twitter-app-99e4a.firebaseapp.com",
  projectId: "twitter-app-99e4a",
  storageBucket: "twitter-app-99e4a.appspot.com",
  messagingSenderId: "968948731625",
  appId: "1:968948731625:web:35896b86c7d1586829aa78",
  measurementId: "G-YPHJ6QRWX9"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
// const analytics = getAnalytics(firebaseApp);

// componentで利用するために
// Firebase ver9 compliant
export const storage = getStorage(firebaseApp);
export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);

export const database = getDatabase(firebaseApp);

// googleの認証機能も使用する
export const provider = new GoogleAuthProvider();

