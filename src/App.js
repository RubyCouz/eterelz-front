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

import BackOffice from './pages/BackOffice'
import HomePage from './pages/Home'
import EventsPage from './pages/Events'
import AuthPage from './pages/Auth'
import AccountPage from './pages/Account/Account'
import Dashboard from './pages/Dashboard'
import Tournaments from './pages/Tournaments'
import Clan from './pages/Clan'

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

            window.localStorage.setItem('token', token)

            let darkModeLS = window.localStorage.getItem('darkMode')
            handleMode(darkModeLS ? darkModeLS : playload.user_isDark)
            
            setState({
                token: token,
                playload: playload,
            })
        }

    }

    const logout = () => {
        window.localStorage.removeItem('token')
        window.localStorage.removeItem('darkMode')

        setState({
            token: null,
            playload: null
        })
    }

    useEffect(() => {
        const tokenStorage = window.localStorage.getItem('token');
        login(tokenStorage)
    }, [])

    const [darkState, setDarkMode] = useState(false)
    
    const dark = createMuiTheme({
        palette: {
            type: 'dark',
            primary: {
                main: purple[600]
            },
            secondary: {
                main:lightBlue[600]
            },
            status: {
                error:red[600]
            },
        }
    })
    
    const light = createMuiTheme({
        palette: {
            type: 'light',
            primary: {
                main: blue[600]
            },
            secondary: {
                main: deepPurple[500]
            },
            status: {
                error: red[400]
            },
        }
    })

    const handleMode = (boolean) => {
        let booleanDarkMode = boolean
        if (typeof booleanDarkMode === 'string') {
            booleanDarkMode = (boolean === 'true')
        }

        setDarkMode(booleanDarkMode)
        window.localStorage.setItem('darkMode', booleanDarkMode)
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
                            <ThemeProvider theme={darkState ? dark : light}>
                                <CssBaseline/>
                                <Switch>                                  
                                    {state.token ? [ 
                                        <Redirect from="/" to="/events" exact/>, /*redirection sur la page events en page d'accueil si le token de connexion est présent*/
                                        <Redirect from="/auth" to="/dashboard" exact/>, /*s'il y a token de connexion et tentative d'accès à la page de connexion => redirection vers la page events*/
                                        <Redirect from="/home" to="/dashboard" exact/>,
                                        <Route path="/account" component={AccountPage}/>,
                                        state.playload.userRole === "admin" && <Route path="/backOffice" component={BackOffice}/>
                                    ]:[
                                        <Redirect from="/tournaments" to="/auth" exact/>,
                                        <Redirect from="/account" to="/auth" exact/>,
                                        <Redirect from="/backOffice" to="/auth" exact/>,
                                        <Redirect from="/events" to="/auth" exact/>,
                                        <Redirect from="/dashboard" to="/auth" exact/>,
                                        <Redirect from="/" to="/home" exact/>,
                                        <Redirect from="/clan" to="/auth" exact/>,
                                        <Route path="/home" component={HomePage}/>,
                                        <Route path="/auth" component={AuthPage}/>,
                                    ]}
                                    <Route path="/clan" component={Clan}/>
                                    <Route path="/tournaments" component={Tournaments}/>
                                    <Route path="/dashboard" component={Dashboard}/>
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
