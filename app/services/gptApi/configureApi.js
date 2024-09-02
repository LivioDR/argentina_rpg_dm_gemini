import { saveHistoryForId } from "../firebase/firebaseFunctions";

async function runAi(prompt, setModelResponse, receivedHistory, setHistory, setLoading) {
  setLoading(true)
  let history = [...receivedHistory]

  const response = await fetch('/api/gemini',{
    method: 'POST',
    body: JSON.stringify({
       history: history,
       prompt: prompt,
    })
  }).then(res => res.json())

  // send the history and the prompt to the model
  setModelResponse(response.message)
  
  // adding the user prompt to the history
  history.push({
    role: 'user',
    parts: [{text: prompt}]
  })
  // and then adding the response
  history.push({
    role: 'model',
    parts: [{text: response.message}]
  })

  // to save it in Firebase at last
  const userId = localStorage.getItem("uid")
  await saveHistoryForId(userId, history)
  setHistory(history)
  setLoading(false)

}


export default runAi