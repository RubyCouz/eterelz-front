import React, {useState, useEffect} from 'react'
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom'
import {ApolloProvider} from '@apollo/client'
import {graphqlConfig} from './context/apollo-context'




import HomePage from './pages/Home'
import AuthPage from './pages/Auth'
import AuthContext from './context/auth-context'
import EventsPage from './pages/Events'
import BackOffice from './pages/BackOffice'
import Navbar from './Components/Navbar/Navbar'

import {
    ThemeProvider,
    createMuiTheme,
    makeStyles
} from '@material-ui/core/styles'


import './App.css'

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
      padding: theme.spacing(0, 1),
      ...theme.mixins.toolbar,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(0, 0, 0 , 0)
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
                <ApolloProvider
                    client={graphqlConfig}
                >
                    <ThemeProvider
                        theme={theme}
                    >
                        <Navbar />
                        <div
                            className={classes.root}
                        >
                            <main
                                className={classes.content}
                            >
                                <div
                                    className = { classes.toolbar }
                                />

                            </main>
                        </div>
                    </ThemeProvider>
                </ApolloProvider>
            </AuthContext.Provider>
        </BrowserRouter>
    )
}
