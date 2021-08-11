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
import {
    CssBaseline,
    CircularProgress,
    Box,
} from '@material-ui/core'

import './App.css'

import AuthContext from './context/auth-context'
import ThemeContext from './context/theme-context'
import {graphqlConfig} from './context/apollo-context'
import AvatarContext from './context/avatar-context'

import Routeur from './Components/Routeur/Routeur'

export default function App() {
    const [state, setState] = useState({
        token: null,
        playload: null,
    })

    const [loading, setLoading] = useState(true)

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
        setLoading(false)
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
                                {
                                    loading ?
                                        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                                            <CircularProgress />
                                        </Box>
                                    :
                                        <Routeur/>
                                }
                            </ThemeProvider>
                        </ThemeContext.Provider>
                    </ApolloProvider>
                </AvatarContext.Provider>
            </AuthContext.Provider>
        </BrowserRouter>
    )
}

