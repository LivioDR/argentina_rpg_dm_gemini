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
        justifyContent: 'flex-start',
        marginLeft: 20,
        alignItems: 'center',
        width: '100%',
    },
    text: {
        fontSize: 18,
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
                        TermoArgenta RPG
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
                        fontSize={'x-small'}
                    />
                }
            </div>
        </>
    )
}

export default Header