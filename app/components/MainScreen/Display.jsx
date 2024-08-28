import React from "react";

const Display = ({loading, modelResponse}) => {
    return(
        <div 
        style={{
            width: '80%', 
            maxWidth: '500px',
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
    )
}

export default Display