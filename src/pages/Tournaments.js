import React, {useContext} from 'react'
import AuthNavbar from '../Components/Navbar/AuthNavbar'
import {makeStyles} from "@material-ui/core/styles"
import AuthContext from '../context/auth-context'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%'
    }
}))

export default function Tournaments() {

    let classes = useStyles()
    const context = useContext(AuthContext)

    return (
        <div className={classes.root}>
            <AuthNavbar/>
            <h1>Tournois</h1>
        </div>
    )
}