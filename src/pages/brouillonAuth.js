import React, {useContext, useState} from 'react'
import PropTypes from 'prop-types'
import {makeStyles} from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import './Auth.css'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

export default function FullWidthTabs(props) {

    // création des statements et récupération des "seteur" (state = état, objet accessible uniquement pour le composant "x" permet de stocker une donnée)

    // const handleStayLogged = (event) => {
    //     setState({ ...state, [event.target.name]: event.target.checked });
    // };



    const cancel = () => {
        setState(initialState)
        setError(initialError)
        setLogError(initialLogError)
        setRequestError(initialRequestError)
    }



    //si onsubmit, formulaire viens chercher cet fonction (formulaire connexion)
    const mailSubmit = () => {
        //initialise couleur error pour alert snackbar
        state.severity = 'error';

        //enlève les espaces
        if (state.log_user_email.trim().length === 0 || state.log_user_password.trim().length === 0) {
            return
        }

        if (requestError.requestLogin === true) {
            //requête envoyé à api
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
                        if (state.stayLogged) {
                            // défintion cookie
                        }
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
            handleClick();
        }
    }
    //formulaire validation inscription
    // const registrationSubmit = () => {
    //     // trim retire les "bmancs" espace tabulation ect ...
    //     if (state.reg_user_email.trim().length === 0 || state.reg_user_password.trim().length === 0) {
    //         return
    //     }
    //     //si mdp 1 différents de mdp 2
    //     if (state.reg_user_password_confirm !== state.reg_user_password) {
    //         state.alert_message = "mots de passes différents";
    //         requestError.requestRegister = false
    //         handleClick();
    //     }
    //     if (requestError.requestRegister === true) {
    //         let requestRegister = {
    //             query: `
    //                 mutation CreateUser($user_login: String!, $user_email: String!, $user_password: String!) {
    //                     createUser(userInput: {
    //                         user_login: $user_login,
    //                         user_email: $user_email,
    //                         user_password: $user_password
    //                     })
    //                     {
    //                     _id
    //                     user_login
    //                     user_email
    //                     }
    //                 }
    //
    //                 `,
    //             variables: {
    //                 user_login: state.reg_user_pseudo,
    //                 user_email: state.reg_user_email,
    //                 user_password: state.reg_user_password
    //             }
    //         }
    //         fetch('http://localhost:8080/api', {
    //             method: 'POST',
    //             body: JSON.stringify(requestRegister),
    //             credentials: 'include',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             }
    //         })
    //             .then(res => {
    //                 if (res.status !== 200 && res.status !== 201) {
    //                     throw new Error('Failed')
    //                 }
    //                 return res.json()
    //             })
    //             .then(resData => {
    //                 if (resData.errors) {
    //                     state.severity = 'error'
    //                     state.alert_message = resData.errors[0].message;
    //                     handleClick();
    //                 } else {
    //                     state.severity = "success"
    //                     state.alert_message = "Validation de l'inscription"
    //                     handleClick()
    //                 }
    //                 if (resData.data.login) {
    //                     context.login(
    //                         resData.data.login.token,
    //                     )
    //                 }
    //             })
    //             .catch(err => {
    //                 console.log(err)
    //             })
    //         state.severity = "success"
    //         state.alert_message = "Validation de l'inscription"
    //         handleClick()
    //     } else {
    //         state.severity = 'error';
    //         state.alert_message = 'Information incorrect';
    //         handleClick();
    //     }
    // }
    //changement de tabs
    // const handleChange = (event, newValue) => {
    //     setValue(newValue);
    //     cancel()
    // };

    // const handleChangeIndex = (index) => {
    //     setValue(index);
    // };




    //retour tabs
    return (
        <div className={classes.root}>
            {/*<AppBar position="static" color="default">*/}
            {/*    <Tabs*/}
            {/*        value={value}*/}
            {/*        onChange={handleChange}*/}
            {/*        indicatorColor="primary"*/}
            {/*        textColor="primary"*/}
            {/*        // variant="fullWidth"*/}
            {/*        centered*/}
            {/*        aria-label="full width tabs example"*/}
            {/*    >*/}
            {/*        <Tab label="Connexion" icon={<PersonPinIcon/>} {...a11yProps(0)} />*/}
            {/*        <Tab label="Inscription" icon={<HelpIcon/>} {...a11yProps(1)} />*/}
            {/*    </Tabs>*/}
            {/*</AppBar>*/}
            {/*<SwipeableViews*/}
            {/*    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}*/}
            {/*    index={value}*/}
            {/*    onChangeIndex={handleChangeIndex}*/}
            {/*>*/}
            {/*    <TabPanel value={value} index={0} dir={theme.direction}>*/}
            <h1>Connexion</h1>
            <form className="auth-form">
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
                        />
                        {/*<TextField*/}
                        {/*    id="standard-error-helper-text"*/}
                        {/*    label="Mot de passe"*/}
                        {/*    name="log_user_password"*/}
                        {/*    type="password"*/}
                        {/*    helperText="Mot de passe doit contenir 8 caractères, une majuscule, une minuscule et un chiffre."*/}
                        {/*   */}
                        {/*    */}
                        {/*    fullWidth={true}*/}
                        {/*    required*/}
                        {/*    */}
                        {/*/>*/}
                    </div>
                    {/*<FormControlLabel*/}
                    {/*    control={*/}
                    {/*        <Checkbox*/}
                    {/*            checked={state.stayLogged}*/}
                    {/*            onChange={handleStayLogged}*/}
                    {/*            name="stayLogged"*/}
                    {/*            color="primary"*/}
                    {/*        />*/}
                    {/*    }*/}
                    {/*    label="Restez connecté !!!"*/}
                    {/*/>*/}
                    <Box display="flex" style={{width: '100%'}}>
                        <Button value="Annuler" onClick={cancel} variant="outlined"
                                justifyContent="flex-start">Cancel</Button>
                        <Button onClick={mailSubmit} variant="contained" color="primary"
                                justifyContent="flex-end">Suivant</Button>
                    </Box>

                </div>
            </form>
            {/*</TabPanel>*/}

            {/*<TabPanel value={value} index={1} dir={theme.direction}>*/}
            {/*    <h1>Inscription</h1>*/}
            {/*    <form className="auth-form">*/}
            {/*        <div className="form-control">*/}
            {/*            <TextField*/}
            {/*                id="standard-error-helper-text"*/}
            {/*                label="Pseudo"*/}
            {/*                name="reg_user_pseudo"*/}
            {/*                type="text"*/}
            {/*                helperText="Caractères spéciaux non autorisés"*/}
            {/*                onChange={handleInputChange}*/}
            {/*                value={state.reg_user_pseudo}*/}
            {/*                fullWidth={true}*/}
            {/*                required*/}
            {/*                error={error.reg_user_pseudo_error}*/}
            {/*            />*/}
            {/*            <TextField*/}
            {/*                id="standard-error-helper-text"*/}
            {/*                label="Email"*/}
            {/*                name="reg_user_email"*/}
            {/*                type="text"*/}
            {/*                helperText="Entrer votre email"*/}
            {/*                onChange={handleInputChange}*/}
            {/*                value={state.reg_user_email}*/}
            {/*                fullWidth={true}*/}
            {/*                required*/}
            {/*                error={error.reg_user_email_error}*/}
            {/*            />*/}
            {/*            <div>*/}
            {/*                <TextField*/}
            {/*                    id="standard-error-helper-text"*/}
            {/*                    label="Mot de passe"*/}
            {/*                    name="reg_user_password"*/}
            {/*                    type="password"*/}
            {/*                    helperText="Mot de passe doit contenir 8 caractères, une majuscule, une minuscule et un chiffre"*/}
            {/*                    onChange={handleInputChange}*/}
            {/*                    value={state.reg_user_password}*/}
            {/*                    fullWidth={true}*/}
            {/*                    required*/}
            {/*                    error={error.reg_user_password_error}*/}
            {/*                />*/}
            {/*                <TextField*/}
            {/*                    id="standard-error-helper-text"*/}
            {/*                    label="Vérification de mot de passe"*/}
            {/*                    name="reg_user_password_confirm"*/}
            {/*                    type="password"*/}
            {/*                    helperText="Entrer une seconde fois votre mot de passe."*/}
            {/*                    onChange={handleInputChange}*/}
            {/*                    value={state.reg_user_password_confirm}*/}
            {/*                    fullWidth={true}*/}
            {/*                    required*/}
            {/*                    error={error.reg_user_password_confirm_error}*/}
            {/*                />*/}
            {/*            </div>*/}
            {/*            <div>*/}
            {/*                <Button onClick={registrationSubmit} variant="contained"*/}
            {/*                        color="primary">Register</Button>*/}
            {/*                <Button onClick={cancel} variant="outlined">Cancel</Button>*/}
            {/*            </div>*/}

            {/*            <div className={classes.snackbar}>*/}
            {/*                <Snackbar className="snackbar_register" open={open} autoHideDuration={5000}*/}
            {/*                          onClose={handleClose}>*/}
            {/*                    <Alert onClose={handleClose} severity={state.severity}>*/}
            {/*                        {state.alert_message}*/}
            {/*                    </Alert>*/}
            {/*                </Snackbar>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </form>*/}
            {/*</TabPanel>*/}
            {/*</SwipeableViews>*/}
        </div>
    );
}

