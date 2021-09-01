import React, {useContext, useRef, useState} from 'react'
import AuthNavbar from '../Components/Navbar/AuthNavbar'
import {makeStyles, useTheme} from "@material-ui/core/styles"
import AuthContext from '../context/auth-context'

import PropTypes from 'prop-types'
import SwipeableViews from 'react-swipeable-views'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import GameList from '../Components/Game/GameList'
import {
    gql,
    useQuery,
    useMutation
} from '@apollo/client'
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Upload from "../Components/Upload/Upload";
import Progress from "../Components/Progress/Progress";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%'
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}))


export default function Dashboard() {
    const theme = useTheme();

    let classes = useStyles()
    const context = useContext(AuthContext)


    const game_pic = useRef('')

    return (
        <div className={classes.root}>
            <Upload
                game_pic={game_pic}
            />
        </div>
    )
}