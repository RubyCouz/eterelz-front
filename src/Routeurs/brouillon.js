import React, {useContext} from 'react'
import AuthContext from '../context/auth-context'
import PublicRouteur from './Public'
import PrivateRouteur from './Private'
export default function Routeur() {

    const authContext = useContext(AuthContext)
    let isActive
    if(authContext.playload !== null) {
        isActive = authContext.playload.is_active
    }
    const token = authContext.token

    return (
        <>
            {
                token ?
                    isActive ?
                        <PrivateRouteur/>
                        :
                        <PublicRouteur/>
                    :
                    <PublicRouteur/>
            }
        </>
    )
}
