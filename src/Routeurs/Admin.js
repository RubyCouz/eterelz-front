import React, {lazy, useContext} from 'react'
import {Navigate, Route, Routes, useLocation} from 'react-router-dom'
import AuthContext from '../context/auth-context'
import AdminIndex from "../pages/User/Index";

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
    if (auth.token && auth.playload.userRole === 'admin') {
        return <Navigate to="admin/" state={{from: location}} replace/>
    }
}

export default function Private() {

    return (
        <Routes>
            <Route path="admin/" element={<AdminIndex/>}>
                <Route index element={<BackOffice/>}/>
                <Route path="dashboard" element={<Dashboard/>}/>
                <Route path="streams" element={<Streams/>}/>
                <Route path="clans" element={<Clans/>}/>
                <Route path="tournaments" element={<Tournaments/>}/>
                <Route path="events" element={<Events/>}/>
                <Route path="account" element={<Account/>}/>
                <Route path="streams_user" element={<StreamUser/>}/>
                <Route path="*" element={<NoFound/>}/>
                <Route path="404" element={<NoFound/>}/>
            </Route>
            />
            <Route path="/*" element={<UnRequiredAuth/>}/>
            <Route path="/member" element={<UnRequiredAuth/>}/>
        </Routes>
    )
}
