import React, {useState} from 'react'
import {BrowserRouter} from 'react-router-dom'
import {ApolloProvider} from '@apollo/client'
import {
    ThemeProvider,
    createTheme,
} from '@material-ui/core/styles'
import {
    CssBaseline,
} from '@material-ui/core'
import './Index.css'
import AuthContext from '../context/auth-context'
import {graphqlConfig} from '../context/apollo-context'
import AvatarContext from '../context/avatar-context'
import Routeur from '../Routeurs/Routeur'
import LoadingPage from '../pages/Loading'
import useAuth from '../Hook/useAuth'

export default function Index() {

    const [auth, login, logout, loading] = useAuth()

    const [avatar, setAvatar] = useState({id: null})

    const theme = createTheme({
        palette: {
            type: 'dark',
        },
    });

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
                            <ThemeProvider theme={theme}>
                                <CssBaseline/>
                                {
                                    loading ?
                                        <LoadingPage />
                                    :
                                        <Routeur/>
                                }
                            </ThemeProvider>
                    </ApolloProvider>
                </AvatarContext.Provider>
            </AuthContext.Provider>
        </BrowserRouter>
    )
}
