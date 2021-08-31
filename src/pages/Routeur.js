import React, {useContext} from 'react'

import AuthContext from '../context/auth-context'

import {Route, Redirect, Switch} from 'react-router-dom'

import DataRouteur from '../Data/template-routes'

export default function Routeur() {

    const authContext = useContext(AuthContext)

    const token = authContext.token? true : false
    const roleJWT = authContext.playload ? authContext.playload.userRole : null

    
    const routeur = DataRouteur.map( ({auth, role, path, component, type, from, to}, index) =>{
        let verifyAuth = false
        
        if (typeof auth === 'boolean') {
            verifyAuth = auth === token
        }

        let verifyRole = false

        if (role) {
            verifyRole = role === roleJWT
        } else {
            verifyRole = true
        }

        let route

        if (type === "route") {
            if (verifyRole && verifyAuth ){
                route = <Route path={process.env.PUBLIC_URL + path} component={component} key={index} />
            } else  {
                if (auth) {
                    route = <Redirect from={process.env.PUBLIC_URL + path} to={process.env.PUBLIC_URL + "/auth"} key={index} exact/>
                } else {
                    route = <Redirect from={process.env.PUBLIC_URL + path} to={process.env.PUBLIC_URL + "/dashboard"} key={index} exact/>
                }
            }
        } else if (type === "redirect"){
            if ( verifyAuth ){
                route =  <Redirect from={process.env.PUBLIC_URL + from} to={process.env.PUBLIC_URL + to} key={index} exact/>
            }
        }

        

        return route
    })
    return (
        <Switch>
            <Redirect from="/" to="home" exact/>
            
            {routeur}
        </Switch>
    )

}
