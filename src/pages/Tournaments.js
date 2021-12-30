import React from 'react'
import AuthNavbar from '../Components/Navbar/AuthNavbar'
import {makeStyles} from '@mui/styles'
import {useDocTitle} from '../Hook/useDocTitle'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%'
    }
}))

export default function Tournaments() {
    useDocTitle('EterelZ Tournois')

    let classes = useStyles()

    return (
        <div className={classes.root}>
            <AuthNavbar/>
            <h1>Tournois</h1>
        </div>
    )
}