'use client'
import { useEffect, useState } from "react";
import runAi from "../services/gptApi/configureApi";
import { getHistoryForId } from "../services/firebase/firebaseFunctions";
import Display from "./MainScreen/Display";

export default function MainScreen({firebaseId}) {

  const [modelResponse, setModelResponse] = useState("")
  const [loading, setLoading] = useState(true)

  let history = []
  const setHistory = (data) => {
    history = [...data]
  }


  useEffect(()=>{
    const getHistory = async() => {
      setLoading(true)
      const usersHistory = await getHistoryForId(firebaseId)
      console.log("History retrieved")
      console.warn(usersHistory)
      setHistory(usersHistory)
      setModelResponse(history[history.length -1].parts[0].text)
      setLoading(false)
    }
    getHistory()

    const inputField = document.getElementById("userInput")
    inputField.addEventListener('keypress',(event) => {
      if(event.key == "Enter" && inputField.value.trim() != ""){
        sendBtnClicked()
      }
    })
    
  },[])

  const sendBtnClicked = () => {
    const input = document.getElementById("userInput");
    const inputText = input.value.trim()
    if(inputText.length > 0){
      console.log(inputText);
      console.log("About to pass the history: ", history)
      runAi(inputText, setModelResponse, history, setHistory)
    }
    input.value = ''
    input.focus()
  }

  return (
    <>
      <Display loading={loading} modelResponse={modelResponse} />
      <div style={{
        width: '80%',
        margin: '0 auto',
        minHeight: '5vh',
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
      }}>
        <input id="userInput" 
        style={{ 
          width: '70%', 
          marginInline: '2%', 
          height: '3rem',
          padding: '0.5rem',
          }}>
        </input>
        <button 
          onClick={()=>{sendBtnClicked()}}
          style={{
            width: '20%',
            margin: '3%',
            height: '3rem',
          }}  
          >Send</button>
      </div>
    </>
  );
}
