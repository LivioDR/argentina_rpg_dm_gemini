'use client'
import { useEffect, useState } from "react";
import runAi from "../services/gptApi/configureApi";
import { getHistoryForId } from "../services/firebase/firebaseFunctions";

export default function MainScreen({firebaseId = "qwertyuiop"}) {

  const [modelResponse, setModelResponse] = useState("Welcome, adventurer, to the desolate plains of post-apocalyptic Argentina. The year is 2077, and the once vibrant nation is now a wasteland ravaged by nuclear fire.  Tell me, what is the name of your character, and what race and profession do they embody?  Tell me their story, and I shall weave it into the fabric of this ravaged world.")
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
      if(usersHistory?.length > 0){
        setModelResponse(usersHistory[usersHistory.length -1].parts[0].text)
      }
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
      <div 
      style={{
        width: '80%', 
        margin: '5% auto', 
        wordWrap: 'break-word', 
        overflowY: 'scroll', 
        height: '60vh',
        backgroundColor: 'lightgray',
        color: 'black',
        borderRadius: '50px',
        }}>
        <pre style={{whiteSpace: 'pre-wrap', padding: '10%'}}>
          {!loading && modelResponse}
          {loading &&
            <div style={{
              margin: 'auto auto',
              height: '100vh',
              width: '100vw',
            }}>
            Loading...
            </div>
          }
        </pre>
      </div>
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
