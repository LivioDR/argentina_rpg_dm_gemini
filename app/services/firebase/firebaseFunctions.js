// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, getDoc, doc, setDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "rpgdm-83fa3.firebaseapp.com",
  projectId: "rpgdm-83fa3",
  storageBucket: "rpgdm-83fa3.appspot.com",
  messagingSenderId: "597557920768",
  appId: process.env.MEXT_PUBLIC_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)


const getHistoryForId = async(id) => {
    const docRef = doc(db, "campaigns", id);
    const docSnap = await getDoc(docRef)
    if(docSnap.exists()){
        console.warn(docSnap.data())
        return docSnap.data().history
    }
    else{
        return []
    }
}

const saveHistoryForId = async(id, history) => {
    console.log("History to be saved:")
    console.log(history)
    if(history){
        const docRef = doc(db, "campaigns", id)
        await setDoc(docRef, {history: history})
        console.log("Data saved successfully")
    }
}

export { getHistoryForId, saveHistoryForId }