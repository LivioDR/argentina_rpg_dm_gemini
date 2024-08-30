import React from "react";
import Image from "next/image";
import Button from "./LoginScreen/Button";

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
    logoWrapper: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '80%',
    },
    text: {
        fontSize: 24,
    },
    image: {
        margin: '2%',
    },
    username: {
        fontSize: 10,
        alignSelf: 'center',
        justifySelf: 'flex-end',
        margin: '1%',
    }
}

const Header = ({username, displayLogout = true, logoutFunction}) => {
    return(
        <>
            <div style={styles.container}>
                <div style={styles.logoWrapper}>
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
                {
                    displayLogout &&
                    <Button 
                        background={'transparent'}
                        text={`Welcome, ${username}. Logout?`}
                        textColor={'white'}
                        functionToCall={logoutFunction}
                        width={'20%'}
                        borderColor={'transparent'}
                    />
                }
            </div>
        </>
    )
}

export default Header