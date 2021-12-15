import React, {useRef} from 'react'
import Button from '@material-ui/core/Button'
import {useParams} from 'react-router-dom'
import {gql, useMutation} from '@apollo/client'
import Grid from '@material-ui/core/Grid'
import ExpiredToken from '../Components/Errors/TokenErrors/ExpiredToken'

import './VerifyAccount.css'
import Box from "@mui/material/Box";
import {TextField} from "@material-ui/core";

const CONFIRMUSER = gql`
    mutation CONFIRMUSER($token: String!, $pass: String!) {
        confirmUser(token: $token, pass: $pass) {
            user_email
        }
    }
`

export default function VerifyAccount() {

    const char1 = useRef('')
    const char2 = useRef('')
    const char3 = useRef('')
    const char4 = useRef('')
    const char5 = useRef('')
    const char6 = useRef('')
    const charArray = []

// récupération du token passé dans l'url
    const url = useParams()
    const token = url.token
    let pass
    /**
     * récupération de chaque caractère du code et stockage
     * dans un tableau au changement de valeur d'un des input
     * @param e
     * @returns {*[]}
     */
    const handleChange = (e) => {
        let index
        // const index = e.target.id
        switch (e.target.id) {
            case 'char1':
                index = 0
                break
            case 'char2':
                index = 1
                break
            case 'char3':
                index = 2
                break
            case 'char4':
                index = 3
                break
            case 'char5':
                index = 4
                break
            case 'char6':
                index = 5
                break
            default:
                break
        }
        charArray[index] = e.target.value
        console.log('tableau après saisie : ' + charArray)
        return charArray
    }

    /**
     * transformation du tableau en chaine de caractère
     * @returns {string}
     */
    const passTransform = () => {
        const newArray = []
        for(const value in charArray) {
            newArray.push(charArray[value])
        }
        const pass = newArray.join('')
        return pass
    }

    /**
     * envoie du code vers l'api
     * @returns {Promise<void>}
     */
    const confirmAccount = async () => {
        const confirmPass = passTransform()
        await confirmUser({
            variables: {
                pass: confirmPass
            }
        })
    }

    const [confirmUser, {error}] = useMutation(
        CONFIRMUSER,
        {
            variables: {
                token: token,
                pass: pass
            },
            errorPolicy: 'all'
        }
    )

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
                                (status === 600 ||
                                    status === 601 ||
                                    status === 602 ||
                                    status === 603 ||
                                    status === 604 ||
                                    status === 605) &&
                                <ExpiredToken/>
                            ))
                            }
                        </div> :
                        <div>
                            <p>
                                Saisissez votre code pour confirmer votre inscription !
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
                                    <Grid item xs={6} md={6} lg={6}>
                                        <Grid
                                            container
                                            direction="row"
                                            justifyContent="center"
                                            alignItems="center"
                                        >
                                            <Grid item xs={2} md={2} lg={2}>
                                                <TextField
                                                    onChange={handleChange}
                                                    required
                                                    type="text"
                                                    key="char1"
                                                    id="char1"
                                                    name="char1"
                                                    inputRef={char1}
                                                    variant="outlined"
                                                    color="secondary"
                                                    fullWidth={true}
                                                    inputProps={{maxlength: 1}}
                                                />
                                            </Grid>
                                            <Grid item xs={2} md={2} lg={2}>
                                                <TextField
                                                    onChange={handleChange}
                                                    required
                                                    type="text"
                                                    key="char2"
                                                    id="char2"
                                                    name="char2"
                                                    inputRef={char2}
                                                    variant="outlined"
                                                    color="secondary"
                                                    fullWidth={true}
                                                    inputProps={{maxlength: 1}}
                                                />
                                            </Grid>
                                            <Grid item xs={2} md={2} lg={2}>
                                                <TextField
                                                    onChange={handleChange}
                                                    required
                                                    type="text"
                                                    key="char3"
                                                    id="char3"
                                                    name="char3"
                                                    inputRef={char3}
                                                    variant="outlined"
                                                    color="secondary"
                                                    fullWidth={true}
                                                    inputProps={{maxlength: 1}}
                                                />
                                            </Grid>
                                            <Grid item xs={2} md={2} lg={2}>
                                                <TextField
                                                    onChange={handleChange}
                                                    required
                                                    type="text"
                                                    key="char4"
                                                    id="char4"
                                                    name="char4"
                                                    inputRef={char4}
                                                    variant="outlined"
                                                    color="secondary"
                                                    fullWidth={true}
                                                    inputProps={{maxlength: 1}}
                                                />
                                            </Grid>
                                            <Grid item xs={2} md={2} lg={2}>
                                                <TextField
                                                    onChange={handleChange}
                                                    required
                                                    type="text"
                                                    key="char5"
                                                    id="char5"
                                                    name="char5"
                                                    inputRef={char5}
                                                    variant="outlined"
                                                    color="secondary"
                                                    fullWidth={true}
                                                    inputProps={{maxlength: 1}}
                                                />
                                            </Grid>
                                            <Grid item xs={2} md={2} lg={2}>
                                                <TextField
                                                    onChange={handleChange}
                                                    required
                                                    type="text"
                                                    key="char6"
                                                    id="char6"
                                                    name="char6"
                                                    inputRef={char6}
                                                    variant="outlined"
                                                    color="secondary"
                                                    fullWidth={true}
                                                    inputProps={{maxlength: 1}}
                                                />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={4} md={4} lg={4}>
                                        <Button
                                            className="confirmBtn"
                                            variant="contained"
                                            onClick={confirmAccount}
                                        >
                                            Valider
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Box>
                        </div>
                    }
                </div>
            </Grid>
        </Grid>
    )

}