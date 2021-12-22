import React, {useState} from 'react'
import Grid from "@material-ui/core/Grid";
import {Box, FormControl, TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import validForm from "../../../../Tools/ValidForms";

export default function AddUserForm(props) {
    const [checkForm, setCheckForm] = useState({
        pseudoValue: '',
        pseudoMessage: '',
        emailValue: '',
        emailMessage: '',
        discordValue: '',
        discordMessage: '',
        addressValue: '',
        addressMessage: '',
        zipValue: '',
        zipMessage: '',
        cityValue: '',
        cityMessage: '',
        roleValue: '',
        roleMessage: '',
        userStateValue: '',
        userStateMessage: '',
    })
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
    return (
        <Box
            sx={props.style}
            component="form"
            noValidate
            autoComplete="off"
        >
        <Grid container spacing={2}>
            <Grid item xs={12} md={12} lg={12}>
                <FormControl fullWidth>
                    <TextField
                        id="outlined-basic"
                        label="Email"
                        variant="outlined"
                        type="email"
                        inputRef={props.refEmail}
                        helperText={checkForm.emailMessage !== '' && checkForm.emailMessage}
                        error={checkForm.emailMessage !== ''}
                        name="email"
                        value={checkForm.emailValue ? checkForm.emailValue : ''}
                        onChange={handleInputChange}
                    />
                </FormControl>
            </Grid>
        </Grid>
            <Grid container spacing={2}
            >
                <Grid item xs={6} md={6} lg={6}>
                    <Button onClick={props.handleCloseModal}>Retour</Button>
                </Grid>
                <Grid item xs={6} md={6} lg={6}>
                    <Button onClick={() => {props.createUserProfil()}}>Valider</Button>
                </Grid>
            </Grid>
        </Box>
    )
}