import React from 'react'
import Button from '@material-ui/core/Button'
import {useParams} from 'react-router-dom'
import {gql, useMutation} from '@apollo/client'

const CONFIRMUSER = gql`
 mutation CONFIRMUSER($token: String!) {
     confirmUser(token: $token) {
         user_email
     }
 }
`

export default function VerifyAccount() {

// récupération du token passé dans l'url

    const url = useParams()
    const token = url.token
    const [confirmUser, {error}] = useMutation(
        CONFIRMUSER,
        {
            variables: {
                token: token
            },
            errorPolicy: 'all'
        }
    )
    const confirmAccount = async () => {
        console.log(confirmUser());
        await confirmUser()
    }

    return (
        <div>
            <p>
               Check ton mail pour vérifier ton compte :
            </p>
            <Button
                onClick={confirmAccount}
            >
                Vérifiez votre compte
            </Button>
            { error &&
            <pre>{error.graphQLErrors.map(({ message, status }, i) => (
                <span key={i}>{status + ' ' + message}</span>
            ))}
            </pre>
            }
        </div>
    )

}