import React from "react";

const InputField = ({placeholder, type}) => {

    return(
        <div style={{
            width: '100%',
            height: '3rem',
            margin: '5%',
        }}>
            <input style={{
            width: '90%',
            height: '3rem',
            padding: '3%',
            borderRadius: '10px',
        }} type={type} id={`${type}-input`} placeholder={placeholder}></input>
        </div>
    )
}
export default InputField