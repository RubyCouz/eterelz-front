import React, {lazy, useContext} from 'react'
import {Navigate, Route, Routes, useLocation} from 'react-router-dom'
import AuthContext from '../context/auth-context'
import Index from '../pages/Index'

const HomePage = lazy(() => import ('../pages/Home/Home'))
const AuthPage = lazy(() => import ('../pages/Auth'))
const SignupPage = lazy(() => import ('../pages/Signup'))
const NoFoundPage = lazy(() => import ('../pages/NoFound'))
const ConfirmAccountPage = lazy(() => import ('../pages/VerifyAccount'))

function RequiredAuth() {
    const auth = useContext(AuthContext)
    const location = useLocation()
    if (!auth.token) {
        return <Navigate to="/auth" state={{from: location}} replace/>
    }
}
export default function Public() {
    return (
        <Routes>
            <Route path="/" element={<Index/>}>
                <Route index element={<HomePage/>}/>
                <Route path="/auth" element={<AuthPage/>}/>
                <Route path="/signup" element={<SignupPage/>}/>
                <Route path="/verifyAccount/:token" element={<ConfirmAccountPage/>}/>
                <Route path="/verifyAccount" element={<ConfirmAccountPage/>}/>
                <Route path="/404" element={<NoFoundPage/>}/>
                <Route path="/*" element={<NoFoundPage/>}/>
            </Route>
            <Route path="/member" element={<RequiredAuth/>}/>
            <Route path="/admin" element={<RequiredAuth/>}/>

        </Routes>
    )
}
