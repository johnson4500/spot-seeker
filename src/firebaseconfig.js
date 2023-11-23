import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBEfQt_JsW2jTY83A3EwRAVSn56--ESJ0M",
  authDomain: "skatespots-56bd6.firebaseapp.com",
  databaseURL: "https://skatespots-56bd6-default-rtdb.firebaseio.com",
  projectId: "skatespots-56bd6",
  storageBucket: "skatespots-56bd6.appspot.com",
  messagingSenderId: "439071919444",
  appId: "1:439071919444:web:211c9df6c6f6291bddccc1",
  measurementId: "G-GKPZW9GDTQ"
  
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
export const rtDB = getDatabase(app)
export const imgDB = getStorage(app)
export const auth = getAuth(app)