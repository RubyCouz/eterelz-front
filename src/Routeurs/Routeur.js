import React, {useContext} from 'react'
import AuthContext from '../context/auth-context'
import PublicRouteur from './Public'
import PrivateRouteur from './Private'
import AdminRouteur from './Admin'

export default function Routeur() {

    const auth = useContext(AuthContext)
    let isActive
    let role
    if (auth.playload !== null) {
        isActive = auth.playload.is_active
        role = auth.playload.userRole
    }
    const token = auth.token

    return (
        <>
            {
                token ?
                    isActive ?
                        role === 'admin' ?
                            <AdminRouteur/> :
                            <PrivateRouteur/>
                        :
                        <PublicRouteur/>
                    :
                    <PublicRouteur/>
            }
        </>
    )
}
