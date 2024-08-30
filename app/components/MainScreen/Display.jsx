import React from "react";
import { PacmanLoader } from "react-spinners";

const Display = ({loading, modelResponse}) => {
    return(
        <div 
        style={{
            width: '80%', 
            maxWidth: '500px',
            margin: '0% auto', 
            wordWrap: 'break-word', 
            overflowY: 'scroll', 
            height: '60%',
            backgroundColor: 'lightgray',
            color: 'black',
            borderRadius: '50px',
            }}>
            <pre style={{whiteSpace: 'pre-wrap', padding: '10%', height: '100%',}}>
            {!loading && modelResponse}
            {loading &&
                <div style={{
                display: 'grid',
                placeContent: 'center',
                margin: 'auto auto',
                height: '100%',
                width: '100%',
                }}>
                <p style={{margin: '1%', width: '100%', textAlign: 'center',}}>Loading</p>
                <PacmanLoader />
                </div>
            }
            </pre>
        </div>
    )
}

export default Display