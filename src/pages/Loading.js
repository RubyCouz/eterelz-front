import React from 'react'
import {
    CircularProgress,
    Box,
} from '@material-ui/core'

export default function Loading() {
    return (
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
            {/*<CircularProgress />*/}
            <img src="./img/eterelz/logo/loading.gif" alt="logo de chargement" title="chargement de la page"/>
        </Box>
    )
}