import React, {lazy} from 'react'
import {Route, Redirect, Switch, BrowserRouter} from 'react-router-dom'

const HomePage = lazy(() => import('../pages/Home/Home'))
const AuthPage = lazy(() => import('../pages/Auth'))
const SignupPage = lazy(() => import('../pages/Signup'))
const NoFoundPage = lazy(() => import('../pages/NoFound'))
const ConfirmAccountPage = lazy(() => import('../pages/VerifyAccount'))
export default function Public() {
    console.log(process.env.PUBLIC_URL)
    return (
        <BrowserRouter>
            <Switch>
                <Redirect from={process.env.PUBLIC_URL + '/'} to={process.env.PUBLIC_URL + "/home"} exact/>
                <Route path={process.env.PUBLIC_URL + '/home'} component={HomePage}/>
                <Redirect from={process.env.PUBLIC_URL + '/account'} to={process.env.PUBLIC_URL + "/auth"} exact/>
                <Redirect from={process.env.PUBLIC_URL + '/tournaments'} to={process.env.PUBLIC_URL + "/auth"} exact/>
                <Redirect from={process.env.PUBLIC_URL + '/dashboard'} to={process.env.PUBLIC_URL + "/auth"} exact/>
                <Redirect from={process.env.PUBLIC_URL + '/events'} to={process.env.PUBLIC_URL + "/auth"} exact/>
                <Redirect from={process.env.PUBLIC_URL + '/clan'} to={process.env.PUBLIC_URL + "/auth"} exact/>
                <Redirect from={process.env.PUBLIC_URL + '/streams'} to={process.env.PUBLIC_URL + "/auth"} exact/>
                <Redirect from={process.env.PUBLIC_URL + '/backOffice'} to={process.env.PUBLIC_URL + "/auth"} exact/>
                <Route path={process.env.PUBLIC_URL + '/auth'} component={AuthPage}/>
                <Route path={process.env.PUBLIC_URL + '/signup'} component={SignupPage}/>
                <Route path={process.env.PUBLIC_URL + '/verifyAccount/:token'} component={ConfirmAccountPage}/>
                <Route path={process.env.PUBLIC_URL + '/verifyAccount/'} component={ConfirmAccountPage}/>
                <Route path={process.env.PUBLIC_URL + '/404'} component={NoFoundPage}/>
            </Switch>
        </BrowserRouter>
        // <Switch>
        //         <Redirect from={process.env.PUBLIC_URL + '/'} to={process.env.PUBLIC_URL + "/home"} exact/>
        //         <Route path={process.env.PUBLIC_URL + '/home'} component={HomePage}/>
        //         <Redirect from={process.env.PUBLIC_URL + '/account'} to={process.env.PUBLIC_URL + "/auth"} exact/>
        //         <Redirect from={process.env.PUBLIC_URL + '/tournaments'} to={process.env.PUBLIC_URL + "/auth"} exact/>
        //         <Redirect from={process.env.PUBLIC_URL + '/dashboard'} to={process.env.PUBLIC_URL + "/auth"} exact/>
        //         <Redirect from={process.env.PUBLIC_URL + '/events'} to={process.env.PUBLIC_URL + "/auth"} exact/>
        //         <Redirect from={process.env.PUBLIC_URL + '/clan'} to={process.env.PUBLIC_URL + "/auth"} exact/>
        //         <Redirect from={process.env.PUBLIC_URL + '/streams'} to={process.env.PUBLIC_URL + "/auth"} exact/>
        //         <Redirect from={process.env.PUBLIC_URL + '/backOffice'} to={process.env.PUBLIC_URL + "/auth"} exact/>
        //         <Route path={process.env.PUBLIC_URL + '/auth'} component={AuthPage}/>
        //         <Route path={process.env.PUBLIC_URL + '/signup'} component={SignupPage}/>
        //         <Route path={process.env.PUBLIC_URL + '/verifyAccount/:token'} component={ConfirmAccountPage}/>
        //         <Route path={process.env.PUBLIC_URL + '/verifyAccount/'} component={ConfirmAccountPage}/>
        //         <Route path={process.env.PUBLIC_URL + '/404'} component={NoFoundPage}/>
        // </Switch>
    )
}
