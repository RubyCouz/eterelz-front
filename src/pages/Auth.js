import React, {useContext, useRef, useState} from 'react'
import {Card, CardActions, CardContent, Box, Typography, TextField, Button, Grid} from '@mui/material'
import AuthContext from '../context/auth-context'
import {makeStyles} from '@material-ui/core/styles'
import 'animate.css'
import clsx from 'clsx'
import {gql, useLazyQuery} from '@apollo/client'
import {Slide} from "@material-ui/core";
import SnackbarError from '../Components/Snackbar/SnackbarError'
import validForm from "../Tools/ValidForms";

function SlideTransition(props) {
    return <Slide {...props} direction="up"/>;
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    snackbar: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
    margin: {
        margin: theme.spacing(1),
    },
    error: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    animatedItem: {
        display: 'block',
        animation: `$myEffect 1000ms ${theme.transitions.easing.easeInOut}`
    },
    animatedItemExiting: {
        display: 'none',
    },
    animatedItem2: {
        display: 'block',
        animation: `$myEffect 1000ms ${theme.transitions.easing.easeInOut}`
    },
    animatedItemExiting2: {
        display: 'none',
    },
    "@keyframes myEffect": {
        "0%": {
            opacity: 0,
            transform: "translateY(-200%)"
        },
        "100%": {
            opacity: 1,
            transform: "translateY(0)"
        }
    },
    "@keyframes myEffectExit": {
        "0%": {
            opacity: 1,
            transform: "translateY(0)"
        },
        "100%": {
            opacity: 0,
            transform: "translateY(-200%)"
        }
    },
    buttonsAction: {
        marginTop: '10px',
    },
    nextButton: {
        color: '#cccccc !important',
        border: '1px solid #8618AD !important',
        fontWeight: 'bold !important',
        backgroundColor: '#8618AD !important',
    }
}))

const LOGIN = gql`
    query LOGIN($email: String!, $password: String!) {
        login(user_email: $email, user_password: $password) {
            token
        }
    }
`

