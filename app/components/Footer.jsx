import React from "react";

const styles = {
    container: {
        width: '100%',
        height: '5vh',
        textAlign: 'center',
        fontSize: 10,
        backgroundColor: 'rgba(0,0,0,0.7)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    }
}

const Footer = () => {
    return(
        <div style={styles.container}>
        <a href="https://www.flaticon.com/free-icons/icosahedron" title="icosahedron icons">Icosahedron icons created by Freepik - Flaticon</a>
        </div>
    )
}
export default Footer
