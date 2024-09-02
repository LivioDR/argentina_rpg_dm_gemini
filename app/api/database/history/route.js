import { initializeApp } from "firebase/app";
import { getFirestore, getDoc, doc, setDoc } from "firebase/firestore";
import { NextResponse } from "next/server";
import streamToString from "@/app/utilities/apiFunctions";

// Your web app's Firebase configuration
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
const db = getFirestore(app)


// GET the history for the id passed as query parameter
export async function GET(request){
    const {id} = Object.fromEntries(request.nextUrl.searchParams)
    try{
        const docRef = doc(db, "campaigns", id);
        const docSnap = await getDoc(docRef)
        if(docSnap.exists()){
            return NextResponse.json(
                {message: docSnap.data().history},
                {status: 200}
            )
        }
        else{
            return NextResponse.json(
                {message: `An error was found while retrieving the chat history`},
                {status: 400}
            )
        }
    }
    catch(e){
        return NextResponse.json(
            {message: `An error occurred: ${JSON.stringify(e)}`},
            {status: 400}
        )
    }
}

// POST the passed history for the id
export async function POST(request) {
    // get the data from the body as a readableStream
    const data = request.body
    // convert the readableStream into a string
    const result = await streamToString(data)
    // then parse the string
    const objectResult = JSON.parse(result)

    // separating the variables from the data to pass to firebase
    const history = objectResult.history
    const id = objectResult.id
    if(history){
        const docRef = doc(db, "campaigns", id)
        await setDoc(docRef, {history: JSON.parse(history)})
        return NextResponse.json(
            { message: "Data saved successfully" },
            { status: 200}
        )
    }
    else{
        return NextResponse.json(
            { message: "History not found in body"},
            { status: 400}
        )
    }
}