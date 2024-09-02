import React from "react";
import { Press_Start_2P } from "next/font/google";

const pressStart = Press_Start_2P({ weight: "400", subsets: ["latin"]});

const InputField = ({placeholder, type}) => {

    return(
        <div style={{
            width: '100%',
            height: '3rem',
            margin: '5%',
        }}>
            <input className={pressStart.className} style={{
            width: '90%',
            height: '3rem',
            padding: '3%',
            borderRadius: '10px',
        }} type={type} id={`${type}-input`} placeholder={placeholder}></input>
        </div>
    )
}
export default InputField