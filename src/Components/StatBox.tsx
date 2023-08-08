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
                <Typography sx={{ fontSize: 24}} gutterBottom>
                    {props.info}
                </Typography>
                <Typography sx={{ fontSize: 48}} variant="h5" component="div">
                    {props.stat}
                </Typography>
            </CardContent>
        </React.Fragment>
    )

    return (
        <div>
            <Box sx={{width: 450}}>
                <Card variant="outlined">{card}</Card>
            </Box>
        </div>
    )
}