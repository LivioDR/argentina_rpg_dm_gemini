'use client'
import Header from "./components/Header";
import Footer from "./components/Footer";
import MainScreen from "./components/MainScreen/MainScreen";
import { useEffect, useState } from "react";
import LoginScreen from "./components/LoginScreen/LoginScreen";

export default function Home() {

  const [uid, setUid] = useState('')
  const [isLogin, setIsLogin] = useState(false)
  const [username, setUsername] = useState('')
  const [viewport, setViewport] = useState()

  useEffect(()=>{
    if(typeof window != "undefined"){
      let windowSize = {height: window.innerHeight, width: window.innerWidth}
      setViewport(windowSize)
      const userId = localStorage.getItem("uid")
      const user = localStorage.getItem("username")
      if(userId){
        setUid(userId)
        setUsername(user)
        setIsLogin(true)
      }
    }
  },[])

  const logoutUser = () => {
    if(typeof window != 'undefined'){
      localStorage.removeItem("uid")
      localStorage.removeItem("username")
    }
    setUid('')
    setUsername('')
    setIsLogin(false)
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      height: viewport?.height | '100vh',
      width: '100vw',
      backgroundImage: 'url(./login.jpeg)',
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
    }}>
      <Header username={username} displayLogout={isLogin} logoutFunction={logoutUser}/>
      {
        !isLogin &&
        <LoginScreen setUid={setUid} setIsLogin={setIsLogin} setUsername={setUsername}/>
      }
      {
        isLogin &&
        <MainScreen firebaseId={uid}/>
      }
      <Footer/>
    </div>  
  );
}
