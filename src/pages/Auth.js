import React, {useContext, useRef, useState} from 'react'
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import HelpIcon from '@material-ui/icons/Help';
import './Auth.css'
import AuthContext from '../context/auth-context'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

// Alert
function Alert(props) {
    // console.log("passe par alert function");
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

//Tabpanel
function TabPanel(props) {
    const { children, value, index, ...other } = props;

    //retour du tab panel avec option
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );

}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

//Style et thème de la navbar
const useStyles = makeStyles((theme) => ({
    root: {

        backgroundColor: theme.palette.background.paper,
        width: '100%',
    },
    snackbar: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

export default function FullWidthTabs() {
    const context = useContext(AuthContext);

    //style des tabs
    let classes = useStyles();
    let theme = useTheme();
    const [value, setValue] = React.useState(0);

    // const connexion
    let email = useRef('');
    let password = useRef('');

    // const inscription
    let reg_email = useRef('');
    let reg_password = useRef('');
    let reg_pseudo = useRef('');
    let reg_password_verif = useRef('');

    // création des statements et récupération des "seteur" (state = état, objet accessible uniquement pour le composant "x" permet de stocker une donnée)
    const [state, setState] = React.useState({
        alert_message : useRef(''),
        severity : ''
    })

    //initialisation de la requête sur true
    let request = true;
    //initialisation du message d'alert


    //Entre crochet entre le [ empêche la saisie de caractère
    let filter_pseudo = new RegExp("^[^@&\"()<>!_$*€£`+=\\/;?#]+$");

    //regex email
    let filter_email = new RegExp("^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,4}$");

    //regex password
    let filter_password = new RegExp("^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$");


    // état de l'alerte
    const [open, setOpen] = React.useState(false);

    //si onsubmit, formulaire viens chercher cet fonction (formulaire connexion)
    const handleSubmit = (event) => {
        // console.log("Submit connexion");
        event.preventDefault();

        let user_email = email.current.value;
        let user_password = password.current.value;


        //test la regex filter email sur la valeur de l'input reg_email
        let valid_email = filter_email.test(email.current.value);

        //test la regex filter email sur la valeur de l'input reg_email
        let valid_password = filter_password.test(password.current.value);

        state.severity = 'error';
            //si user email vide
        if(user_email === ""){
            request = false;
            // console.log(request)
            state.alert_message = 'Veuilliez saisir votre adresse email';
            // setState({...state,alert_message: useRef('TEST') })
            handleClick();
            // console.log('email vide');
        }

        //si password vide
        if(user_password === ""){
            request = false;

            state.alert_message = 'Veuilliez saisir votre mot de passse';
            handleClick();
            // console.log('mdp vide');
        }
        //enlève les espaces
        if (user_email.trim().length === 0 || user_password.trim().length === 0) {
            return
        }
        if(valid_email === false){
            request = false;
            state.alert_message = 'Email incorrect';
            // console.log(user_email);
            handleClick();
            // console.log('regex email');
        }
        if(valid_password === false){
            request = false;
            state.alert_message = 'Votre mot de passe contient au moins une MAJUSCULE, une minuscule et un chiffre';
            // console.log(user_password);
            handleClick();
            // console.log('regex password');
        }

        if(request === true){
            //requête envoyé à api
            // console.log('entré requête connexion');
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
                    user_email: user_email,
                    user_password: user_password
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
                    if(res.status !== 200 && res.status !== 201) {
                        throw new Error('Failed')
                    }
                    return res.json()
                })
                .then(resData => {
                    // console.log(resData)
                    if (resData.data.login) {
                        context.login(
                            // resData.data.login._id,
                            // resData.data.login.user_role,
                            resData.data.login.token,
                        )
                        // console.log(context.login)
                    }
                })
                .catch(err => {
                    // console.log(err)

                })

        }
        else{
            request = false;
            state.alert_message = 'Email ou mot de passe incorrect';
            handleClick();
            // console.log('requête requestn = false');
            // console.log(user_email);
            // console.log(user_password);
        }
    }

    //formulaire validation inscription

    const registrationSubmit = (event) =>{
        event.preventDefault();

        //récupère les "valeurs" passent par la ref dans input
        let  reg_user_pseudo = reg_pseudo.current.value;
        let reg_user_email = reg_email.current.value;
        let reg_user_password = reg_password.current.value;
        let reg_user_password_verif = reg_password_verif.current.value;

        //test la regex filter pseudo sur la valeur de l'input reg_pseudo
        let valid_pseudo = filter_pseudo.test(reg_pseudo.current.value);

        //test la regex filter email sur la valeur de l'input reg_email
        let valid_email = filter_email.test(reg_email.current.value);

        //test la regex filter password sur la valeur de l'input reg_password
        let valid_password = filter_password.test(reg_password.current.value);


        state.severity="error";
        //Si  pseudo vide

        if(reg_user_pseudo===""){
            // console.log("pseudo vide");
            state.alert_message = "Veuilliez renseigner votre pseudo";
            handleClick();
            request = false;
            // console.log(request)
        }
        //Si email vide
        if(reg_user_email===""){
            // console.log("email vide");
            state.alert_message = "Veuilliez renseigner votre adresse email";
            handleClick();
            request = false;
        }
        //Si password vide
        if(reg_user_password===""){
            // console.log("password");
            state.alert_message = "Veuilliez renseigner votre mot de passe";
            handleClick();
            request = false;
        }
        //Si password valid vide
        if(reg_user_password_verif===""){
            // console.log("valid password vide");
            state.alert_message = "Veuilliez renseigner votre mot de passe";
            handleClick();
            request = false;
        }
        // trim retire les "bmancs" espace tabulation ect ...
        if (reg_user_email.trim().length === 0 || reg_user_password.trim().length === 0) {
            return
        }

        //si mdp 1 différents de mdp 2
        if (reg_user_password_verif !== reg_user_password){
            request = false;
            // console.log('mdp 1 et 2 différents');
            state.alert_message = "mots de passes différents";
            handleClick();
        }
        //else obligatoire, si relance de la requête après un requestn = false
        else {
            request = true;
            // console.log('true 2 mdp identique');
        }
        //test regEx pseudo
        if(valid_pseudo===false){
            // console.log('regEx Pseudo incorect');
            request = false;
            state.alert_message = "Votre pseudo ne doit pas contenir de caractères spéciaux";
            handleClick();
        }
        //test regEx  email
        if(valid_email === false){
            // console.log('regex email non respecté');
            state.alert_message = "Adresse email incorrecte";
            handleClick();
            request = false;
        }
        // mdp sous 8 charactère
        if(reg_user_password.length < 8){
            // console.log('mdp sous 8 charactère');
            // console.log('nombre charactère = '+reg_user_password.length);
            state.alert_message = "Votre mot de passe doit contenir au minimum 8 caractères";
            handleClick();
            request = false;
            // console.log(reg_user_password)
        }
        //test regEx password
        else if(valid_password === false){
            // console.log('regex password non respecté');
            request = false;
            state.alert_message = "Votre mot de passe doit contenir au moins une MAJUSCULE, une minuscule et un chiffre";
            handleClick();
        }

            if(request === true){
                // console.log('lance la requête request = true');

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
                        user_login: reg_user_pseudo,
                        user_email: reg_user_email,
                        user_password: reg_user_password
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
                    if(res.status !== 200 && res.status !== 201) {
                        throw new Error('Failed')
                    }
                    return res.json()
                })
                .then(resData => {
                    if (resData.errors) {
                        // console.log(resData.errors[0].message);
                        state.alert_message = resData.errors[0].message;
                        handleClick();
                    }
                    else{
                        state.severity = "success"
                        state.alert_message = "Validation de l'inscription"
                        handleClick()
                    }
                    if (resData.data.login) {
                        // console.log(resData.errors[0].message)
                        context.login(
                            // resData.data.login._id,
                            // resData.data.login.user_role,
                            resData.data.login.token,
                        )
                        // console.log(context.login)
                    }
                })
                .catch(err => {
                    console.log(err)
                })

                // state.severity = "success"
                // state.alert_message = "Validation de l'inscription"
                // handleClick()

        }


    }
    //changement de tabs
    const handleChange = (event, newValue) => {
        setValue(newValue);
        // console.log('hangle change');
    };

    const handleChangeIndex = (index) => {
        setValue(index);
        // console.log('hangle change index');
    };

    const handleClick = () => {
        setOpen(true);
        // console.log('passe par Handleclick function (setOpen : true)');
    };

    const handleClose = (event, reason) => {
        // console.log('passe par Handleclose function (setOpen : false)');
        if (reason === 'clickaway') {
            // console.log('passe par Handleclose function si retouche au bouton');
            return;
        }

        setOpen(false);
    };

    //retour tabs
    return (
        <div className={classes.root}>


            <AppBar position="static" color="default">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    // variant="fullWidth"
                    centered
                    aria-label="full width tabs example"
                >
                    <Tab label="Connexion" icon={<PersonPinIcon />} {...a11yProps(0)} />
                    <Tab label="Inscription" icon={<HelpIcon />} {...a11yProps(1)} />
                </Tabs>
            </AppBar>
            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
                onChangeIndex={handleChangeIndex}
            >
                <TabPanel value={value} index={0} dir={theme.direction}>
                    <h1>Connexion</h1>
                    <form className="auth-form" onSubmit={handleSubmit}>
                        <div className="form-control">
                            <label htmlFor="user_email" >Email</label>
                            <input type="email" id="user_email"  ref={email}/>
                            <label htmlFor="user_password">Password  </label>
                            <input type="password" id="user_pasword"  ref={password}/>
                            <button type="submit">Submit</button>
                            <button type="reset">Annuler</button>
                        </div>
                        <div className={classes.snackbar}>
                            <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
                                <Alert onClose={handleClose} severity={state.severity} >
                                    {state.alert_message}
                                </Alert>
                            </Snackbar>
                        </div>
                    </form>
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                    <h1>Inscription</h1>
                    <form className="auth-form" onSubmit={registrationSubmit}>
                        <div className="form-control">
                            <label htmlFor="reg_user_pseudo" >Pseudo</label>
                            {/*Ajouter la ref*/}
                            <input type="pseudo" id="reg_user_pseudo"  ref={reg_pseudo}/>
                            <label htmlFor="reg_user_email" >Email</label>
                            <input type="email" id="reg_user_email"  ref={reg_email}/>
                            <label htmlFor="reg_user_password">Password  </label>
                            <input type="password" id="reg_user_password"  ref={reg_password}/>
                            <label htmlFor="reg_user_password">Confirm password  </label>
                            <input type="password" id="reg_user_password_verif"  ref={reg_password_verif}/>
                            <button type="submit" >Submit</button>
                            <button type="reset">Annuler</button>
                            <div className={classes.snackbar}>
                                <Snackbar className="test" open={open} autoHideDuration={5000} onClose={handleClose}>
                                    <Alert onClose={handleClose} severity={state.severity} >
                                        {state.alert_message}
                                    </Alert>
                                </Snackbar>
                            </div>
                        </div>
                    </form>
                </TabPanel>
            </SwipeableViews>
        </div>
    );
}

