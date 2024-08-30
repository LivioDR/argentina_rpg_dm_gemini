import React from "react";

const Button = ({text, functionToCall, background, textColor, width = '40%', borderColor = 'white'}) => {
    return(
        <button style={{
            width: width,
            height: '3rem',
            margin: '3% 5%',
            borderRadius: '50px',
            backgroundColor: background,
            color: textColor,
            borderColor: borderColor
        }} onClick={()=>{functionToCall()}}>{text}</button>
    )
}
export default Button