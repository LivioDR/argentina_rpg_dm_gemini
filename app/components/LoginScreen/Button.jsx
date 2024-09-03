import React from "react";
import { Press_Start_2P } from "next/font/google";

const pressStart = Press_Start_2P({ weight: "400", subsets: ["latin"]});

const Button = ({text, functionToCall, background, textColor, width = '40%', borderColor = 'white', fontSize = null}) => {
    return(
        <button className={pressStart.className} style={{
            width: width,
            height: '3rem',
            margin: '3% 5%',
            borderRadius: '50px',
            backgroundColor: background,
            color: textColor,
            borderColor: borderColor,
            fontSize: fontSize? fontSize : ''
        }} onClick={()=>{functionToCall()}}>{text}</button>
    )
}
export default Button