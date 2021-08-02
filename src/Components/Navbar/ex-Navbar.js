import React, {useContext, useEffect, useState} from 'react';
import clsx from 'clsx';
import { Paper, createMuiTheme, ThemeProvider } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import {MenuItem} from "@material-ui/core";
import {
    AccountCircle as AccountCircleIcon,
    EventNoteTwoTone as EventNoteTwoToneIcon,
    ExitToAppTwoTone as ExitToAppTwoToneIcon
} from "@material-ui/icons";
import AuthContext from '../../context/auth-context'
import BackOffice from "../../pages/BackOffice";
import HomePage from "../../pages/Home";
import EventsPage from "../../pages/Events";
import AuthPage from "../../pages/Auth";
import {NavLink} from 'react-router-dom'
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom'
import Switche from '@material-ui/core/Switch';
import {blue, deepPurple, lightBlue, purple, red} from "@material-ui/core/colors";
const drawerWidth = 240;




const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    logo: {
        width: '150px',
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
}));

export default function PersistentDrawerLeft() {

// création state darkmode
    const [darkState, setDarkMode] = useState(false);

    const palletType = darkState ? "dark" : "light"
    const mainPrimaryColor = darkState ? purple[600] : blue[600]
    const mainSecondaryColor = darkState ? lightBlue[600] : deepPurple[500]
    const mainErrorColor = darkState ? red[600] : red[400]
    const theme = createMuiTheme({
        palette: {
            type: palletType,
            primary: {
                main: mainPrimaryColor
            },
            secondary: {
                main: mainSecondaryColor
            },
            status: {
                error: mainErrorColor
            },
        }
    })

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleMode = () => {
        setDarkMode(!darkState)
    }

    const handleDrawerClose = () => {
        setOpen(false);
    };
    const auth = useContext(AuthContext)
    return (
        <>

            <ThemeProvider
                theme={theme}
            >
                <div className={classes.root}>
                    <CssBaseline />
                    <AppBar
                        color="primary"
                        position="fixed"
                        className={clsx(classes.appBar, {
                            [classes.appBarShift]: open,
                        })}
                    >
                        <Toolbar>
                            <IconButton
                                color = "inherit"
                                aria-label = "open drawer"
                                onClick = {handleDrawerOpen}
                                edge = "start"
                                className = {
                                    clsx(classes.menuButton, {
                                        [classes.hide]: open,
                                    })
                                }
                            >
                                <MenuIcon/>
                            </IconButton>
                            <img
                                src="./img/themes/logo.png"
                                alt="Logo EterelZ"
                                className={classes.logo}
                            />
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
                    <Drawer
                        className={classes.drawer}
                        variant="persistent"
                        anchor="left"
                        open={open}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                    >
                        <div className={classes.drawerHeader}>

                            <Switche
                                onChange={handleMode}
                                defaultChecked
                                color="default"
                                inputProps={{ 'aria-label': 'checkbox with default color' }}
                            />

                            <IconButton onClick={handleDrawerClose}>
                                {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                            </IconButton>

                        </div>
                        <Divider />
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
                                    onClick={handleDrawerClose}
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
                                onClick={handleDrawerClose}
                                className={classes.listItem}
                            >
                                <ListItemIcon><EventNoteTwoToneIcon/></ListItemIcon>
                                <ListItemText primary="Events"/>
                            </ListItem>
                        </List>
                    </Drawer>



                    <main
                        className={clsx(classes.content, {
                            [classes.contentShift]: open,
                        })}
                    >
                        <div className={classes.drawerHeader} />
                        <Switch>
                            {(!auth.token && <Redirect from='/backOffice' to='/auth' exact/>)}
                            {auth.token && <Route path="/backOffice" component={BackOffice}/>   }
                            {/*redirection vers connexion si deconnexion*/}
                            {!auth.token && <Redirect from="/bookings" to="/auth" exact/>}
                            {/*redirection sur la page events en page d'accueil si le token de connexion est présent*/}
                            {auth.token && <Redirect from="/" to="/events" exact/>}
                            {/*s'il y a token de connexion et tentative d'accès à la page de connexion => redirection vers la page events*/}
                            {auth.token && <Redirect from="/auth" to="/events" exact/>}
                            {!auth.token && <Route path="/home" component={HomePage}/>}
                            <Route path="/events" component={EventsPage}/>
                            <Route path="/auth" component={AuthPage}/>
                            {/*{this.state.token && <Route path="/bookings" component={BookingsPage}/>}*/}
                            {/*affichage par défaut de la connexion si le token de connexion n'est pas présent*/}
                            {/*{!state.token && <Redirect to="/auth" exact/>}*/}
                        </Switch>
                    </main>
                </div>
            </ThemeProvider>

        </>
    );
}
