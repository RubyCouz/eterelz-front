import React from 'react'
import AuthNavbar from '../Components/Navbar/AuthNavbar'
import {makeStyles} from '@mui/styles'
import {useDocTitle} from '../Hook/useDocTitle'
import {useDocTitle} from '../../Hook/useDocTitle'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%'
    }
}))

export default function Dashboard() {

    useDocTitle('EterelZ Les Teams')
    let classes = useStyles()

    return (
        <div className={classes.root}>
            <AuthNavbar/>
            <h1>Vos clans</h1>
        </div>
    )
}