import React, {useEffect, useState} from 'react'
import {BrowserRouter} from 'react-router-dom'
import {ApolloProvider} from '@apollo/client'

import {
    ThemeProvider,
    createMuiTheme,
} from '@material-ui/core/styles'
import {
    CssBaseline,
} from '@material-ui/core'

import './Index.css'

import AuthContext from '../context/auth-context'
import ThemeContext from '../context/theme-context'
import {graphqlConfig} from '../context/apollo-context'
import AvatarContext from '../context/avatar-context'

import Routeur from '../Routeurs/Routeur'
import LoadingPage from '../pages/Loading'

import useThemeEterelz from '../Hook/useThemeEterelz'
import useAuth from '../Hook/useAuth'

export default function Index() {

    const [auth, login, logout, loading] = useAuth()

    const [avatar, setAvatar] = useState({id: null})
    
    const [theme, setTheme] = useThemeEterelz()

    useEffect(() => {
        let darkModeLS = window.localStorage.getItem('darkMode')
        darkModeLS !== 'null' && setTheme(darkModeLS)
    }, [login, logout, setTheme])



    return (
        <BrowserRouter>
            <AuthContext.Provider
                value={{
                    token: auth.token,
                    playload: auth.playload,
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
                                        <LoadingPage />
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
