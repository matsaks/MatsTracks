import { Button } from "@mui/material";

interface IProps {
    handleLocationChange: {(arg0: string): void};
    map: string;
}

export default function LocationBar({handleLocationChange, map}: IProps){

    const renderButtons = () => {
        if (map === "Heatmap" || map === "Run"){
            return (
                <div style={{ display: 'flex' , justifyContent: 'space-between', marginTop: '15px'}}>
                    <Button sx={sxStyles.button} onClick={() => handleLocationChange("Ålesund")} variant="contained">Ålesund</Button>
                    <Button sx={sxStyles.button} onClick={() => handleLocationChange("Trondheim")} variant="contained">Trondheim</Button>
                    <Button sx={sxStyles.button} onClick={() => handleLocationChange("Larvik")} variant="contained">Larvik</Button>
                    <Button sx={sxStyles.button} onClick={() => handleLocationChange("Nordfjord")} variant="contained">Nordfjord</Button>
                    <Button sx={sxStyles.button} onClick={() => handleLocationChange("Porsanger")} variant="contained">Porsanger</Button>
                </div>
        )} else {
            return (
                <div style={{ display: 'flex' , justifyContent: 'space-between', marginTop: '15px'}}>
                    <Button sx={sxStyles.button} onClick={() => handleLocationChange("Hjørundfjorden")} variant="contained">Hjørundfjorden</Button>
                    <Button sx={sxStyles.button} onClick={() => handleLocationChange("Stordal")} variant="contained">Stordal</Button>
                    <Button sx={sxStyles.button} onClick={() => handleLocationChange("Nordmøre")} variant="contained">Nordmøre</Button>
                    <Button sx={sxStyles.button} onClick={() => handleLocationChange("Trondheim")} variant="contained">Trondheim</Button>
                    <Button sx={sxStyles.button} onClick={() => handleLocationChange("Nordfjord")} variant="contained">Nordfjord</Button>
                </div>
            )
        }
    }

    return (
        <div>
            {renderButtons()}
        </div>
    )
}

const sxStyles = {
    button: {
        width: '25vh',
        height: '70%',
        backgroundColor: '#E59560'
    }
}