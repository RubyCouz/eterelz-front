import React, {useRef} from 'react'
import Button from "@material-ui/core/Button";
import {TextField} from "@material-ui/core";
import Box from "@mui/material/Box";
import Grid from "@material-ui/core/Grid";
import {gql, useLazyQuery} from "@apollo/client";
import './ExpiredToken.css'

const REVERIFY = gql`
    query reVerify($email: String!) {
        reVerify(user_email: $email) {
            _id
            user_email
            user_login
        }
    }
`

export default function ExpiredToken() {
    const email = useRef('')
    const [reVerify, {error}] = useLazyQuery(
        REVERIFY,
        {
            variables: {
                email: email
            },
            errorPolicy: 'all'
        }
    )
    const verify = async () => {
        const userMail = email.current.value
        console.log(userMail)
        await reVerify({variables: {user_email: userMail}})
    }
    return (
        <div>
            <p>
                Ce token est exipré. Pour faire une autre demande, renseignez l'email utilisé pour l'inscription :
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