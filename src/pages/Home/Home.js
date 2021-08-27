import React, {useState} from 'react'

import {
    IconButton,
    Tab,
    Tabs,
    AppBar,
    MenuItem,
    Toolbar,
} from "@material-ui/core"
import {AccountCircle as AccountCircleIcon} from "@material-ui/icons"
import {makeStyles} from '@material-ui/core/styles'

import SwipeableViews from 'react-swipeable-views'

import {NavLink} from "react-router-dom"

import TabPanel from './TabPanel'

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
    logo: {
        width: '150px',
    },
}));

export default function Home(props) {
    const classes = useStyles();
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    }

    const handleChangeIndex = (index) => {
        setValue(index);
    }

    return (
        <>
            <div className={classes.root}>
                <AppBar
                    position="static"
                    color="primary"
                >
                    <Toolbar>
                        <NavLink to="/">
                            <img
                                src="./img/themes/logo.png"
                                alt="Logo EterelZ"
                                className={classes.logo}
                            />
                        </NavLink>
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            indicatorColor="secondary"
                            textColor="inherit"
                            variant="fullWidth"
                            aria-label="full width tabs example"
                        >
                            <Tab label="Tournois / Event" {...a11yProps(0)} />
                            <Tab label="Les Streams" {...a11yProps(1)} />
                            <Tab label="Jeux" {...a11yProps(2)} />
                            <Tab label="La commu EterelZ" {...a11yProps(3)} />
                        </Tabs>
                        <MenuItem>
                            <NavLink to="/auth">
                                <IconButton
                                    aria-label="account of current user"
                                    aria-controls="primary-search-account-menu"
                                    aria-haspopup="true"
                                    color="inherit"
                                >
                                    <AccountCircleIcon/>
                                </IconButton>
                            </NavLink>
                        </MenuItem>
                    </Toolbar>
                </AppBar>
                <SwipeableViews
                    axis={props.theme === 'rtl' ? 'x-reverse' : 'x'}
                    index={value}
                    onChangeIndex={handleChangeIndex}
                >
                    <TabPanel value={value} index={0}>
                        Page descriptif tournoi / event
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        Page présentation Streamer, aperçu streamer en direct
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        Page Présentation des Jeux de la commu EterelZ
                    </TabPanel>
                    <TabPanel value={value} index={3}>
                        Page présentation commu EterelZ
                    </TabPanel>
                </SwipeableViews>
            </div>
        </>
    )
}
