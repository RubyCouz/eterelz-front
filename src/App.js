import React, {useState, useEffect, useContext, useRef} from 'react'
import {BrowserRouter, Route, Redirect, Switch, NavLink} from 'react-router-dom'
import AuthPage from './pages/Auth'
import AuthContext from './context/auth-context'
import MainNavigation from './Components/Navigation/MainNavigation'
import EventsPage from './pages/Events'
import {ApolloProvider} from '@apollo/client'
import {graphqlConfig} from './context/apollo-context'

import clsx from 'clsx';
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
import AccountBoxTwoToneIcon from '@material-ui/icons/AccountBoxTwoTone';
import EventNoteTwoToneIcon from '@material-ui/icons/EventNoteTwoTone';
import ExitToAppTwoToneIcon from '@material-ui/icons/ExitToAppTwoTone';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

import './App.css'
import {Button} from "@material-ui/core";

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

export default function App() {
    const [state, setState] = useState({
        token: null,
        playload: null
    })

    const login = (token) => {
        if (token) {
            const arrayJWT = token.split('.')
            const playload = JSON.parse(window.atob(arrayJWT[1]))
            window.localStorage.setItem('token', token);

            setState({
                token: token,
                playload: playload,
            })
        }
    }

    const logout = () => {
        window.localStorage.removeItem('token');
        setState({
            token: null,
            playload: null
        })
    }

    useEffect(() => {
        const tokenStorage = window.localStorage.getItem('token');
        login(tokenStorage)
    }, [])

    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };


    return (
        <BrowserRouter>
            <AuthContext.Provider
                value={{
                    token: state.token,
                    playload: state.playload,
                    login: login,
                    logout: logout
                }}
            >
                <ApolloProvider client={graphqlConfig}>
                    <MainNavigation/>

                    <div className={classes.root}>
                        <CssBaseline />
                        <AppBar
                            position="fixed"
                            className={clsx(classes.appBar, {
                                [classes.appBarShift]: open,
                            })}
                        >
                            <Toolbar>
                                <IconButton
                                    color="inherit"
                                    aria-label="open drawer"
                                    onClick={handleDrawerOpen}
                                    edge="start"
                                    className={clsx(classes.menuButton, open && classes.hide)}
                                >
                                    <MenuIcon />
                                </IconButton>
                                <Typography variant="h6" noWrap>
                                    Persistent drawer
                                </Typography>
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
                                <IconButton onClick={handleDrawerClose}>
                                    {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                                </IconButton>
                            </div>
                            <Divider />
                            <List>
                                {!state.token &&
                                <ListItem button key="auth">
                                    <ListItemIcon><AccountBoxTwoToneIcon/></ListItemIcon>
                                    <NavLink to="/auth">Connexion</NavLink>
                                </ListItem>
                                }
                                {state.token &&
                                    <React.Fragment>
                                        {/*<ListItem button key="engagement">*/}
                                        {/*    <ListItemIcon><AccountBoxTwoToneIcon/></ListItemIcon>*/}
                                        {/*    <NavLink>Participation aux events</NavLink>*/}
                                        {/*</ListItem>*/}
                                        <ListItem button key="logout">
                                            <ListItemIcon><ExitToAppTwoToneIcon/></ListItemIcon>
                                            <ListItemText primary="Déconnexion" onClick={logout}/>
                                        </ListItem>
                                    </React.Fragment>

                                }
                                <ListItem button key="events">
                                    <ListItemIcon><EventNoteTwoToneIcon/></ListItemIcon>
                                    <NavLink to="/events">Events</NavLink>
                                </ListItem>

                            </List>
                            <Divider />
                        </Drawer>
                        <main
                            className={clsx(classes.content, {
                                [classes.contentShift]: open,
                            })}
                        >
                            <div className={classes.drawerHeader} />
                            <Switch>
                                {/*rdeirection vers connexion si deconnexion*/}
                                {!state.token && <Redirect from="/bookings" to="/auth" exact/>}
                                {/*redirection sur la page events en page d'accueil si le token de connexion est présent*/}
                                {state.token && <Redirect from="/" to="/events" exact/>}
                                {/*s'il y a token de connexion et tentative d'accès à la page de connexion => redirection vers la page events*/}
                                {state.token && <Redirect from="/auth" to="/events" exact/>}
                                {!state.token && <Route path="/auth" component={AuthPage}/>}
                                <Route path="/events" component={EventsPage}/>
                                {/*{this.state.token && <Route path="/bookings" component={BookingsPage}/>}*/}
                                {/*affichage par défaut de la connexion si le token de connexion n'est pas présent*/}
                                {!state.token && <Redirect to="/auth" exact/>}
                            </Switch>
                        </main>
                    </div>
                    );


                    <main className="main-content">

                    </main>
                </ApolloProvider>
            </AuthContext.Provider>
        </BrowserRouter>
    )
}

