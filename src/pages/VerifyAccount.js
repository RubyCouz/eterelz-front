import React from 'react'
import Button from '@material-ui/core/Button'
import {useParams} from 'react-router-dom'
import {gql, useMutation} from '@apollo/client'
import Grid from '@material-ui/core/Grid'
import ExpiredToken from '../Components/Errors/TokenErrors/ExpiredToken'

import './VerifyAccount.css'

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
        console.log(confirmUser())
        await confirmUser()
    }

    return (
        <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
        >
            <Grid item xs={6} md={6} lg={6}>
                <div className="disclaimer">
                    {error ?
                        <div>
                            {error.graphQLErrors.map(({message, status}, i) => (
                                status === 600 &&
                                <ExpiredToken/>
                            ))
                            }
                        </div> :
                        <div>
                            <p>
                                Cliquez sur le bouton ci-dessous pour confirmer votre inscription !
                            </p>
                            <Button
                                className="confirmBtn"
                                variant="contained"
                                onClick={confirmAccount}
                            >
                                Vérifiez votre compte
                            </Button>
                        </div>
                    }
                </div>
            </Grid>
        </Grid>
    )

}