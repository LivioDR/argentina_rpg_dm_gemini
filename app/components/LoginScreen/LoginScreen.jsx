'use client'
import { useState } from "react";
import React from "react";
import InputField from "./InputField";
import { loginUser, registerUser, resetPassword } from "@/app/services/firebase/firebaseFunctions";
import Button from "./Button";

const LoginScreen = ({setUid, setIsLogin, setUsername}) => {

    const [error, setError] = useState("")
    const [forgotPassScreen, setForgotPassScreen] = useState(false)
    const [registerScreen, setRegisterScreen] = useState(false)

    const registerMe = async() => {
        const usernameInput = document.getElementById("username-input")
        const emailInput = document.getElementById("email-input")
        const passInput = document.getElementById("password-input")
        
        const username = usernameInput.value.trim()
        const email = emailInput.value.trim()
        const pass = passInput.value.trim()
        
        if(username && email && pass){
            try{
                let attempt = await registerUser(username, email, pass, setError)
                if(attempt){
                    if(typeof window != "undefined"){
                        let uid = localStorage.getItem("uid")
                        setUid(uid)
                        setUsername(username)
                        setIsLogin(true)
                    }
                }
            }
            catch(e){
                console.error(e)
            }
        }
        else{
            setError("Please enter valid credentials")
        }
    }


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
                        let username = localStorage.getItem("username")
                        setUid(uid)
                        setUsername(username)
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
            {
                registerScreen &&
                <InputField type={'username'} placeholder={'Enter your username'}/>
            }
            <InputField type={'email'} placeholder={"Enter your email"} />
            {
                !forgotPassScreen &&
                <InputField type={'password'} placeholder={"Enter your password"} />
            }
            {
                !forgotPassScreen &&
                !registerScreen &&
                <>
                    <Button
                        background={'#322cf0'}
                        functionToCall={logMeIn}
                        text={"Login"}
                        textColor={'white'}
                    />
                    <Button 
                        background={'#e7e7ffd1'}
                        functionToCall={()=>{
                            setRegisterScreen(true)
                            setError("")
                        }}
                        text={"Register"}
                        textColor={'black'}
                    />
                    <Button
                        width="90%"
                        background={"#A0A0A080"}
                        textColor={"white"}
                        text={"Forgot pass?"} 
                        functionToCall={()=>{
                            setForgotPassScreen(true)
                            setError("")
                        }}
                    />                   
                </>
            }
            {
                forgotPassScreen && 
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Button
                        background={'#A0A0A0'}
                        textColor={'white'}
                        text={"Back"}
                        functionToCall={()=>{setForgotPassScreen(false);setError("")}}
                    />
                    <Button
                        background={'#891b1b'}
                        functionToCall={resetPass}
                        text={"Send recovery email"}
                        textColor={'white'}
                    />
                </div>
            }
            {
                registerScreen &&
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Button
                        background={'#e7e7ffd1'}
                        textColor={'black'}
                        text={"Back"}
                        functionToCall={()=>{setRegisterScreen(false);setError("")}}
                    />
                    <Button
                        background={'#322cf0'}
                        functionToCall={registerMe}
                        text={"Register"}
                        textColor={'white'}
                    />
                </div>
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