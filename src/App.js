import React, {useState, useEffect, useContext} from 'react'
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom'
import {ApolloProvider} from '@apollo/client'

import {
    ThemeProvider,
    createMuiTheme,
} from '@material-ui/core/styles'
import {
    blue,
    deepPurple,
    lightBlue,
    purple,
    red
} from '@material-ui/core/colors'
import { CssBaseline } from '@material-ui/core'

import './App.css'

import BackOffice from "./pages/BackOffice"
import HomePage from "./pages/Home"
import EventsPage from "./pages/Events"
import AuthPage from "./pages/Auth"
import AccountPage from "./pages/Account/Account"

import AuthContext from './context/auth-context'
import ThemeContext from './context/theme-context'
import {graphqlConfig} from './context/apollo-context'
import AvatarContext from './context/avatar-context'

export default function App() {
    const [state, setState] = useState({
        token: null,
        playload: null,
    })

    const [avatar, setAvatar] = useState({id: null})


    const login = (token, userId, userRole) => {
        if (token) {
            const arrayJWT = token.split('.')
            const playload = JSON.parse(window.atob(arrayJWT[1]))
            window.localStorage.setItem('token', token);
            console.log(playload.user_isDark)
            setDarkMode(playload.user_isDark)
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

    const [darkState, setDarkMode] = useState(false);
    const theme = createMuiTheme({
        palette: {
            type: darkState ? 'dark' : 'light',
            primary: {
                main: darkState ? purple[600] : blue[600]
            },
            secondary: {
                main: darkState ? lightBlue[600] : deepPurple[500]
            },
            status: {
                error: darkState ? red[600] : red[400]
            },
        }
    })

    const handleMode = () => {
        setDarkMode(!darkState)
    }

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
                <AvatarContext.Provider
                    value = {{
                        avatar: avatar,
                        setAvatar: setAvatar,
                    }}
                >
                    <ApolloProvider
                        client={graphqlConfig}
                    >
                        <ThemeContext.Provider
                            value={{
                                theme: handleMode,
                                darkMode: darkState
                            }}
                        >
                            <ThemeProvider theme={theme}>
                                <CssBaseline/>
                                <Switch>                                  
                                    {state.token ? [ 
                                        <Redirect from="/" to="/events" exact/>, /*redirection sur la page events en page d'accueil si le token de connexion est présent*/
                                        <Redirect from="/auth" to="/events" exact/>, /*s'il y a token de connexion et tentative d'accès à la page de connexion => redirection vers la page events*/
                                        <Redirect from="/home" to="/events" exact/>,
                                        <Route path="/account" component={AccountPage}/>,
                                        state.playload.userRole === "admin" && <Route path="/backOffice" component={BackOffice}/>
                                    ]:[
                                        <Redirect from="/account" to="/auth" exact/>,
                                        <Redirect from="/backOffice" to="/auth" exact/>,
                                        <Redirect from="/events" to="/home" exact/>,
                                        <Redirect from="/" to="/home" exact/>,
                                        <Route path="/home" component={HomePage}/>,
                                        <Route path="/auth" component={AuthPage}/>,
                                    ]}
                                    <Route path="/events" component={EventsPage}/>
                                </Switch>
                            </ThemeProvider>
                        </ThemeContext.Provider>
                    </ApolloProvider>
                </AvatarContext.Provider>
            </AuthContext.Provider>
        </BrowserRouter>
    )
}
