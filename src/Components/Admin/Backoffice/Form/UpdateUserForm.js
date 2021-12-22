import React, {useState} from 'react'
import {Box, FormControl, TextField} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import validForm from "../../../../Tools/ValidForms";

export default function UpdateUserForm(props) {

    const [checkForm, setCheckForm] = useState({
        pseudoValue: props.state.user.user_login ? props.state.user.user_login : '',
        pseudoMessage: '',
        emailValue:  props.state.user.user_email ? props.state.user.user_email : '',
        emailMessage: '',
        discordValue: props.state.user.user_discord ? props.state.user.user_discord : '',
        discordMessage: '',
        addressValue: props.state.user.user_address ? props.state.user.user_address : '',
        addressMessage: '',
        zipValue: props.state.user.user_zip ? props.state.user.user_zip : '',
        zipMessage: '',
        cityValue: props.state.user.user_city ? props.state.user.user_city : '',
        cityMessage: '',
        roleValue: props.state.user.user_role ? props.state.user.user_role : '',
        roleMessage: '',
        userStateValue: props.state.user.user_state ? props.state.user.user_state : '',
        userStateMessage: '',
    })
    const handleInputChange = async (event) => {
        const value = event.target.value
        const input = event.target.name
        const required = event.target.required
        const response = await validForm(input, value, required)
        setCheckForm({
            ...checkForm,
            [input + 'Value']: value,
            [input + 'Message']: response
        })
    }
    return (
        <Box
            sx={props.style}
            component="form"
            noValidate
            autoComplete="off"
        >
            <Grid container
                  spacing={2}
            >
                <Grid
                    item
                    xs={12} md={12} lg={12}
                >
                    <FormControl fullWidth>
                        <TextField
                            id="outlined-basic"
                            label="Pseudo"
                            variant="outlined"
                            type="text"
                            inputRef={props.input.login}
                            helperText={checkForm.pseudoMessage !== '' && checkForm.pseudoMessage}
                            error={checkForm.pseudoMessage !== ''}
                            name="pseudo"
                            value={checkForm.pseudoValue}
                            onChange={handleInputChange}
                            required
                        />
                    </FormControl>
                </Grid>
                <Grid
                    item
                    xs={12} md={12} lg={12}
                >
                    <FormControl fullWidth>
                        <TextField
                            id="outlined-basic"
                            label="Email"
                            variant="outlined"
                            type="email"
                            inputRef={props.input.email}
                            helperText={checkForm.emailMessage !== '' && checkForm.emailMessage}
                            error={checkForm.emailMessage !== ''}
                            name="email"
                            value={checkForm.emailValue}
                            onChange={handleInputChange}
                            required
                        />
                    </FormControl>
                </Grid>
                <Grid
                    item
                    xs={12} md={12} lg={12}
                >
                    <FormControl fullWidth>
                        <TextField
                            id="outlined-basic"
                            label="Discord"
                            variant="outlined"
                            type="text"
                            inputRef={props.input.discord}
                            helperText={checkForm.discordMessage !== '' && checkForm.discordMessage}
                            error={checkForm.discordMessage !== ''}
                            name="discord"
                            value={checkForm.discordValue}
                            onChange={handleInputChange}
                        />
                    </FormControl>
                </Grid>
                <Grid
                    item
                    xs={12} md={12} lg={12}
                >
                    <FormControl fullWidth>
                        <TextField
                            id="outlined-basic"
                            label="Adresse"
                            variant="outlined"
                            type="text"
                            inputRef={props.input.address}
                            helperText={checkForm.addressMessage !== '' && checkForm.addressMessage}
                            error={checkForm.addressMessage !== ''}
                            name="address"
                            value={checkForm.addressValue}
                            onChange={handleInputChange}
                        />
                    </FormControl>
                </Grid>
                <Grid
                    item
                    xs={12} md={12} lg={12}
                >
                    <FormControl fullWidth>
                        <TextField
                            id="outlined-basic"
                            label="Code Postal"
                            variant="outlined"
                            type="text"
                            inputRef={props.input.zip}
                            helperText={checkForm.zipMessage !== '' && checkForm.zipMessage}
                            error={checkForm.zipMessage !== ''}
                            name="zip"
                            value={checkForm.zipValue}
                            onChange={handleInputChange}
                        />
                    </FormControl>
                </Grid>
                <Grid
                    item
                    xs={12} md={12} lg={12}
                >
                    <FormControl fullWidth>
                        <TextField
                            id="outlined-basic"
                            label="Ville"
                            variant="outlined"
                            type="text"
                            inputRef={props.input.city}
                            helperText={checkForm.cityMessage !== '' && checkForm.cityMessage}
                            error={checkForm.cityMessage !== ''}
                            name="city"
                            value={checkForm.cityValue}
                            onChange={handleInputChange}
                        />
                    </FormControl>
                </Grid>
                <Grid
                    item
                    xs={12} md={12} lg={12}
                >
                    <FormControl fullWidth>
                        <TextField
                            id="outlined-basic"
                            label="Rôle"
                            variant="outlined"
                            type="text"
                            inputRef={props.input.role}
                            helperText={checkForm.roleMessage !== '' && checkForm.roleMessage}
                            error={checkForm.roleMessage !== ''}
                            name="role"
                            value={checkForm.roleValue}
                            onChange={handleInputChange}
                        />
                    </FormControl>
                </Grid>
                <Grid
                    item
                    xs={12} md={12} lg={12}
                >
                    <FormControl fullWidth>
                        <TextField
                            id="outlined-basic"
                            label="Etat"
                            variant="outlined"
                            type="text"
                            inputRef={props.input.userState}
                            helperText={checkForm.userStateMessage !== '' && checkForm.userStateMessage}
                            error={checkForm.userStateMessage !== ''}
                            name="userState"
                            value={checkForm.userStateValue}
                            onChange={handleInputChange}
                        />
                    </FormControl>
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid
                    item
                    xs={6} md={6} lg={6}
                >
                    <Button onClick={props.handleCloseModal}>Retour</Button>
                </Grid>
                <Grid
                    item
                    xs={6} md={6} lg={6}
                >
                    <Button onClick={() => {
                        props.updateProfil(props.state.user)
                    }}>Valider</Button>

                </Grid>
            </Grid>
        </Box>
    )
}