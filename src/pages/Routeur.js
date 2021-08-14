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
                route = <Route path={path} component={component} key={index} />
            } else if (auth) {
                route = <Redirect from={path} to="/auth" key={index} exact/>
            }
        } else if (type === "redirect"){
            if ( verifyAuth ){
                route =  <Redirect from={from} to={to} key={index} exact/>
            }
        }

        

        return route
    }).filter(function(x) {
        return x !== undefined
    })


    return (
        <Switch>{routeur}</Switch>
    )

}
