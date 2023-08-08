import { Alert, Avatar, Box, Button, Container, CssBaseline, Snackbar, TextField, Typography } from "@mui/material";
import { frases } from "../data/stormen";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function Login(){
    const navigate = useNavigate();
    const [randomNumber, setRandomNumber] = useState(Math.floor(Math.random()*frases.length));
    const [answer, setAnswer] = useState("");
    const [open, setOpen] = useState(false);

    function handleSubmit(){
        if (answer.toLowerCase() !== frases[randomNumber].answer){
            setRandomNumber(Math.floor(Math.random()*frases.length));
            setOpen(true); 
            return;  
        }
        navigate("/heatmap");
    }

    const handleEnter = (event: { key: string; }) => {
        if (event.key === 'Enter'){
            handleSubmit();
        }
    }

    return(
        <div>

            <Container maxWidth="xs" sx={{mt: 20}}>
                <CssBaseline/>
                <Box sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',}}
                    >
                    <Avatar alt="Logo" src="src\assets\logo.png" />
                    <Typography component="h1" variant="h5">
                        Fullfør setningen
                    </Typography>    
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 5, color: 'red' }}>
                        <Typography component="h6" variant="h5">
                            {frases[randomNumber].song}
                        </Typography>

                    </Box>
                    <TextField sx={{}}
                        margin="normal"
                        required
                        fullWidth
                        value={answer}
                        onChange={(e) => (setAnswer(e.target.value))}
                        onKeyDown={handleEnter}
                    />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={handleSubmit}>
                Logg inn!
                </Button>
                </Box>
            </Container>
            <Snackbar
                sx={{'& .MuiAlert-message': {fontSize: '26px'}, width: 500}} 
                open={open}
                autoHideDuration={3000}
                onClose={() => setOpen(false)}>
                <Alert variant='filled' onClose={() => setOpen(false)} severity="error">
                    Feil passord
                </Alert>
            </Snackbar>
        </div>
    )
}