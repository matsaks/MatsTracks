import { Box, Card, CardContent, Typography } from "@mui/material"
import React from "react"

interface StatBoxProps {
    info: string,
    stat: string | number
}

export default function StatBox(props: StatBoxProps){

    const card = (
        <React.Fragment>
            <CardContent sx={{ backgroundColor: "#BACEC1"}}>
                <Typography sx={{ fontSize: 14}} gutterBottom>
                    {props.info}
                </Typography>
                <Typography sx={{ fontSize: 17, fontWeight: 'bold'}} variant="h5" component="div">
                    {props.stat}
                </Typography>
            </CardContent>
        </React.Fragment>
    )

    return (
        <div>
            <Box>
                <Card sx={{maxHeight: '100px'}} variant="outlined">{card}</Card>
            </Box>
        </div>
    )
}