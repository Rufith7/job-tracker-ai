// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD7HUGUke5o6wOFyh-xt000HCiP9wvHPCU",
  authDomain: "studio-8958449116-a33a2.firebaseapp.com",
  projectId: "studio-8958449116-a33a2",
  storageBucket: "studio-8958449116-a33a2.appspot.com", // important
  messagingSenderId: "612748053463",
  appId: "1:612748053463:web:d9748a6e2bd3ba15e39992",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);