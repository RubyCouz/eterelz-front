import React, {useState, useEffect, useContext} from 'react'
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom'
import {ApolloProvider} from '@apollo/client'
import {graphqlConfig} from './context/apollo-context'
import AuthContext from './context/auth-context'
import Navbar from './Components/Navbar/Navbar'

import {
    ThemeProvider,
    createMuiTheme,
    makeStyles
} from '@material-ui/core/styles'


import './App.css'
import BackOffice from "./pages/BackOffice";
import HomePage from "./pages/Home";
import EventsPage from "./pages/Events";
import AuthPage from "./pages/Auth";
import {blue, deepPurple, lightBlue, purple, red} from "@material-ui/core/colors";

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
                    <Switch>
                        {/*{(!auth.token && <Redirect from="/backOffice" to="/auth" exact/>)}*/}
                        {auth.token && <Route path="/backOffice" component={BackOffice}/>}
                        {/*redirection vers connexion si deconnexion*/}
                        {!auth.token && <Redirect from="/bookings" to="/auth" exact/>}
                        {/*redirection sur la page events en page d'accueil si le token de connexion est présent*/}
                        {auth.token && <Redirect from="/" to="/events" exact/>}
                        {/*s'il y a token de connexion et tentative d'accès à la page de connexion => redirection vers la page events*/}
                        {auth.token && <Redirect from="/auth" to="/events" exact/>}
                        {/*{!auth.token && <Redirect from="/events" to="/home" exact/>}*/}
                        {!auth.token && <Route path="/home" component={HomePage}/>}
                        {!auth.token && <Redirect from="/" to="/home" exact/>}

                        <Route path="/events" component={EventsPage}/>
                        <Route path="/auth" component={AuthPage}/>
                        {/*{this.state.token && <Route path="/bookings" component={BookingsPage}/>}*/}
                        {/*affichage par défaut de la connexion si le token de connexion n'est pas présent*/}
                        {/*{!state.token && <Redirect to="/auth" exact/>}*/}
                    </Switch>
                </ApolloProvider>
            </AuthContext.Provider>
        </BrowserRouter>
    )
}
