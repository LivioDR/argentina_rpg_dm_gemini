import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from "@google/generative-ai";
import { NextResponse } from "next/server";

// Fetch your API_KEY
const API_KEY = process.env.API_KEY

// Access your API key (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
model.safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_NONE
  },
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_NONE
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_NONE
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_NONE
  }
]

export async function POST(request) {
    const data = request.body
    console.log("Data: ",data)
    
    const result = await streamToString(data)
    const objectResult = JSON.parse(result)

    console.log("objectResult: ", objectResult)

    // separating the data to pass to the model
    let history = objectResult.history
    const prompt = objectResult.prompt

    // declare the variable to store the response from the model
    let responseFromTheModel = ''

    // pushing the user part to the history
    history.push({
        role: 'user',
        parts: [{text: prompt}]
      })

    try{
        // set the history to be sent to the model
        const chat = model.startChat({
            history: history,
        });

        // send the history and the prompt to the model
        let result = await chat.sendMessage(prompt);
        responseFromTheModel = result.response.text()
        history.push({
            role: 'model',
            parts: [{text: responseFromTheModel}]
        })
        return NextResponse.json({message: responseFromTheModel})
    }
    catch(e){
        return NextResponse.json({message: "An error has occurred.", error: JSON.stringify(e)})
    }
}

async function streamToString (stream) {
    const chunks = [];
    for await(const chunk of stream) {
        chunks.push(Buffer.from(chunk));
    }
    return Buffer.concat(chunks).toString("utf-8");
  }
  