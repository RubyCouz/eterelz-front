import React, {useContext, useState} from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import clsx from 'clsx';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu'
import IconButton from "@material-ui/core/IconButton"
import {NavLink, Redirect, Route, Switch} from "react-router-dom"
import {
    AccountCircle as AccountCircleIcon,
    EventNoteTwoTone as EventNoteTwoToneIcon,
    ExitToAppTwoTone as ExitToAppTwoToneIcon
} from "@material-ui/icons";
import {createMuiTheme, CssBaseline, MenuItem, ThemeProvider} from "@material-ui/core"
import Toolbar from "@material-ui/core/Toolbar";
import AuthContext from "../../context/auth-context";
import ModeButton from '../ModeButton/ModeButton'

function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

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

export default function Navbar(props) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const [state, setState] = React.useState({
        left: false
    })
    const toggleDrawer = (anchor, open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return
        }

        setState({...state, [anchor]: open});
    }
    const list = (anchor) => (
        <div
            className={clsx(classes.list, {
                [classes.fullList]: anchor === 'top' || anchor === 'bottom',
            })}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <div className={classes.drawerHeader}>

            </div>
            <Divider/>
            <List color="secondary">
                {
                    auth.token &&
                    <>
                        {/*<ListItem button key="engagement">*/}
                        {/*    <ListItemIcon><AccountBoxTwoToneIcon/></ListItemIcon>*/}
                        {/*    <NavLink>Participation aux events</NavLink>*/}
                        {/*</ListItem>*/}
                        <ListItem button key="logout" onClick={auth.logout} className={classes.listItem}>
                            <ListItemIcon><ExitToAppTwoToneIcon/></ListItemIcon>
                            <ListItemText primary="Déconnexion"/>
                        </ListItem>
                    </>
                }
                {
                    (auth.token && auth.playload.userRole === 'admin') &&
                    <ListItem
                        button
                        key="backOffice"
                        component={NavLink}
                        to="/backOffice"
                        onClick={toggleDrawer(anchor, false)}
                        className={classes.listItem}
                    >
                        <ListItemIcon><EventNoteTwoToneIcon/></ListItemIcon>
                        <ListItemText primary="BackOffice"/>
                    </ListItem>
                }
                <ListItem
                    button
                    key="events"
                    component={NavLink}
                    to="/events"
                    onClick={toggleDrawer(anchor, false)}
                    className={classes.listItem}
                >
                    <ListItemIcon><EventNoteTwoToneIcon/></ListItemIcon>
                    <ListItemText primary="Events"/>
                </ListItem>
            </List>
        </div>
    )
    const handleChange = (event, newValue) => {
        setValue(newValue);
    }

    const handleChangeIndex = (index) => {
        setValue(index);
    }

    const auth = useContext(AuthContext)

    return (
        <>
            <ThemeProvider theme={props.theme}>
                <div className={classes.root}>
                    <CssBaseline/>
                    <AppBar
                        position="static"
                        color="primary"

                    >
                        <Toolbar>

                            <img
                                src="./img/themes/logo.png"
                                alt="Logo EterelZ"
                                className={classes.logo}
                            />
                            <Tabs
                                value={value}
                                onChange={handleChange}
                                indicatorColor="primary"
                                textColor="primary"
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
                            <MenuItem>
                                <ModeButton changeMode={props.changeMode}/>
                            </MenuItem>
                        </Toolbar>
                    </AppBar>
                    <SwipeableViews
                        axis={props.theme === 'rtl' ? 'x-reverse' : 'x'}
                        index={value}
                        onChangeIndex={handleChangeIndex}
                    >
                        <TabPanel value={value} index={0} dir={props.theme}>
                            Page descriptif tournoi / event
                        </TabPanel>
                        <TabPanel value={value} index={1} dir={props.theme}>
                            Page présentation Streamer, aperçu streamer en direct
                        </TabPanel>
                        <TabPanel value={value} index={2} dir={props.theme}>
                            Page Présentation des Jeux de la commu EterelZ
                        </TabPanel>
                        <TabPanel value={value} index={3} dir={props.theme}>
                            Page présentation commu EterelZ
                        </TabPanel>
                    </SwipeableViews>
                </div>
            </ThemeProvider>
        </>
    )
}
