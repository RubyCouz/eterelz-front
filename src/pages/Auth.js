import * as React from 'react'
import PropTypes from 'prop-types'
import SwipeableViews from 'react-swipeable-views'
import {useTheme} from '@mui/material/styles'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
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

// Alert
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{p: 3}}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
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
    const theme = useTheme()
    const [value, setValue] = useState(0)
    const [state, setState] = useState({initialState})
    const initialLogError = {
        log_user_email_error: false,
        log_user_password_error: false
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

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };

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

    // requestError.requestRegister = true
    //parcours l'objet error et vérifie si un élément retourne false
    // for (const i in error) {
    //     requestError.errorValue = error[i];
    //     if (requestError.errorValue === true) {
    //         requestError.requestRegister = false
    //     }
    // }
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
                                    <SwipeableViews
                                        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                                        index={value}
                                        onChangeIndex={handleChangeIndex}
                                    >
                                        <TabPanel value={value} index={0} dir={theme.direction}>
                                            <div className="form-control">
                                                <div>
                                                    <TextField
                                                        id="standard-error-helper-text"
                                                        label="Email"
                                                        name="log_user_email"
                                                        type="text"
                                                        helperText="Entrer votre email"
                                                        fullWidth={true}
                                                        required
                                                        onChange={handleInputChange}
                                                        value={state.log_user_email}
                                                        error={logError.log_user_email_error}
                                                    />
                                                </div>
                                                <Button value="Annuler"
                                                        variant="outlined"
                                                >
                                                    <a href="/home" title="retour à l'accueil">Retour</a>
                                                </Button>
                                                <Tabs
                                                    value={value}
                                                    onChange={handleChange}
                                                    aria-label="full width tabs example"
                                                >
                                                    <Tab
                                                        label="" {...a11yProps(0)}
                                                        sx={{
                                                            display: 'none'
                                                        }}

                                                    />
                                                    <Tab label="Suivant"
                                                         {...a11yProps(1)}
                                                    />
                                                </Tabs>
                                            </div>
                                        </TabPanel>
                                        <TabPanel value={value} index={1} dir={theme.direction}>
                                            <div className="form-control">
                                                <div>
                                                    <TextField
                                                        id="standard-error-helper-text"
                                                        label="Mot de passe"
                                                        name="log_user_password"
                                                        type="password"
                                                        helperText="Entrer votre mot de passe"
                                                        fullWidth={true}
                                                        onChange={handleInputChange}
                                                        value={state.log_user_password}
                                                        error={logError.log_user_password_error}
                                                        required
                                                    />
                                                </div>
                                                <Tabs
                                                    value={value}
                                                    onChange={handleChange}
                                                    indicatorColor="secondary"
                                                    textColor="inherit"
                                                    variant="fullWidth"
                                                    aria-label="full width tabs example"
                                                >
                                                    <Tab label="Retour" {...a11yProps(0)} />
                                                </Tabs>
                                                <Button variant="contained"
                                                        color="primary"
                                                        justifyContent="flex-end"
                                                        onClick={login}
                                                >
                                                    Valider
                                                </Button>
                                            </div>
                                        </TabPanel>
                                    </SwipeableViews>
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
                            <a href="/signup" size="small">Pas de compte Eterelz ? Cliquez ici !</a>
                        </CardActions>
                    </Card>
                </Grid>
                <Grid item xs>

                </Grid>
            </Grid>
        </Box>
    )
}
