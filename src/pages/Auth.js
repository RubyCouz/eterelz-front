import * as React from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Grid from '@material-ui/core/Grid'
import {useContext, useState} from 'react'
import MuiAlert from '@material-ui/lab/Alert'
import AuthContext from '../context/auth-context'
import Snackbar from '@material-ui/core/Snackbar'
import {makeStyles} from '@material-ui/core/styles'
import 'animate.css'
import clsx from "clsx";

// Alert
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
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

const initialState = {
    alert_message: '',
    severity: '',
    log_user_email: '',
    log_user_password: ''
}
const initialRequestError = {
    errorValue: false,
    requestLogin: false,
    logErrorValue: false
}

export default function FullWidthTabs() {

    let classes = useStyles()
    const [panel1, setPanel1] = React.useState(false)
    const [panel2, setPanel2] = React.useState(true)
    const [state, setState] = useState({initialState})
    const initialLogError = {
        log_user_email_error: '',
        log_user_password_error: ''
    }
    //State état des textfield login
    const [logError, setLogError] = useState(initialLogError)
    //State état des erreurs pour lancement requête
    const [requestError] = useState(initialRequestError)
    // état de l'alerte
    const [open, setOpen] = useState(false);

    const regexlist = {
        log_user_email: new RegExp("^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,4}$"),
        log_user_password: new RegExp("^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$")
    }

    const context = useContext(AuthContext)

    const handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        const regall = !regexlist[name].test(value)
        setState({
            ...state, [name]: value
        });

        setLogError({
            ...logError,
            [name + '_error']: regall
        });
        console.log(state)
        console.log(logError)
    };

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    }

    const handlePanel = () => {
        setPanel1(!panel1)
        setPanel2(!panel2)
    }

    const login = () => {
        //initialise couleur error pour alert snackbar
        state.severity = 'error';
        //enlève les espaces
        if (state.log_user_email.trim().length === 0 || state.log_user_password.trim().length === 0) {
            return
        }
        if (requestError.requestLogin === true) {
            //requête envoyée à api
            let requestBody = {
                query: `
                    query Login($user_email: String!, $user_password: String!) {
                        login(
                            user_email: $user_email,
                            user_password: $user_password
                            ) {
                            token
                            }
                        }
                    `,
                variables: {
                    user_email: state.log_user_email,
                    user_password: state.log_user_password,
                    stayLogged: state.stayLogged
                }
            }
            //connexion api et envoie en post les infos format json
            fetch('http://localhost:8080/api', {
                method: 'POST',
                body: JSON.stringify(requestBody),
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                //si erreur
                .then(res => {
                    if (res.status !== 200 && res.status !== 201) {
                        throw new Error('Failed')
                    }
                    return res.json()
                })
                .then(resData => {
                    //si erreur
                    if (resData.errors) {
                        state.severity = 'error'
                        state.alert_message = resData.errors[0].message;
                        handleClick();
                    }
                    if (resData.data.login) {
                        // si checkbox cochée
                        // if (state.stayLogged) {
                        // défintion cookie
                        // }
                        context.login()
                    }
                })
                .catch(err => {
                    state.severity = 'error'
                    state.alert_message = 'Information incorrect'
                    handleClick()
                })
        } else {
            state.alert_message = 'Email ou mot de passe incorrect';
            handleClick()
        }
    }

    requestError.requestLogin = true
    //parcours l'objet logError et vérifie si un élément retourne false
    for (const i in logError) {
        requestError.logErrorValue = logError[i];
        if (requestError.logErrorValue === true) {
            requestError.requestLogin = false
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
                                                    id="standard-error-helper-text"
                                                    label="Email"
                                                    name="log_user_email"
                                                    type="text"
                                                    helperText={logError.log_user_email_error && 'Saisissez un email valide'}
                                                    fullWidth={true}
                                                    required
                                                    onChange={handleInputChange}
                                                    value={state.log_user_email}
                                                    variant="outlined"
                                                    error={logError.log_user_email_error === '' ? false : logError.log_user_email_error}
                                                />
                                            </div>
                                            <Grid container
                                                  direction="row"
                                                  justifyContent="space-around"
                                                  alignItems="center"
                                            >
                                                <Grid item xs={6} md={6} lg={6} alignItems="left">
                                                    <Button value="Retour"
                                                            variant="outlined"
                                                    >
                                                        <a href="/home" title="retour à l'accueil">Retour</a>
                                                    </Button>
                                                </Grid>
                                                <Grid item xs={6} md={6} lg={6}>
                                                    <Box textAlign="right" className={classes.buttonsAction}>
                                                        <Button
                                                            value="Suivant"
                                                            variant="outlined"
                                                            className={classes.nextButton}
                                                            onClick={handlePanel}
                                                        >
                                                            Suivant
                                                        </Button>
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
                                                    name="log_user_password"
                                                    type="password"
                                                    helperText={logError.log_user_password_error && "Saisissez un mot de passe valide"}
                                                    fullWidth={true}
                                                    variant="outlined"
                                                    onChange={handleInputChange}
                                                    value={state.log_user_password}
                                                    error={logError.log_user_password_error === '' ? false : logError.log_user_password_error}
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
                                                                onClick={login}
                                                                className={classes.nextButton}
                                                        >
                                                            Valider
                                                        </Button>
                                                    </Box>
                                                </Grid>
                                            </Grid>
                                        </div>
                                    </Box>
                                    <div className={classes.snackbar}>
                                        <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
                                            <Alert onClose={handleClose} severity={state.severity}>
                                                {state.alert_message}
                                            </Alert>
                                        </Snackbar>
                                    </div>
                                </form>
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <a href="/signup">Pas de compte Eterelz ? Cliquez ici !</a>
                        </CardActions>
                    </Card>
                </Grid>
                <Grid item xs>

                </Grid>
            </Grid>
        </Box>
    )
}
