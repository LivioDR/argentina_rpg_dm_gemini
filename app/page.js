'use client'
import Header from "./components/Header";
import Footer from "./components/Footer";
import MainScreen from "./components/MainScreen";
import { useEffect, useState } from "react";
import LoginScreen from "./components/LoginScreen/LoginScreen";

export default function Home() {

  const [uid, setUid] = useState('')
  const [isLogin, setIsLogin] = useState(false)

  useEffect(()=>{
    if(typeof window != "undefined"){
      const userId = localStorage.getItem("uid")
      if(userId){
        setUid(userId)
        setIsLogin(true)
      }
    }
  },[])

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      height: '100vh',
      width: '100vw',
      backgroundImage: 'url(./background.jpeg)',
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
    }}>
      <Header/>
      {
        !isLogin &&
        <LoginScreen setUid={setUid} setIsLogin={setIsLogin}/>
      }
      {
        isLogin &&
        <MainScreen firebaseId={uid}/>
      }
      <Footer/>
    </div>  
  );
}
