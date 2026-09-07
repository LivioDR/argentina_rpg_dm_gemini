'use client'
// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration.
// These values are public by design: they identify the project, they do not
// authorize access. Access is enforced by Firebase Auth + firestore.rules.
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "rpgdm-83fa3.firebaseapp.com",
  projectId: "rpgdm-83fa3",
  storageBucket: "rpgdm-83fa3.appspot.com",
  messagingSenderId: "597557920768",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase once. The getApps() guard survives Fast Refresh and any
// double evaluation of this module.
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)

export { app, auth, db };