export default function Auth() {
    let classes = useStyles()
    const email = useRef('')
    const password = useRef('')

    const [panel1, setPanel1] = useState(false)
    const [panel2, setPanel2] = useState(true)
    const [state, setState] = useState({
        alert_message: '',
        severity: '',
    })
    const [open, setOpen] = useState(false)
    const [sBar, setSbar] = useState({
        Transition: Slide,
        vertical: 'bottom',
        horizontal: 'center',
    });
    const {vertical, horizontal} = sBar

    const [checkForm, setCheckForm] = useState({
        emailValue: '',
        passwordValue: '',
        emailMessage: '',
        passwordMessage: ''
    })
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

    const context = useContext(AuthContext)
    const [login, {error}] = useLazyQuery(
        LOGIN,
        {
            variables: {
                email: email.current.value,
                password: password.current.value,
            },
            errorPolicy: 'all',
            onCompleted: data => {
                console.log(data)
                context.login()
            },
            onError: (({networkError}) => {
                if (networkError) {
                    error.networkError.result.errors.map(({message, status}) => {
                        setState({
                            ...state,
                            severity: 'error',
                            alert_message: message
                        })
                        handleClick(SlideTransition, {vertical: 'bottom', horizontal: 'center'})
                        return error
                    })
                }
            })
        }
    )

    const handlePanel = () => {
        setPanel1(!panel1)
        setPanel2(!panel2)
    }

    const handleInputChange = async (event) => {
        const input = event.target.name
        const value = event.target.value
        const response = await validForm(input, value)
        setCheckForm({
            ...checkForm,
            [input + 'Value']: value,
            [input + 'Message']: response
        })
    }

    const connectUser = async () => {
        if(checkForm.emailMessage !== '' || checkForm.passwordMessage !== '') {
            if(checkForm.emailMessage !== '') {
                setState({
                    ...state,
                    severity: 'error',
                    alert_message: checkForm.emailMessage
                })
            }
            if(checkForm.passwordMessage !== '') {
                setState({
                    ...state,
                    severity: 'error',
                    alert_message: checkForm.passwordMessage
                })
            }
            handleClick(SlideTransition, {vertical: 'bottom', horizontal: 'center'})
        } else {
            try {
                await login()
                setState({
                    ...state,
                    severity: 'success',
                    alert_message: 'Connexion ok'
                })
                handleClick(SlideTransition, {vertical: 'bottom', horizontal: 'center'})
            } catch (e) {
                console.log(e)
            }
        }

    }

    return (
        <Box sx={{flexGrow: 1}}>
            <Grid
                container
                justifyContent="center"
                alignItems="center"
            >
                <Grid item xs>
                </Grid>
                <Grid item xs={4}>
                    <Card sx={{
                        minWidth: 275,
                        marginTop: '35%'
                    }}>
                        <CardContent>
                            <Typography variant="body2">
                                <form className="auth-form">
                                    <h1>Connexion</h1>
                                    <Box
                                        className={clsx(classes.animatedItem, {
                                            [classes.animatedItemExiting]: panel1
                                        })}
                                    >
                                        <div className="form-control" id="panel1">
                                            <div>
                                                <TextField
                                                    id="email"
                                                    label="Email"
                                                    name="email"
                                                    type="text"
                                                    helperText={
                                                        checkForm.emailMessage !== '' && checkForm.emailMessage
                                                    }
                                                    inputRef={email}
                                                    fullWidth={true}
                                                    required
                                                    onChange={handleInputChange}
                                                    value={checkForm.emailValue}
                                                    variant="outlined"
                                                    error={
                                                        (checkForm.emailMessage === '') ?
                                                            false : checkForm.emailMessage
                                                    }
                                                />
                                            </div>
                                            <Grid container
                                                  direction="row"
                                                  justifyContent="space-around"
                                                  alignItems="center"
                                            >
                                                <Grid item xs={6} md={6} lg={6} alignItems="left">
                                                    <Box textAlign="left" className={classes.buttonsAction}>
                                                        <Button value="Retour"
                                                                variant="outlined"
                                                        >
                                                            <a href="/home" title="retour à l'accueil">Retour</a>
                                                        </Button>
                                                    </Box>
                                                </Grid>
                                                <Grid item xs={6} md={6} lg={6}>
                                                    <Box textAlign="right" className={classes.buttonsAction}>
                                                        {
                                                            checkForm.emailValue !== '' &&
                                                            <Button
                                                                value="Suivant"
                                                                variant="outlined"
                                                                className={classes.nextButton}
                                                                onClick={handlePanel}
                                                            >
                                                                Suivant
                                                            </Button>
                                                        }

                                                    </Box>
                                                </Grid>
                                            </Grid>
                                        </div>
                                    </Box>
                                    <Box
                                        className={clsx(classes.animatedItem2, {
                                            [classes.animatedItemExiting2]: panel2
                                        })}
                                    >
                                        <div className="form-control" id="panel2">
                                            <div>
                                                <TextField
                                                    id="standard-error-helper-text"
                                                    label="Mot de passe"
                                                    name="password"
                                                    type="password"
                                                    helperText={checkForm.passwordMessage !== '' && "Saisissez un mot de passe valide"}
                                                    inputRef={password}
                                                    fullWidth={true}
                                                    variant="outlined"
                                                    onChange={handleInputChange}
                                                    value={state.log_user_password}
                                                    error={checkForm.passwordMessage === '' ? false : checkForm.passwordMessage}
                                                    required
                                                />
                                            </div>
                                            <Grid container
                                                  direction="row"
                                                  justifyContent="space-around"
                                                  alignItems="center"
                                            >
                                                <Grid item xs={6} md={6} lg={6} alignItems="left">
                                                    <Button
                                                        value="retour"
                                                        variant="outlined"
                                                        onClick={handlePanel}
                                                    >
                                                        Retour
                                                    </Button>
                                                </Grid>
                                                <Grid item xs={6} md={6} lg={6} alignItems="left">
                                                    <Box textAlign="right" className={classes.buttonsAction}>
                                                        <Button variant="contained"
                                                                color="primary"
                                                                justifyContent="flex-end"
                                                                onClick={connectUser}
                                                                className={classes.nextButton}
                                                        >
                                                            Valider
                                                        </Button>
                                                    </Box>
                                                </Grid>
                                            </Grid>
                                        </div>
                                    </Box>
                                </form>
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <a href="/signup">Pas de compte Eterelz ? Cliquez ici !</a>
                        </CardActions>
                    </Card>
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
                <Grid item xs>
                </Grid>
            </Grid>
        </Box>
    )
}
