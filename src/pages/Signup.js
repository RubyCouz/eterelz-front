import * as React from 'react'
import {Link} from 'react-router-dom'
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
import {useMutation} from '@apollo/client'
// import {useHistory} from 'react-router-dom'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import {CREATEUSER} from '../Queries/UserQueries'
import {useDocTitle} from '../Hook/useDocTitle'

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

export default function Signup() {
    useDocTitle('EterelZ Inscription')
    let classes = useStyles()
    // const history = useHistory()
    const pseudo = useRef('')
    const email = useRef('')
    const password = useRef('')
    const confirmPassword = useRef('')
    const [horizontal] = useState('center')
    const [vertical] = useState('bottom')

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
                // return history.push('/verifyAccount')
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
        const required = event.target.required
        const response = await validForm(input, value, required)
        setCheckForm({
            ...checkForm,
            [input + 'Value']: value,
            [input + 'Message']: response
        })
    }
    const signup = async (event) => {
        if (password.current.value !== confirmPassword.current.value) {
            event.preventDefault()
            setSnackbar({
                children: 'Les mots de passe sont différent',
                severity: 'error'
            })
        } else if (checkForm.passwordValue === '' ||
            checkForm.emailValue === '' ||
            checkForm.pseudoValue === '' ||
            checkForm.confirmPasswordValue === ''
        ) {
            event.preventDefault()
            setSnackbar({
                children: 'Il manque des informations pour compléter l\'inscription',
                severity: 'error'
            })
        } else if (checkForm.pseudoMessage !== '' ||
            checkForm.emailMessage !== '' ||
            checkForm.passwordMessage !== '' ||
            checkForm.confirmPasswordMessage !== '') {
            if (checkForm.emailMessage !== '') {
                event.preventDefault()
                setSnackbar({
                    children: checkForm.emailMessage,
                    severity: 'error'
                })
            }
            if (checkForm.passwordMessage !== '') {
                event.preventDefault()
                setSnackbar({
                    children: 'Pas de mot de passe, pas d\'inscription. Pas d\'inscription... Pas d\'inscription',
                    severity: 'error'
                })
            }
            if (checkForm.pseudoMessage !== '') {
                event.preventDefault()
                setSnackbar({
                    children: 'il faut un pseudo pour s\'inscrire ici !!!',
                    severity: 'error'
                })
            }
            if (checkForm.confirmPasswordMessage !== '') {
                event.preventDefault()
                setSnackbar({
                    children: 'Et le mot de passe, alors ???',
                    severity: 'error'
                })
            }
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
                                                type="password"
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
                                                type="password"
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
                                                <Link to="/">
                                                    Retour
                                                </Link>
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
                        <Snackbar open anchorOrigin={{ vertical, horizontal }}
                                  onClose={handleCloseSnackbar}
                                  autoHideDuration={6000}>
                            <Alert {...snackbar} onClose={handleCloseSnackbar}/>
                        </Snackbar>
                    )}
                </Grid>
                <Grid item xs/>
            </Grid>
        </Box>
    )
}
