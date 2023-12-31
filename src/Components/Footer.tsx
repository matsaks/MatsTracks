//import { Avatar } from "@mui/material"
import GitHubIcon from '@mui/icons-material/GitHub';


export default function Footer(){

    return (
        <div style={{...styles.footer, position: 'fixed'}}>
            <div style={styles.avatar}>
                <a href="https://github.com/matsaks/MatsTracks" target="_blank">
                    <GitHubIcon />
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