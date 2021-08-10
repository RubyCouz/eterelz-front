import React, {useContext} from 'react'

import AuthContext from '../../context/auth-context'

import {Route, Redirect, Switch} from 'react-router-dom'

export default function Routeur({routes}) {

    const authContext = useContext(AuthContext)

    const token = authContext.token? true : false
    const roleJWT = authContext.playload ? authContext.playload.userRole : null

    
    let routeur = routes.map( ({auth, role, path, component, type, from, to}) =>{
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
                route = <Route path={path} component={component}/>
            } else if (auth) {
                route = <Redirect from={path} to="/auth" exact/>
            }
        } else if (type === "redirect"){
            if ( verifyAuth ){
                route =  <Redirect from={from} to={to} exact/>
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
