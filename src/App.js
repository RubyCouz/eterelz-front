import React, {Component} from 'react'
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom'
import AuthPage from './pages/Auth'
import AuthContext from './context/auth-context'
import MainNavigation from './Components/Navigation/MainNavigation'
import EventsPage from './pages/Events'


import './App.css'

class App extends Component {
    state = {
        token: null,
        userId: null
    }

    login = (token, userId, tokenExpiration) => {
        this.setState({
            token: token,
            userId: userId
        })
    }

    logout = () => {
        this.setState({
            token: null,
            userId: null
        })
    }


    render() {
        return (
            <BrowserRouter>
                <AuthContext.Provider
                    value={{
                        token: this.state.token,
                        userId: this.state.userId,
                        login: this.login,
                        logout: this.logout
                    }}
                >
                    <MainNavigation/>
                        <main className="main-content">
                            <Switch>
                                {/*rdeirection vers connexion si deconnexion*/}
                                {!this.state.token && <Redirect from="/bookings" to="/auth" exact/>}
                                {/*redirection sur la page events en page d'accueil si le token de connexion est présent*/}
                                {this.state.token && <Redirect from="/" to="/events" exact/>}
                                {/*s'il y a token de connexion et tentative d'accès à la page de connexion => redirection vers la page events*/}
                                {this.state.token && <Redirect from="/auth" to="/events" exact/>}
                                {!this.state.token && <Route path="/auth" component={AuthPage}/>}
                                <Route path="/events" component={EventsPage}/>
                                {/*{this.state.token && <Route path="/bookings" component={BookingsPage}/>}*/}
                                {/*affichage par défaut de la connexion si le token de connexion n'est pas présent*/}
                                {!this.state.token && <Redirect to="/auth" exact/>}
                            </Switch>
                        </main>
                </AuthContext.Provider>
            </BrowserRouter>
        )
    }
}

export default App
