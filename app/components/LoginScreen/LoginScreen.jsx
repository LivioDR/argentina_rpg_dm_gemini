'use client'
import { useState } from "react";
import React from "react";
import InputField from "./InputField";
import { loginUser, resetPassword } from "@/app/services/firebase/firebaseFunctions";

const LoginScreen = ({setUid, setIsLogin}) => {

    const [error, setError] = useState("")
    const [forgotPassScreen, setForgotPassScreen] = useState(false)


    const logMeIn = async() => {
        const emailInput = document.getElementById("email-input")
        const passInput = document.getElementById("password-input")
        const email = emailInput.value.trim()
        const pass = passInput.value.trim()
        if(email && pass){
            try{
                let attempt = await loginUser(email, pass, setError)
                if(attempt){
                    if(typeof window != "undefined"){
                        let uid = localStorage.getItem("uid")
                        setUid(uid)
                        setIsLogin(true)
                    }
                }
            }
            catch(e){
                console.error(e)
            }
        }
        else{
            setError("Please enter a valid email and password")
        }
    }

    const resetPass = async() => {
        const emailInput = document.getElementById("email-input")
        const email = emailInput.value.trim()
        if(email){
            try{
                await resetPassword(emailInput.value.trim(), setError)
            }
            catch(e){
                console.error(e)
            }
        }
        else{
            setError("Please enter your email")
        }
    }

    return(
        <div style={{
            width: '100%',
            maxWidth: '500px',
            margin: '0 auto',
        }}>
            <InputField type={'email'} placeholder={"Enter your email"} />
            {
                !forgotPassScreen &&
                <InputField type={'password'} placeholder={"Enter your password"} />
            }
            {
                !forgotPassScreen &&
                <>
                    <button style={{
                        width: '40%',
                        height: '3rem',
                        margin: '3% 5%',
                        borderRadius: '50px',
                        backgroundColor: '#322cf0',
                        color: 'white',
                    }} onClick={()=>{logMeIn()}}>Login</button>
                    <button style={{
                        width: '40%',
                        height: '3rem',
                        margin: '3% 5%',
                        borderRadius: '50px',
                        backgroundColor: '#A0A0A0',
                    }} onClick={()=>{setForgotPassScreen(true);setError("")}}>Forgot pass?</button>
                </>
            }
            {
                forgotPassScreen && 
                <>
                    <button style={{
                        width: '40%',
                        height: '3rem',
                        margin: '3% 5%',
                        borderRadius: '50px',
                        backgroundColor: '#A0A0A0',
                        color: 'white',
                    }} onClick={()=>{setForgotPassScreen(false);setError("")}}>Back</button>
                    <button style={{
                        width: '40%',
                        height: '3rem',
                        margin: '3% 5%',
                        borderRadius: '50px',
                        backgroundColor: '#891b1b',
                    }} onClick={()=>{resetPass()}}>Send recovery email</button>
                </>
            }
            <p id="errorMessage"
            style={{
                width: '100%',
                textAlign: 'center',
                WebkitTextStroke: '.2px black',
            }}>{error}</p>
        </div>
    )
}

export default LoginScreen