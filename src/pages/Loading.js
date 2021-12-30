import React from 'react'
import Box from '@mui/material/Box'

export default function Loading() {
    return (
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
            <img src="./img/eterelz/logo/loading.gif" alt="logo de chargement" title="chargement de la page"/>
        </Box>
    )
}