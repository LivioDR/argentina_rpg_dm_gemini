'use client'
import Header from "./components/Header";
import Footer from "./components/Footer";
import MainScreen from "./components/MainScreen/MainScreen";
import { useEffect, useState } from "react";
import LoginScreen from "./components/LoginScreen/LoginScreen";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./services/firebase/firebaseClient";
import { resolveUsername, waitForProvisioning } from "./services/firebase/firebaseFunctions";
import { PacmanLoader } from "react-spinners";

export default function Home() {

  // status: 'loading' until Firebase tells us, then 'in' or 'out'. The third
  // value is what stops a returning player seeing the login screen flash by.
  const [session, setSession] = useState({status: 'loading', uid: '', username: ''})
  const [viewport, setViewport] = useState()

  useEffect(()=>{
    if(typeof window != "undefined"){
      let windowSize = {height: window.innerHeight, width: window.innerWidth}
      setViewport(windowSize)
      // the session used to live here; Firebase Auth owns it now
      localStorage.removeItem("uid")
      localStorage.removeItem("username")
      if('serviceWorker' in navigator){
        navigator.serviceWorker.register('/serviceWorker.js')
      }
    }
  },[])

  // Firebase Auth is the single source of truth for who is logged in
  useEffect(()=>{
    let cancelled = false
    const unsubscribe = onAuthStateChanged(auth, async(user) => {
      if(!user){
        if(!cancelled){
          setSession({status: 'out', uid: '', username: ''})
        }
        return
      }
      await waitForProvisioning()
      const username = await resolveUsername(user)
      // another auth change may have landed while we were awaiting: a failed
      // registration rolls the new account back, and a stale callback must not
      // log that deleted user in
      if(!cancelled && auth.currentUser?.uid === user.uid){
        setSession({status: 'in', uid: user.uid, username: username})
      }
    })
    return () => {
      cancelled = true
      unsubscribe()
    }
  },[])

  const logoutUser = async () => {
    try{
      // the listener above flips the session to 'out'
      await signOut(auth)
    }
    catch(e){
      console.error("Sign-out failed:", e?.code)
    }
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      height: viewport?.height | '100vh',
      width: '100vw',
      backgroundImage: 'url(./background.jpg)',
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
    }}>
      <Header username={session.username} displayLogout={session.status === 'in'} logoutFunction={logoutUser}/>
      {
        session.status === 'loading' &&
        <div style={{display: 'grid', placeContent: 'center', flex: 1}}>
          <PacmanLoader />
        </div>
      }
      {
        session.status === 'out' &&
        <LoginScreen/>
      }
      {
        session.status === 'in' &&
        <MainScreen firebaseId={session.uid}/>
      }
      <Footer/>
    </div>
  );
}
