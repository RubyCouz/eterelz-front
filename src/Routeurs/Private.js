import React, {lazy, useContext} from 'react'
import {Route, Redirect, Switch} from 'react-router-dom'
import AuthContext from '../context/auth-context'
const DashboardPage = lazy(() => import('../pages/Dashboard'))
const AccountPage = lazy(() => import('../pages/Account/Account'))
const TournamentsPage = lazy(() => import('../pages/Tournaments'))
const EventsPage = lazy(() => import('../pages/Events'))
const ClansPage = lazy(() => import('../pages/Clan'))
const StreamsPage = lazy(() => import('../pages/Streams'))
const StreamUser = lazy(() => import('../pages/StreamUser'))
const BackOfficePage = lazy(() => import('../pages/BackOffice'))
const NoFoundPage = lazy(() => import('../pages/NoFound'))

export default function Private() {

    const authContext = useContext(AuthContext)
    const role = authContext.playload ? authContext.playload.userRole : null
    
    return (
        <Switch>
            {
                role === 'admin' ?
                    <Route path={process.env.PUBLIC_URL + '/backOffice'} component={BackOfficePage} />
                :
                    <Redirect from={process.env.PUBLIC_URL + '/backOffice'} to={process.env.PUBLIC_URL + "/dashboard"} exact/>
            }
            <Redirect from={process.env.PUBLIC_URL + '/'} to={process.env.PUBLIC_URL + "/dashboard"} exact/>
            <Redirect from={process.env.PUBLIC_URL + '/auth'} to={process.env.PUBLIC_URL + "/dashboard"} exact/>
            <Redirect from={process.env.PUBLIC_URL + '/home'} to={process.env.PUBLIC_URL + "/dashboard"} exact/>
            <Redirect from={process.env.PUBLIC_URL + '/signup'} to={process.env.PUBLIC_URL + "/dashboard"} exact/>
            <Route path={process.env.PUBLIC_URL + '/dashboard'} component={DashboardPage} />
            <Route path={process.env.PUBLIC_URL + '/account'} component={AccountPage} />
            <Route path={process.env.PUBLIC_URL + '/tournaments'} component={TournamentsPage} />
            <Route path={process.env.PUBLIC_URL + '/events'} component={EventsPage} />
            <Route path={process.env.PUBLIC_URL + '/clan'} component={ClansPage} />
            <Route path={process.env.PUBLIC_URL + '/streams/:login'} component={StreamUser} />
            <Route path={process.env.PUBLIC_URL + '/streams'} component={StreamsPage} />
            <Route path={process.env.PUBLIC_URL + '/404'} component={NoFoundPage} />
        </Switch>
    )
}
