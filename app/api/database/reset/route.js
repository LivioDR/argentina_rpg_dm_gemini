import { initializeApp } from "firebase/app";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { NextResponse } from "next/server";
import streamToString from "@/app/utilities/apiFunctions";

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "rpgdm-83fa3.firebaseapp.com",
  projectId: "rpgdm-83fa3",
  storageBucket: "rpgdm-83fa3.appspot.com",
  messagingSenderId: "597557920768",
  appId: process.env.FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export async function POST(request) {
    const data = request.body
    console.log("Data: ",data)
    
    const result = await streamToString(data)
    const objectResult = JSON.parse(result)

    console.log("objectResult: ", objectResult)

    const email = objectResult.email

    try{
        await sendPasswordResetEmail(auth, email.trim())
        return NextResponse.json({message: `Password reset email sent to ${email.trim()}.`})
    }
    catch(e){
        return NextResponse.json({message: `An error occured: ${JSON.stringify(e)}`})
    }
}