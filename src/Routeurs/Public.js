import React, {lazy} from 'react'
import {Route, Redirect, Switch, BrowserRouter} from 'react-router-dom'

const HomePage = lazy(() => import('../pages/Home/Home'))
const AuthPage = lazy(() => import('../pages/Auth'))
const SignupPage = lazy(() => import('../pages/Signup'))
const NoFoundPage = lazy(() => import('../pages/NoFound'))
const ConfirmAccountPage = lazy(() => import('../pages/VerifyAccount'))
export default function Public() {
        return (
        <BrowserRouter>
            <Switch>
                <Redirect from={'/'} to={"/home"} exact/>
                <Route path={'/home'} component={HomePage}/>
                <Redirect from={'/account'} to={"/auth"} exact/>
                <Redirect from={'/tournaments'} to={"/auth"} exact/>
                <Redirect from={'/dashboard'} to={"/auth"} exact/>
                <Redirect from={'/events'} to={"/auth"} exact/>
                <Redirect from={'/clan'} to={"/auth"} exact/>
                <Redirect from={'/streams'} to={"/auth"} exact/>
                <Redirect from={'/backOffice'} to={"/auth"} exact/>
                <Route path={'/auth'} component={AuthPage}/>
                <Route path={'/signup'} component={SignupPage}/>
                <Route path={'/verifyAccount/:token'} component={ConfirmAccountPage}/>
                <Route path={'/verifyAccount/'} component={ConfirmAccountPage}/>
                <Route path={'/404'} component={NoFoundPage}/>
            </Switch>
        </BrowserRouter>
        // <Switch>
        //         <Redirect from={'/'} to={"/home"} exact/>
        //         <Route path={'/home'} component={HomePage}/>
        //         <Redirect from={'/account'} to={"/auth"} exact/>
        //         <Redirect from={'/tournaments'} to={"/auth"} exact/>
        //         <Redirect from={'/dashboard'} to={"/auth"} exact/>
        //         <Redirect from={'/events'} to={"/auth"} exact/>
        //         <Redirect from={'/clan'} to={"/auth"} exact/>
        //         <Redirect from={'/streams'} to={"/auth"} exact/>
        //         <Redirect from={'/backOffice'} to={"/auth"} exact/>
        //         <Route path={'/auth'} component={AuthPage}/>
        //         <Route path={'/signup'} component={SignupPage}/>
        //         <Route path={'/verifyAccount/:token'} component={ConfirmAccountPage}/>
        //         <Route path={'/verifyAccount/'} component={ConfirmAccountPage}/>
        //         <Route path={'/404'} component={NoFoundPage}/>
        // </Switch>
    )
}
