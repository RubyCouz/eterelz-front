import * as React from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@material-ui/core/Grid'
import {useContext, useState} from 'react'
import MuiAlert from '@material-ui/lab/Alert'
import AuthContext from '../context/auth-context'
import Snackbar from '@material-ui/core/Snackbar'
import {makeStyles} from '@material-ui/core/styles'
import { useHistory} from 'react-router-dom'

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
}));

const initialState = {
    alert_message: '',
    severity: '',
    reg_user_pseudo: '',
    reg_user_email: '',
    reg_user_password: '',
    reg_user_password_confirm: '',
    log_user_email: '',
    log_user_password: ''
}
const initialRequestError = {
    errorValue: false,
    requestRegister: false,
}

export default function Signup() {
    const history = useHistory()
    let classes = useStyles()
    const [state, setState] = useState({initialState})
    const initialError = {
        reg_user_pseudo_error: false,
        reg_user_email_error: false,
        reg_user_password_error: false,
        reg_user_password_confirm_error: false,
    }
    //State état des textfield register
    const [error, setError] = useState(initialError)
    //State état des erreurs pour lancement requête
    const [requestError] = useState(initialRequestError)
    // état de l'alerte
    const [open, setOpen] = useState(false);

    const regexlist = {
        reg_user_pseudo: new RegExp("^[^@&\"()<>!_$*€£`+=\\/;?#]+$"),
        reg_user_email: new RegExp("^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,4}$"),
        reg_user_password: new RegExp("^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$"),
        reg_user_password_confirm: new RegExp("^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$"),
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
        //Le name + 'Error' permet de renvoyer le nom de l'erreur
        setError({
            ...error,
            [name + '_error']: regall
        });
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

    // const login = () => {
    //     let requestBody = {
    //         query: `
    //                 query Login($user_email: String!, $user_password: String!) {
    //                     login(
    //                         user_email: $user_email,
    //                         user_password: $user_password
    //                         ) {
    //                         token
    //                         }
    //                     }
    //                 `,
    //         variables: {
    //             user_email: state.reg_user_email,
    //             user_password: state.reg_user_password
    //         }
    //     }
    //     //connexion api et envoie en post les infos format json
    //     fetch('http://localhost:8080/api', {
    //         method: 'POST',
    //         body: JSON.stringify(requestBody),
    //         credentials: 'include',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     })
    //         //si erreur
    //         .then(res => {
    //             if (res.status !== 200 && res.status !== 201) {
    //                 throw new Error('Failed')
    //             }
    //             return res.json()
    //         })
    //         .then(resData => {
    //             //si erreur
    //             if (resData.errors) {
    //                 state.severity = 'error'
    //                 state.alert_message = resData.errors[0].message;
    //                 handleClick();
    //             }
    //             if (resData.data.login) {
    //                 // si checkbox cochée
    //                 // if (state.stayLogged) {
    //                 // défintion cookie
    //                 // }
    //                 context.login()
    //             }
    //         })
    //         .catch(err => {
    //             state.severity = 'error'
    //             state.alert_message = 'Information incorrect'
    //             handleClick()
    //         })
    // }
    //formulaire validation inscription
    const signup = () => {
        // trim retire les "blancs" espace tabulation ect ...
        if (state.reg_user_email.trim().length === 0 || state.reg_user_password.trim().length === 0) {
            return
        }
        //si mdp 1 différent de mdp 2
        if (state.reg_user_password_confirm !== state.reg_user_password) {
            state.alert_message = "Mots de passes différents";
            requestError.requestRegister = false
            handleClick();
        }
        if (requestError.requestRegister === true) {
            let requestRegister = {
                query: `
                    mutation CreateUser($user_login: String!, $user_email: String!, $user_password: String!) {
                        createUser(userInput: {
                            user_login: $user_login,
                            user_email: $user_email,
                            user_password: $user_password
                        })
                        {
                        _id
                        user_login
                        user_email                        
                        }
                    }
                    `,
                variables: {
                    user_login: state.reg_user_pseudo,
                    user_email: state.reg_user_email,
                    user_password: state.reg_user_password
                }
            }
            fetch('http://localhost:8080/api', {
                method: 'POST',
                body: JSON.stringify(requestRegister),
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(res => {
                    if (res.status !== 200 && res.status !== 201) {
                        throw new Error('Failed')
                    }
                    return res.json()
                })
                .then(resData => {
                    if (resData.errors) {
                        state.severity = 'error'
                        state.alert_message = resData.errors[0].message;
                        handleClick();
                    } else {
                        state.severity = "success"
                        state.alert_message = "Validation de l'inscription"
                        // login()
                        handleClick()
                        // redirection pour vérification de compte
                         return history.push(`/verifyAccount`)
                    }
                    if (resData.data.login) {
                        context.login(
                            resData.data.login.token,
                        )
                    }
                })
                .catch(err => {
                    console.log(err)
                })
            state.severity = "success"
            state.alert_message = "Validation de l'inscription"
            handleClick()
        } else {
            state.severity = 'error';
            state.alert_message = 'Information incorrect';
            handleClick();
        }
    };

    requestError.requestRegister = true
//parcours l'objet error et vérifie si un élément retourne false
    for (const i in error) {
        requestError.errorValue = error[i];
        if (requestError.errorValue === true) {
            requestError.requestRegister = false
        }
    }
    requestError.requestLogin = true

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
                                    <h1>Inscription</h1>
                                    <div className="form-control">
                                        <TextField
                                            id="standard-error-helper-text"
                                            label="Pseudo"
                                            name="reg_user_pseudo"
                                            type="text"
                                            helperText="Caractères spéciaux non autorisés"
                                            onChange={handleInputChange}
                                            value={state.reg_user_pseudo}
                                            fullWidth={true}
                                            required
                                            error={error.reg_user_pseudo_error}
                                        />
                                        <TextField
                                            id="standard-error-helper-text"
                                            label="Email"
                                            name="reg_user_email"
                                            type="text"
                                            helperText="Entrer votre email"
                                            onChange={handleInputChange}
                                            value={state.reg_user_email}
                                            fullWidth={true}
                                            required
                                            error={error.reg_user_email_error}
                                        />
                                        <TextField
                                            id="standard-error-helper-text"
                                            label="Mot de passe"
                                            name="reg_user_password"
                                            type="password"
                                            helperText="Mot de passe doit contenir 8 caractères, une majuscule, une minuscule et un chiffre"
                                            onChange={handleInputChange}
                                            value={state.reg_user_password}
                                            fullWidth={true}
                                            required
                                            error={error.reg_user_password_error}
                                        />
                                        <TextField
                                            id="standard-error-helper-text"
                                            label="Vérification de mot de passe"
                                            name="reg_user_password_confirm"
                                            type="password"
                                            helperText="Entrer une seconde fois votre mot de passe."
                                            onChange={handleInputChange}
                                            value={state.reg_user_password_confirm}
                                            fullWidth={true}
                                            required
                                            error={error.reg_user_password_confirm_error}
                                        />
                                        <Button value="Annuler"
                                                variant="outlined"
                                        >
                                            <a href="/home" title="retour à l'accueil">Retour</a>
                                        </Button>
                                        <Button value="Signup"
                                                variant="outlined"
                                                onClick={signup}
                                        >
                                            S'inscrire
                                        </Button>
                                    </div>
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
                    </Card>
                </Grid>
                <Grid item xs>

                </Grid>
            </Grid>
        </Box>
    )
}