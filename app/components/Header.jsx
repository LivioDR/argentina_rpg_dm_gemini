import React from "react";
import Image from "next/image";

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '10vh',
        backgroundColor: 'rgba(0,0,0,0.7)'
    },
    text: {
        fontSize: 24,
    },
    image: {
        margin: '2%',
    }
}

const Header = () => {
    return(
        <div style={styles.container}>
            <Image
                priority
                src={'/icosahedron.png'}
                width={48}
                height={48}
                alt="Logo of a d20 dice"
                style={styles.image}
            />
            <p style={styles.text}>
                AI-gentina RPG
            </p>
        </div>
    )
}

export default Header