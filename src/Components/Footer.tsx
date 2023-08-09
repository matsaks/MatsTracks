import { Avatar } from "@mui/material"


export default function Footer(){

    return (
        <div style={{...styles.footer, position: 'fixed'}}>
            <div style={styles.avatar}>
                <a href="https://github.com/matsaks/MatsTracks" target="_blank">
                    <Avatar alt="Github" src="src\assets\github.png" />

                </a>

            </div>
        </div>
    )
}

const styles = {
    footer : {
        heigth: '7vh',
        left: '0',
        bottom: '0',
        width: '100%',
    },
    avatar: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%'
    }
}