import React, {useState, useEffect, useContext, useRef} from 'react'
import {BrowserRouter, Route, Redirect, Switch, NavLink} from 'react-router-dom'
import {ApolloProvider} from '@apollo/client'
import {graphqlConfig} from './context/apollo-context'




import HomePage from './pages/Home'
import AuthPage from './pages/Auth'
import AuthContext from './context/auth-context'
import MainNavigation from './Components/Navigation/MainNavigation'
import EventsPage from './pages/Events'
import BackOffice from './pages/BackOffice'
import Navbar from './Components/Navbar/Navbar'




import clsx from 'clsx';
import {} from '@material-ui/core/styles';
import { ThemeProvider, createMuiTheme, makeStyles, useTheme } from '@material-ui/core/styles'
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
import {Button, MenuItem} from "@material-ui/core";
import {AccountCircle} from "@material-ui/icons";

const theme = createMuiTheme({
    palette: {
      type: 'dark',
      primary: {
        main: '#272725',
      },
      secondary: {
        main: '#1A8BCD',
      },
      background: {
        default: '#272725',
      },
    },
  });
  
  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(4, 0, 0 , 0)
    },
  }));
  

export default function App() {
    const [state, setState] = useState({
        token: null,
        playload: null,
    })

    const login = (token, userId, userRole) => {
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

    console.log(state.playload)

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
                    <ThemeProvider theme={theme}>
                        <Navbar />

                        <div className={classes.root}>
                    
                            <main
                                className={classes.content}
                            >
                                <div className = { classes.toolbar } />
                                <Switch>
                                    {(!state.token && <Redirect from='/backOffice' to='/auth' exact/>)}
                                    {state.token && <Route path="/backOffice" component={BackOffice}/>   }
                                    {/*redirection vers connexion si deconnexion*/}
                                    {!state.token && <Redirect from="/bookings" to="/auth" exact/>}
                                    {/*redirection sur la page events en page d'accueil si le token de connexion est présent*/}
                                    {state.token && <Redirect from="/" to="/events" exact/>}
                                    {/*s'il y a token de connexion et tentative d'accès à la page de connexion => redirection vers la page events*/}
                                    {state.token && <Redirect from="/auth" to="/events" exact/>}
                                    {!state.token && <Route path="/home" component={HomePage}/>}
                                    <Route path="/events" component={EventsPage}/>
                                    <Route path="/auth" component={AuthPage}/>
                                    {/*{this.state.token && <Route path="/bookings" component={BookingsPage}/>}*/}
                                    {/*affichage par défaut de la connexion si le token de connexion n'est pas présent*/}
                                    {/*{!state.token && <Redirect to="/auth" exact/>}*/}
                                </Switch>
                            </main>
                        </div>


                        <main className="main-content">

                        </main>
                    </ThemeProvider>
                </ApolloProvider>
            </AuthContext.Provider>
        </BrowserRouter>
    )
}

