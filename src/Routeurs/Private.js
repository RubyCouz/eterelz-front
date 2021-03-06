import React, {lazy, useContext} from 'react'
import {Navigate, Route, Routes, useLocation} from 'react-router-dom'
import AuthContext from '../context/auth-context'
import MemberIndex from "../pages/User/Index";

const Dashboard = lazy(() => import('../pages/Dashboard'))
const Account = lazy(() => import('../pages/Account/Account'))
const Tournaments = lazy(() => import('../pages/Tournaments'))
const Events = lazy(() => import('../pages/Events'))
const Clans = lazy(() => import('../pages/Clan'))
const Streams = lazy(() => import('../pages/Streams'))
const StreamUser = lazy(() => import('../pages/StreamUser'))
const BackOffice = lazy(() => import('../pages/Admin/BackOffice'))
const NoFound = lazy(() => import('../pages/NoFound'))
//
function UnRequiredAuth() {
    const auth = useContext(AuthContext)
    const location = useLocation()
    if (auth.token) {
        return <Navigate to="member" state={{from: location}} replace/>
    }
}

function RequiredRole() {
    const auth = useContext(AuthContext)
    const location = useLocation()
    if (auth.playload.userRole !== 'admin') {
        return <Navigate to="member" state={{from: location}} replace/>
    }
}

export default function Private() {

    return (
        <Routes>
            <Route path="member" element={<MemberIndex/>}>
                <Route index element={<Dashboard/>}/>
                <Route path="streams" element={<Streams/>}/>
                <Route path="clans" element={<Clans/>}/>
                <Route path="tournaments" element={<Tournaments/>}/>
                <Route path="events" element={<Events/>}/>
                <Route path="account" element={<Account/>}/>
                <Route path="streams_user" element={<StreamUser/>}/>
                <Route path="*" element={<NoFound/>}/>
                <Route path="404" element={<NoFound/>}/>
            </Route>
            <Route path="admin/" element={
                <RequiredRole>
                    <BackOffice/>
                </RequiredRole>
            }
            />
            {/*<Route path="/auth" element={<UnRequiredAuth/>}/>*/}
            {/*<Route path="/signup" element={<UnRequiredAuth/>}/>*/}
            {/*<Route path="/verifyAccount" element={<UnRequiredAuth/>}/>*/}
            {/*<Route path="/verifyAccount/:token" element={<UnRequiredAuth/>}/>*/}
            <Route path="/*" element={<UnRequiredAuth/>}/>
        </Routes>
    )
}
