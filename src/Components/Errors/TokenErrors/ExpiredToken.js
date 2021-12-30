import React, {useRef} from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Box from "@mui/material/Box"
import Grid from '@mui/material/Grid'
import {gql, useLazyQuery} from '@apollo/client'
import './ExpiredToken.css'

const REVERIFY = gql`
    query reVerify($email: String!, $pass: String!) {
        reVerify(user_email: $email, pass: $pass) {
            _id
            user_email
            user_login
        }
    }
`

export default function ExpiredToken() {

    const email = useRef('')
    let userMail
    let pass = ''
    const verify = async () => {
        userMail = email.current.value
        // génération code sécurité
        let len = 6
        while (pass.length < len) {
            pass += Math.random().toString(36).substr(2)
            pass = pass.substr(0, len)
        }
        await reVerify({variables: {email: userMail, pass: pass}})
    }

    const [reVerify] = useLazyQuery(
        REVERIFY, {
            email: userMail,
            pass: pass
        }
    )
    return (
        <div>
            <p>
                Ce token est expiré et / ou est non-valide. Pour faire une autre demande, renseignez l'email utilisé pour l'inscription :
            </p>
            <Box
                component="form"
                noValidate
                autoComplete="off"
            >
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Grid item xs={8} md={8} lg={8}>
                        <TextField
                            required
                            key="user_email"
                            id="user_email"
                            type="email"
                            name="user_email"
                            inputRef={email}
                            label="Adresse Email"
                            variant="outlined"
                            color="secondary"
                            fullWidth={true}
                            className="input"
                        />
                    </Grid>
                    <Grid item xs={4} md={4} lg={4}>
                        <Button
                            className="confirmBtn"
                            variant="contained"
                            onClick={verify}
                        >
                            Valider
                        </Button>
                    </Grid>
                </Grid>
            </Box>
            <p>RAPPEL : vous disposez de 15 min pour valider votre inscription</p>
        </div>
    )

}