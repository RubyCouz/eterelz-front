import React from 'react'
import Box from '@mui/material/Box'
import {useDocTitle} from '../Hook/useDocTitle'

export default function NoFound() {
    useDocTitle('EterelZ 404 not found')
    return (
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
            <img src="/img/eterelz/error/error_404.jpg" alt="error_404" title="Error 404 page not found"/>
        </Box>
    )
}