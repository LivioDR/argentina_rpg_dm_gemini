// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, getDoc, doc } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import streamToString from "@/app/utilities/apiFunctions";
import { NextResponse } from "next/server";

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
const auth = getAuth(app)


const getUsernameForId = async(id) => {
    const docRef = doc(db, "users", id);
    const docSnap = await getDoc(docRef)
    if(docSnap.exists()){
        console.warn(docSnap.data())
        return docSnap.data().username
    }
    else{
        console.error('An error was found while trying to retrieve the username')
    }
}


export async function POST(request) {
    // get the data from the body as a readableStream
    const data = request.body
    // convert the readableStream into a string
    const result = await streamToString(data)
    // then parse the string
    const objectResult = JSON.parse(result)

    // separating the variables from the data to pass to firebase
    const email = objectResult.email
    const password = atob(objectResult.password)

    try{
        let userCredential = await signInWithEmailAndPassword(auth, email, password)
        const user = userCredential.user;
        const uid = user.uid
        const username = await getUsernameForId(uid)

        return NextResponse.json(
            {
                uid: uid,
                username: username,
                message: '',
                success: true,
            },
            { status: 200}
        )
    }
    catch(error){
        const errorMessage = error.message;

        return NextResponse.json(
            {
                uid: '',
                username: '',
                message: errorMessage,
                success: false,
            },
            { status: 401 }
        )
    }
}