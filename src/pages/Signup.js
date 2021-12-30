import * as React from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import {useRef, useState} from 'react'
import {makeStyles} from '@mui/styles'
import validForm from '../Tools/ValidForms'
import {gql, useMutation} from '@apollo/client'
import {useHistory} from 'react-router-dom'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    snackbar: {
        width: '100%',
    },
    card: {
        backgroundColor: '#303030'
    },
    input: {
        marginBottom: '10px'
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
})

const CREATEUSER = gql`
    mutation CREATEUSER($user_login: String!, $email: String!, $password: String!) {
        createUser(
            userInput: {
                user_login: $user_login, user_email: $email, user_password: $password
            }) {
            _id
            user_email
        }
    }
`

export default function Signup() {
    let classes = useStyles()
    const history = useHistory()
    const pseudo = useRef('')
    const email = useRef('')
    const password = useRef('')
    const confirmPassword = useRef('')

    const [state, setState] = useState({
        alert_message: '',
        severity: '',
    })

    const [checkForm, setCheckForm] = useState({
        pseudoValue: '',
        pseudoMessage: '',
        emailValue: '',
        passwordValue: '',
        emailMessage: '',
        passwordMessage: '',
        confirmPasswordValue: '',
        confirmPasswordMessage: ''
    })
    const [snackbar, setSnackbar] = useState(null)

    const [createUser, {error}] = useMutation(
        CREATEUSER, {
            variables: {
                user_login: pseudo.current.value,
                email: email.current.value,
                password: password.current.value
            },
            errorPolicy: 'all',
            onCompleted: data => {
                setSnackbar({children: 'Inscription effectuée !!!', severity: 'success'});

                return history.push('/verifyAccount')
            },
            onError: (({networkError}) => {
                if (networkError) {
                    error.networkError.result.errors.map(({message, status}) => {
                        setSnackbar({children: message, severity: 'error'});
                        return error
                    })
                }
            })
        }
    )

    const handleCloseSnackbar = () => setSnackbar(null)
    const handleInputChange = async (event) => {
        const value = event.target.value;
        const input = event.target.name;
        const response = await validForm(input, value)
        setCheckForm({
            ...checkForm,
            [input + 'Value']: value,
            [input + 'Message']: response
        })
    }

    const signup = async () => {
        if (password.current.value !== confirmPassword.current.value) {
            console.log('mdp !=')
            setState({
                ...state,
                severity: 'error',
                alert_message: 'Les mots de passe doivent être identique'
            })
        } else if (checkForm.passwordValue === '' ||
            checkForm.emailValue === '' ||
            checkForm.pseudoValue === '' ||
            checkForm.confirmPasswordValue === ''
        ) {
            console.log('champs vide')
            setState({
                ...state,
                severity: 'error',
                alert_message: 'Vous devez remplir entièrement ce formulaire pour le valider'
            })
        } else if (checkForm.pseudoMessage !== '' ||
            checkForm.emailMessage !== '' ||
            checkForm.passwordMessage !== '' ||
            checkForm.confirmPasswordMessage !== '') {
            console.log('données ivalide')
            if (checkForm.emailMessage !== '') {
                setState({
                    ...state,
                    severity: 'error',
                    alert_message: checkForm.emailMessage
                })
            }
            if (checkForm.passwordMessage !== '') {
                setState({
                    ...state,
                    severity: 'error',
                    alert_message: checkForm.passwordMessage
                })
            }
            if (checkForm.pseudoMessage !== '') {
                setState({
                    ...state,
                    severity: 'error',
                    alert_message: checkForm.pseudoMessage
                })
            }
            if (checkForm.confirmPasswordMessage !== '') {
                setState({
                    ...state,
                    severity: 'error',
                    alert_message: checkForm.confirmPasswordMessage
                })
            }
            setSnackbar({children: state.alert_message, severity: state.severity})
        } else {
            try {
                await createUser()
                // return history.push('/verifyAccount')
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
                <Grid item xs/>
                <Grid item xs={4}>
                    <Card sx={{
                        minWidth: 275,
                        marginTop: '35%'
                    }}
                          className={classes.card}
                    >
                        <CardContent
                            className={classes.card}>
                            <Typography variant="body2">
                                <form>
                                    <h1>Inscription</h1>
                                    <Grid
                                        container
                                        justifyContent="center"
                                        alignItems="center"
                                    >
                                        <Grid item xs={12} md={12} lg={12}>
                                            <TextField
                                                className={classes.input}
                                                id="login"
                                                label="Pseudo"
                                                name="pseudo"
                                                type="text"
                                                inputRef={pseudo}
                                                helperText={checkForm.pseudoMessage !== '' && checkForm.pseudoMessage}
                                                variant="outlined"
                                                onChange={handleInputChange}
                                                value={checkForm.pseudoValue}
                                                fullWidth={true}
                                                required
                                                error={checkForm.pseudoMessage === '' ? false : checkForm.pseudoMessage}
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid
                                        container
                                        justifyContent="center"
                                        alignItems="center"
                                    >
                                        <Grid item xs={12} md={12} lg={12}>
                                            <TextField
                                                className={classes.input}
                                                id="email"
                                                label="Email"
                                                name="email"
                                                inputRef={email}
                                                type="text"
                                                helperText={checkForm.emailMessage !== '' && checkForm.emailMessage}
                                                variant="outlined"
                                                onChange={handleInputChange}
                                                value={checkForm.emailValue}
                                                fullWidth={true}
                                                required
                                                error={checkForm.emailMessage === '' ? false : checkForm.emailMessage}
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid
                                        container
                                        justifyContent="center"
                                        alignItems="center"
                                    >
                                        <Grid item xs={12} md={12} lg={12}>
                                            <TextField
                                                className={classes.input}
                                                id="standard-error-helper-text"
                                                label="Mot de passe"
                                                name="password"
                                                inputRef={password}
                                                type="text"
                                                helperText={checkForm.passwordMessage !== '' && checkForm.passwordMessage}
                                                variant="outlined"
                                                onChange={handleInputChange}
                                                value={checkForm.passwordValue}
                                                fullWidth={true}
                                                required
                                                error={checkForm.passwordMessage === '' ? false : checkForm.passwordMessage}
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid
                                        container
                                        justifyContent="center"
                                        alignItems="center"
                                    >
                                        <Grid item xs={12} md={12} lg={12}>
                                            <TextField
                                                className={classes.input}
                                                id="standard-error-helper-text"
                                                label="Vérification de mot de passe"
                                                name="confirmPassword"
                                                inputRef={confirmPassword}
                                                type="text"
                                                variant="outlined"
                                                helperText={checkForm.confirmPasswordMessage !== '' && checkForm.confirmPasswordMessage}
                                                onChange={handleInputChange}
                                                value={checkForm.confirmPasswordValue}
                                                fullWidth={true}
                                                required
                                                error={checkForm.confirmPasswordMessage === '' ? false : checkForm.confirmPasswordMessage}
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid
                                        container
                                    >
                                        <Grid item xs={6} md={6} lg={6}>
                                            <Button value="Annuler"
                                                    variant="outlined"
                                            >
                                                <a href="/auth" title="retour à la connexion">Retour</a>
                                            </Button>
                                        </Grid>
                                        <Grid item xs={6} md={6} lg={6}>
                                            <Box textAlign="right" className={classes.buttonsAction}>
                                                <Button value="Signup"
                                                        variant="contained"
                                                        color="primary"
                                                        justifyContent="flex-end"
                                                        onClick={signup}
                                                        className={classes.nextButton}
                                                >
                                                    S'inscrire
                                                </Button>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </form>
                            </Typography>
                        </CardContent>
                    </Card>
                    {!!snackbar && (
                        <Snackbar open onClose={handleCloseSnackbar} autoHideDuration={6000}>
                            <Alert {...snackbar} onClose={handleCloseSnackbar}/>
                        </Snackbar>
                    )}
                </Grid>
                <Grid item xs/>
            </Grid>
        </Box>
    )
}
