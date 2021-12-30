import React from 'react'
import Box from '@mui/material/Box'

export default function NoFound() {
    return (
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
           <iframe width="560" height="315"
                   src="https://www.youtube.com/embed/fklt_p0RiRA?controls=0&autoplay=1" title="YouTube video player"
                   frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                   allowFullScreen/>
        </Box>
    )
}