'use client'
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    updateProfile,
    deleteUser,
    signOut,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "./firebaseClient";
import SEED_HISTORY from "./seedCampaign";


// Firebase reports auth failures with a machine-readable code. Map it to
// something a player can act on, and keep "no such user" and "wrong password"
// indistinguishable so the form can't be used to enumerate accounts.
const authErrorMessage = (error) => {
    switch(error?.code){
        case 'auth/invalid-email':
            return "Please enter a valid email address."
        case 'auth/invalid-credential':
        case 'auth/wrong-password':
        case 'auth/user-not-found':
        case 'auth/missing-password':
            return "Incorrect email or password."
        case 'auth/user-disabled':
            return "This account has been disabled."
        case 'auth/too-many-requests':
            return "Too many attempts. Please wait a moment and try again."
        case 'auth/email-already-in-use':
            return "That email can't be used. Try logging in or resetting your password."
        case 'auth/weak-password':
            return "Your password must be at least 6 characters long."
        case 'auth/network-request-failed':
            return "Network error. Please check your connection and try again."
        default:
            // the code only: never the message (it echoes the email back)
            console.error("Auth error:", error?.code)
            return "Something went wrong. Please try again."
    }
}


// Registration writes the user and campaign documents right after the account
// is created, but onAuthStateChanged fires the moment createUser resolves. This
// promise lets the session listener wait until those documents actually exist.
let provisioning = null
const waitForProvisioning = () => provisioning || Promise.resolve()


// The username lives in Firestore, but for anyone who registered after this
// change it also rides along on the auth user as displayName, which costs no
// round-trip. Accounts created before it fall back to a single Firestore read
// that backfills displayName, so they pay that cost only once.
const resolveUsername = async(user) => {
    if(user.displayName){
        return user.displayName
    }
    try{
        const docSnap = await getDoc(doc(db, "users", user.uid))
        const name = docSnap.exists() ? docSnap.data().username : null
        if(name){
            try{
                await updateProfile(user, {displayName: name})
            }
            catch(e){
                // non-fatal: we simply read it again on the next login
            }
            return name
        }
    }
    catch(e){
        console.error('An error was found while trying to retrieve the username')
    }
    return user.email ? user.email.split("@")[0] : "adventurer"
}


const getHistoryForId = async(id) => {
    const docSnap = await getDoc(doc(db, "campaigns", id))
    if(!docSnap.exists()){
        throw new Error("Campaign not found")
    }
    return docSnap.data().history
}

const saveHistoryForId = async(id, history) => {
    if(history){
        // write only `history`: firestore.rules pins the document to that shape
        await setDoc(doc(db, "campaigns", id), {history: history})
    }
}

const loginUser = async(email, password, setErrorMessage) => {
    try{
        await signInWithEmailAndPassword(auth, email, password)
        setErrorMessage("")
        // onAuthStateChanged in app/page.js picks the session up from here
        return true
    }
    catch(e){
        setErrorMessage(authErrorMessage(e))
        return false
    }
}

const resetPassword = async(email, setErrorMessage) => {
    try{
        await sendPasswordResetEmail(auth, email.trim())
    }
    catch(e){
        // deliberately swallowed: reporting the failure would reveal whether
        // an account exists for this address
        console.error("Reset failed:", e?.code)
    }
    setErrorMessage("If an account exists for that email, a reset link has been sent.")
}

const registerUser = async(username, email, password, setErrorMessage) => {
    let done
    // armed before the account exists, so the session listener can never slip
    // through to MainScreen while the campaign document is still missing
    provisioning = new Promise((resolve) => { done = resolve })
    try{
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        const user = userCredential.user
        try{
            await setDoc(doc(db, "users", user.uid), {username: username, email: email})
            await setDoc(doc(db, "campaigns", user.uid), {history: SEED_HISTORY})
            await updateProfile(user, {displayName: username})
        }
        catch(writeError){
            console.error("Account provisioning failed:", writeError?.code)
            // roll back, or the player is left with an account that owns no
            // campaign: unusable, and impossible to re-register
            await deleteUser(user).catch(() => signOut(auth))
            setErrorMessage("We couldn't finish setting up your account. Please try again.")
            return false
        }
        setErrorMessage("")
        return true
    }
    catch(e){
        setErrorMessage(authErrorMessage(e))
        return false
    }
    finally{
        done()
        provisioning = null
    }
}


export {
    getHistoryForId,
    saveHistoryForId,
    loginUser,
    resetPassword,
    registerUser,
    resolveUsername,
    waitForProvisioning,
}
