import React, {useContext, useRef, useState} from 'react'
import Button from '@material-ui/core/Button'
import {useParams} from 'react-router-dom'
import {gql, useMutation} from '@apollo/client'
import Grid from '@material-ui/core/Grid'
import ExpiredToken from '../Components/Errors/TokenErrors/ExpiredToken'
import {useHistory} from 'react-router-dom'
import AuthContext from '../context/auth-context'
import './VerifyAccount.css'
import Box from '@mui/material/Box'
import {Slide, TextField} from '@material-ui/core'
import SnackbarError from '../Components/Snackbar/SnackbarError'
import {makeStyles} from "@material-ui/core/styles";

function SlideTransition(props) {
    return <Slide {...props} direction="up"/>;
}

const useStyle = makeStyles({
    snackbar: {
        width: '100%',
    },
})

const CONFIRMUSER = gql`
    mutation CONFIRMUSER($token: String!, $pass: String!) {
        confirmUser(token: $token, pass: $pass) {
            token
        }
    }
`


export default function VerifyAccount() {

    const context = useContext(AuthContext)
    const history = useHistory()
    const classes = useStyle()
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
    console.log(token)
    if (token === undefined) {
        console.log('ok')
    }
    let pass

    const [state, setState] = useState({
        alert_message: '',
        severity: '',
        statusCode: ''
    })
    const [open, setOpen] = useState(false)
    const [sBar, setSbar] = useState({
        Transition: Slide,
        vertical: 'bottom',
        horizontal: 'center',
    })
    const {vertical, horizontal} = sBar
    /**
     * récupération de chaque caractère du code et stockage
     * dans un tableau au changement de valeur d'un des input
     * @param e
     * @returns {*[]}
     */
    const handleChange = (e) => {
        let index
        let next
        console.log(e.target.id)
        // const index = e.target.id
        switch (e.target.id) {
            case 'char1':
                index = 0
                next = char2
                break
            case 'char2':
                index = 1
                next = char3
                break
            case 'char3':
                index = 2
                next = char4
                break
            case 'char4':
                index = 3
                next = char5
                break
            case 'char5':
                index = 4
                next = char6
                break
            case 'char6':
                index = 5
                next = char6
                break
            default:
                break
        }
        charArray[index] = e.target.value
        // changement automatique d'input
        next.current.focus()
        return charArray
    }

    /**
     * transformation du tableau en chaine de caractère
     * @returns {string}
     */
    const passTransform = () => {
        const newArray = []
        for (const value in charArray) {
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
            },
        })
    }

    let [confirmUser, {error}] = useMutation(
        CONFIRMUSER,
        {
            variables: {
                token: token,
                pass: pass
            },
            errorPolicy: 'all',
            onError: (({networkError}) => {
                if (networkError) {
                    console.log(networkError.result.errors)
                    networkError.result.errors.map(({message, statusCode}) => {
                        console.log(statusCode)
                        setState({
                            ...state,
                            severity: 'error',
                            alert_message: message,
                            statusCode: statusCode
                        })
                        handleClick(SlideTransition, {vertical: 'bottom', horizontal: 'center'})
                        return error
                    })
                }
            }),
            onCompleted: data => {
                context.login()
                return history.push('/dashboard')
            }
        },
    )

    const handleClick = (Transition, newSbar) => {
        setOpen(true)
        setSbar({
            Transition,
            ...newSbar
        })
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false)
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
                    {token === undefined ?
                        <p>
                            Votre inscription a bien été prise en compte. Suivez les indications dans le mail qui vous
                            sera envoyé pour valider votre inscription.
                        </p> :
                        state.statusCode === 600 ?
                            <ExpiredToken/> :
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
                                                        // onKeyUp={nextInput(char1, char2, 1)}
                                                        required
                                                        type="text"
                                                        key="char1"
                                                        id="char1"
                                                        name="char1"
                                                        inputRef={char1}
                                                        variant="outlined"
                                                        fullWidth={true}
                                                        inputProps={{maxlength: 1}}
                                                    />
                                                </Grid>
                                                <Grid item xs={2} md={2} lg={2}>
                                                    <TextField
                                                        onChange={handleChange}
                                                        // onKeyUp={nextInput(char2, char3, 1)}
                                                        required
                                                        type="text"
                                                        key="char2"
                                                        id="char2"
                                                        name="char2"
                                                        inputRef={char2}
                                                        variant="outlined"
                                                        fullWidth={true}
                                                        inputProps={{maxlength: 1}}
                                                    />
                                                </Grid>
                                                <Grid item xs={2} md={2} lg={2}>
                                                    <TextField
                                                        onChange={handleChange}
                                                        // onKeyUp={nextInput(char3, char4, 1)}
                                                        required
                                                        type="text"
                                                        key="char3"
                                                        id="char3"
                                                        name="char3"
                                                        inputRef={char3}
                                                        variant="outlined"
                                                        fullWidth={true}
                                                        inputProps={{maxlength: 1}}
                                                    />
                                                </Grid>
                                                <Grid item xs={2} md={2} lg={2}>
                                                    <TextField
                                                        onChange={handleChange}
                                                        // onKeyUp={nextInput(char4, char5, 1)}
                                                        required
                                                        type="text"
                                                        key="char4"
                                                        id="char4"
                                                        name="char4"
                                                        inputRef={char4}
                                                        variant="outlined"
                                                        fullWidth={true}
                                                        inputProps={{maxlength: 1}}
                                                    />
                                                </Grid>
                                                <Grid item xs={2} md={2} lg={2}>
                                                    <TextField
                                                        onChange={handleChange}
                                                        // onKeyUp={nextInput(char5, char6, 1)}
                                                        required
                                                        type="text"
                                                        key="char5"
                                                        id="char5"
                                                        name="char5"
                                                        inputRef={char5}
                                                        variant="outlined"
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
                <SnackbarError
                    class={classes.snackbar}
                    anchorOrigin={{vertical, horizontal}}
                    open={open}
                    transitionComponent={sBar.Transition}
                    onClose={handleClose}
                    message={state.alert_message}
                    key={sBar.Transition.name}
                    severity={state.severity}
                />
            </Grid>
        </Grid>
    )

}