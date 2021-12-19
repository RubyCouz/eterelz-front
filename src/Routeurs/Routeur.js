import React, {useContext} from 'react'
import AuthContext from '../context/auth-context'
import PublicRouteur from './Public'
import PrivateRouteur from './Private'

export default function Routeur() {
    
    const authContext = useContext(AuthContext)
    const token = authContext.token

    return (
        <>
            {   
                token ?
                    <PrivateRouteur />
                :
                    <PublicRouteur />
            }
        </>
    )
}
