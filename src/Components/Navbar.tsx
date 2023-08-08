import { Alert, AlertColor, Button, Grid, Snackbar } from "@mui/material";
import MapIcon from "@mui/icons-material/Map"
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import TerrainIcon from '@mui/icons-material/Terrain';
import SyncIcon from '@mui/icons-material/Sync';
import { useNavigate } from "react-router-dom";
import { addActivities, syncActivities } from "../lib/controller";
import { useState } from "react";

interface IProps {
    handleLoading: {(arg0: boolean): void};
}

const Navbar = ({handleLoading}: IProps) => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [alertType, setAlertType] = useState<AlertColor>("info");
    const hideNavbarOnRoutes = ['/'];

    const shouldHideNavbar = hideNavbarOnRoutes.includes(location.pathname);

    if (shouldHideNavbar){
        return null;
    }

    async function handleSync(){
        try {
            handleLoading(true);
            const newActivities = await syncActivities();
            newActivities.map((a) => {
                if (a.elevHigh === undefined){
                    a.elevHigh = 0;
                }
                if (a.elevLow === undefined){
                    a.elevLow = 0;
                }
            })
            if (newActivities.length > 0){
                addActivities(newActivities);
            }
            handleLoading(false);
            if (newActivities.length === 0){
                setMessage("Ingen nye økter funnet!");
                setAlertType("info");
                setOpen(true);
            } else {
                let alertMessage = "";
                for (let i = 0; i < newActivities.length; i++) {
                    if (i < newActivities.length - 2){
                        alertMessage += newActivities[i].name + ", ";
                    } if (i === newActivities.length -2){
                        alertMessage += newActivities[i].name + " og ";   
                    } if (i === newActivities.length -1) {
                        alertMessage += newActivities[i].name + " er lagret til database!";
                    }
                }
                setMessage(alertMessage);
                setAlertType("success");
                setOpen(true);
            }
            
        } catch (error) {
            setMessage("Feil med synkronisering!");
            setAlertType("error");
            setOpen(true);
        }
    }

    return (
        <div>
            <div style={{ backgroundColor: '#F8EFEA', height: 75}}>
                <Grid container spacing={2}>
                    <Grid item xs={7} sx={{display: "flex", justifyContent: "space-between", mt: 0.3}}>
                        <Button sx={sxStyles.button} 
                            startIcon={<MapIcon/>} 
                            size="large" 
                            variant="contained" 
                            onClick={() => navigate("/heatmap")}>Heatmap</Button>
                        <Button sx={sxStyles.button} 
                            startIcon={<DirectionsRunIcon/>} 
                            variant="contained" 
                            onClick={() => navigate("/running")}>Løping</Button>
                        <Button sx={sxStyles.button} 
                            startIcon={<TerrainIcon/>} 
                            variant="contained" 
                            onClick={() => navigate("/skiing")}>Ski</Button>
                    </Grid>
                    <Grid item xs={5} sx={{ mt: 0.3}}>
                        <Button sx={{width: '300px', height: '50px', fontSize: '16px', backgroundColor: '#3C8ED9', float: "right", mr: 10}} 
                            startIcon={<SyncIcon/>} 
                            variant="contained" 
                            size="large" 
                            onClick={handleSync}
                            >Synkroniser</Button>
                    </Grid>
                </Grid>
            </div>
            
            <Snackbar
                sx={{'& .MuiAlert-message': {
                    fontSize: '26px'}, width: 500}} 
                open={open}
                autoHideDuration={6000}
                onClose={() => setOpen(false)}>
                <Alert variant='filled' onClose={() => setOpen(false)} severity={alertType}>
                    {message}
                </Alert>
            </Snackbar>
        </div>
    )
}

export default Navbar;

const sxStyles = {
    button: {
        width: '300px',
        height: '50px',
        backgroundColor: '#3C8ED9', 
        fontSize: '16px'
    }
}