import React, {Suspense, useState, useEffect} from 'react'
import Loading from './pages/Loading'
import AuthContext from './context/auth-context'
import AvatarContext from './context/avatar-context'
import {ApolloProvider} from '@apollo/client'
import {graphqlConfig} from './context/apollo-context'
import {createTheme, ThemeProvider} from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import LoadingPage from './pages/Loading'
import Routeur from './Routeurs/Routeur'
import useAuth from './Hook/useAuth'
import {socket, SocketContext} from './context/socket-context'


// const Index = lazy(() => import('./pages/Index'))

export default function App() {
    let [crate] = useState()
    const widget = async (crate) => {
        let result = await import('@widgetbot/crate')
        const Crate = await result.cdn();

        crate = new Crate({
            server: '326099902037884940',
            channel: '670890139438022687',
            location: ['bottom', 'right'],
            notifications: true,
            indicator: true,
        })
    }
    useEffect(() => {
        widget(crate)
    }, [crate]
    )
    const [auth, login, logout, loading] = useAuth()
    const [avatar, setAvatar] = useState({id: null})
    const theme = createTheme({
        palette: {
            mode: 'dark',
        },
    });
    return (
        <AuthContext.Provider
            value={{
                token: auth.token,
                playload: auth.playload,
                login: login,
                logout: logout
            }}
        >
            <SocketContext.Provider value={socket}>
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
                                    <Suspense fallback={<Loading/>}>
                                        {crate}
                                        <Routeur/>
                                    </Suspense>
                            }
                        </ThemeProvider>
                    </ApolloProvider>
                </AvatarContext.Provider>
            </SocketContext.Provider>
        </AuthContext.Provider>




    )
}