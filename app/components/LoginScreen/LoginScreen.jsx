'use client'
import { useState } from "react";
import React from "react";
import InputField from "./InputField";
import { loginUser } from "@/app/services/firebase/firebaseFunctions";

const LoginScreen = ({setUid, setIsLogin}) => {

    const [error, setError] = useState("")


    const logMeIn = async() => {
        const emailInput = document.getElementById("email-input")
        const passInput = document.getElementById("password-input")
        try{
            let attempt = await loginUser(emailInput.value.trim(), passInput.value.trim(), setError)
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

    return(
        <div style={{
            width: '100%',
            maxWidth: '500px',
            margin: '0 auto',
        }}>
            <InputField type={'email'} placeholder={"Enter your email"} />
            <InputField type={'password'} placeholder={"Enter your password"} />
            <button style={{
                width: '40%',
                height: '3rem',
                margin: '3% 30%',
                borderRadius: '50px',
            }} onClick={()=>{logMeIn()}}>Login</button>
            <p id="errorMessage">{error}</p>
        </div>
    )
}

export default LoginScreen