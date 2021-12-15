import React, {Suspense, lazy} from 'react'

import { useQuery, gql } from '@apollo/client'

import Loading from './pages/Loading'
import Index from './pages/Index'

const AUTHENTFIED = gql`
    query{
        refreshToken{
            auth
        }
    }
`

export default function VerifyAuthentify() {
    const {data, loading} = useQuery(AUTHENTFIED)
    console.log(data)
    return (

        <>
            {
                loading ?
                    <Loading/>
                :
                    <Index authDate={data} />
            }
        </>
    )
}