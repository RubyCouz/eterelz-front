import React, {useState, useEffect} from 'react'
import {BrowserRouter} from 'react-router-dom'
import {ApolloProvider} from '@apollo/client'

import {
    ThemeProvider,
    createMuiTheme,
} from '@material-ui/core/styles'
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

import Routeur from './pages/Routeur'

import useThemeEterelz from './Hook/useThemeEterelz'

export default function App() {
    const [state, setState] = useState({
        token: null,
        playload: null,
    })

    const [loading, setLoading] = useState(true)

    const [avatar, setAvatar] = useState({id: null})
    
    const [theme, setTheme] = useThemeEterelz()

    const login = (token, userId, userRole) => {
        if (token) {
            const arrayJWT = token.split('.')
            const playload = JSON.parse(window.atob(arrayJWT[1]))

            window.localStorage.setItem('token', token)

            let darkModeLS = window.localStorage.getItem('darkMode')
            setTheme(darkModeLS ? darkModeLS : playload.user_isDark)
            
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
                                theme: setTheme,
                            }}
                        >
                            <ThemeProvider theme={createMuiTheme(theme)}>
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
