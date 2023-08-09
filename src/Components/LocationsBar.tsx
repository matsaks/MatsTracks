import { Button } from "@mui/material";

interface IProps {
    handleLocationChange: {(arg0: string): void};
    map: string;
    numberOfLocations: number;
}

export default function LocationBar({handleLocationChange, map, numberOfLocations}: IProps){

    const runningLocations = [
        "Ålesund",
        "Trondheim",
        "Larvik",
        "Nordfjord",
        "Porsanger"
    ]
    const skiingLocations = [
        "Hjørundfjorden",
        "Stordal",
        "Nordmøre",
        "Trondheim",
        "Nordfjord"
    ]

    const renderButtons = () => {
        if (map === "Heatmap" || map === "Run"){
            return (
                <div style={{ display: 'flex' , justifyContent: 'space-between', marginTop: '15px'}}>
                    {runningLocations.slice(0, numberOfLocations-1).map((location) => (
                        <Button sx={sxStyles.button} onClick={() => handleLocationChange(location)} variant="contained">{location}</Button>
                    ))}
                </div>
        )} else {
            return (
                <div style={{ display: 'flex' , justifyContent: 'space-between', marginTop: '15px'}}>
                    {skiingLocations.slice(0, numberOfLocations-1).map((location) => (
                        <Button sx={sxStyles.button} onClick={() => handleLocationChange(location)} variant="contained">{location}</Button>
                    ))}
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