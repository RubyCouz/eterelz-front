import React, {useContext} from 'react'
import AuthNavbar from '../Components/Navbar/AuthNavbar'
import {makeStyles} from "@material-ui/core/styles"
import AuthContext from '../context/auth-context'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%'
    }
}))

export default function Dashboard() {

    let classes = useStyles()
    const context = useContext(AuthContext)

    return (
        <div className={classes.root}>
            <AuthNavbar/>
            <h1>Vos clans</h1>
        </div>
    )
}