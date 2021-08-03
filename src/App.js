import React, {useState, useEffect, useContext} from 'react'
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom'
import {ApolloProvider} from '@apollo/client'
import {graphqlConfig} from './context/apollo-context'
import AuthContext from './context/auth-context'
import ThemeContext from './context/theme-context'
import {
    ThemeProvider,
    createMuiTheme,
} from '@material-ui/core/styles'
import './App.css'
import BackOffice from "./pages/BackOffice"
import HomePage from "./pages/Home"
import EventsPage from "./pages/Events"
import AuthPage from "./pages/Auth"
import AccountPage from "./pages/Account/Account"
import {blue, deepPurple, lightBlue, purple, red} from "@material-ui/core/colors"

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

    const auth = useContext(AuthContext)
    const [darkState, setDarkMode] = useState(true);
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
                <ApolloProvider
                    client={graphqlConfig}
                >
                    <ThemeContext.Provider
                        value={{
                            theme:handleMode
                        }}
                    >
                        <ThemeProvider theme={theme}>
                            <Switch>
                                {(!state.token && <Redirect from="/backOffice" to="/auth" exact/>)}
                                <Route path="/backOffice" component={BackOffice}/>
                                {/*redirection vers connexion si deconnexion*/}
                                {!state.token && <Redirect from="/backoffice" to="/auth" exact/>}
                                {!state.token && <Redirect from="/bookings" to="/auth" exact/>}
                                {/*redirection sur la page events en page d'accueil si le token de connexion est présent*/}
                                {state.token && <Redirect from="/" to="/events" exact/>}
                                {/*s'il y a token de connexion et tentative d'accès à la page de connexion => redirection vers la page events*/}
                                {state.token && <Redirect from="/auth" to="/events" exact/>}
                                {state.token && <Route path="/account" component={AccountPage}/>}
                                {state.token && <Redirect from="/home" to="/events" exact/>}
                                {!state.token && <Redirect from="/events" to="/home" exact/>}
                                {!state.token && <Route path="/home" component={HomePage}/>}
                                {!state.token && <Redirect from="/" to="/home" exact/>}
                                <Route path="/events" component={EventsPage}/>

                                <Route path="/auth" component={AuthPage}/>
                                {/*{this.state.token && <Route path="/bookings" component={BookingsPage}/>}*/}
                                {/*affichage par défaut de la connexion si le token de connexion n'est pas présent*/}
                                {/*{!state.token && <Redirect to="/auth" exact/>}*/}
                            </Switch>
                        </ThemeProvider>
                    </ThemeContext.Provider>


                </ApolloProvider>
            </AuthContext.Provider>
        </BrowserRouter>
    )
}
