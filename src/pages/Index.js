import React, {useEffect, useState} from 'react'
import {BrowserRouter} from 'react-router-dom'

import {
    ThemeProvider,
    createTheme,
} from '@material-ui/core/styles'
import {
    CssBaseline, Typography,
} from '@material-ui/core'

import './Index.css'

import AuthContext from '../context/auth-context'
import ThemeContext from '../context/theme-context'

import AvatarContext from '../context/avatar-context'

import Routeur from '../Routeurs/Routeur'
import LoadingPage from '../pages/Loading'

import useThemeEterelz from '../Hook/useThemeEterelz'
import useAuth from '../Hook/useAuth'

export default function Index(props) {
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
                    <ThemeContext.Provider
                        value={{
                            theme: setTheme,
                        }}
                    >
                        <ThemeProvider theme={createTheme(theme)}>
                            <CssBaseline/>
                            <Typography>{JSON.stringify(props.authDate)}</Typography>
                            {
                                loading ?
                                    <LoadingPage />
                                :
                                    <Routeur/>
                            }
                        </ThemeProvider>
                    </ThemeContext.Provider>
                </AvatarContext.Provider>
            </AuthContext.Provider>
        </BrowserRouter>
    )
}
