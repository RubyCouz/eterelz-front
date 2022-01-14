import React, {useContext, useRef, useState} from 'react'
import {Link} from 'react-router-dom'
import {Card, CardActions, CardContent, Box, Typography, TextField, Button, Grid} from '@mui/material'
import AuthContext from '../context/auth-context'
import {makeStyles} from '@mui/styles'
import 'animate.css'
import clsx from 'clsx'
import {useLazyQuery} from '@apollo/client'
import validForm from '../Tools/ValidForms'
import {LOGIN} from '../Queries/UserQueries'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import {useDocTitle} from '../Hook/useDocTitle'
import {SocketContext} from '../context/socket-context'

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
export default function Auth() {
    useDocTitle('EterelZ Connexion')
    const socket = useContext(SocketContext)
    const context = useContext(AuthContext)
    let classes = useStyles()
    const email = useRef('')
    const password = useRef('')
    const [horizontal] = useState('center')
    const [vertical] = useState('bottom')
    const [panel1, setPanel1] = useState(false)
    const [panel2, setPanel2] = useState(true)
    const [checkForm, setCheckForm] = useState({
        emailValue: '',
        passwordValue: '',
        emailMessage: '',
        passwordMessage: ''
    })
    const [snackbar, setSnackbar] = useState(null)
    const handleCloseSnackbar = () => setSnackbar(null)
    const [login, {error}] = useLazyQuery(
        LOGIN,
        {
            variables: {
                email: email.current.value,
                password: password.current.value,
            },
            errorPolicy: 'all',
            onCompleted: data => {
                socket.emit('online', {token: data.login.token})
                setSnackbar({children: 'Connexion ok !!!', severity: 'success'});
                context.login()
            },
            onError: (({networkError}) => {
                if (networkError) {
                    networkError.result.errors.map(({message, status}) => {
                        setSnackbar({children: message, severity: 'error'});
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
        const required = event.target.required
        const response = await validForm(input, value, required)
        setCheckForm({
            ...checkForm,
            [input + 'Value']: value,
            [input + 'Message']: response
        })
    }
    const connectUser = async (event) => {
        if (checkForm.passwordValue === '' || checkForm.emailValue === '') {
            if (checkForm.emailValue === '') {
                event.preventDefault()
                setSnackbar({
                    children: 'Pas d\'email, pas de connexion. Pas de connexion... Pas de connexion',
                    severity: 'error'
                })
            }
            if (checkForm.passwordValue === '') {
                event.preventDefault()
                setSnackbar({
                    children: 'Pas de mot de passe, pas de connexion. Pas de connexion... Pas de connexion',
                    severity: 'error'
                })
            }
            if (checkForm.emailMessage !== '' || checkForm.passwordMessage !== '') {
                if (checkForm.emailMessage !== '') {
                    event.preventDefault()
                    setSnackbar({children: checkForm.emailMessage, severity: 'error'})
                }
                if (checkForm.passwordMessage !== '') {
                    event.preventDefault()
                    setSnackbar({children: checkForm.passwordMessage, severity: 'error'})
                }
            }
        } else {
            try {
                await login()
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
                                                        <Button
                                                            value="Retour"
                                                            variant="outlined"
                                                        >
                                                            <Link to="/">Retour</Link>
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
                                                    value={checkForm.passwordValue}
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
                                                        <Link to="/"> Retour</Link>
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
                            <Link to="/signup">Pas de compte Eterelz ? Cliquez ici !</Link>
                        </CardActions>
                    </Card>
                    {!!snackbar && (
                        <Snackbar
                            open anchorOrigin={{vertical, horizontal}}
                            onClose={handleCloseSnackbar}
                            autoHideDuration={6000}>
                            <Alert {...snackbar} onClose={handleCloseSnackbar}/>
                        </Snackbar>
                    )}
                </Grid>
                <Grid item xs>
                </Grid>
            </Grid>
        </Box>
    )
}
