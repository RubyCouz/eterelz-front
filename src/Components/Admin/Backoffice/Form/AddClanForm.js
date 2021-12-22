import React, {useState} from 'react'
import Grid from "@material-ui/core/Grid";
import {Box, FormControl, TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import validForm from "../../../../Tools/ValidForms";

export default function AddUserForm(props) {
    const [checkForm, setCheckForm] = useState({
        clanNameValue: '',
        clanNameMessage: '',
        clanBannerValue: '',
        clanBannerMessage: '',
        clanDescValue: '',
        clanDescMessage: '',
        clanDiscordValue: '',
        clanDiscordMessage: '',
        clanRecrutValue: '',
        clanRecrutMessage: '',
        clanPopulationValue: '',
        clanPopulationMessage: '',
        clanActivityValue: '',
        clanActivityMessage: '',
    })
    const handleInputChange = async (event) => {
        const value = event.target.value
        const input = event.target.name
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
                            label="Nom du clan"
                            variant="outlined"
                            type="text"
                            inputRef={props.input.clanName}
                            helperText={checkForm.clanNameMessage !== '' && checkForm.clanNameMessage}
                            error={checkForm.clanNameMessage !== ''}
                            name="clanName"
                            value={checkForm.clanNameValue ? checkForm.clanNameValue : ''}
                            onChange={handleInputChange}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={12} lg={12}>
                    <FormControl fullWidth>
                        <TextField
                            id="outlined-basic"
                            label="Description"
                            variant="outlined"
                            type="datetime-local"
                            inputRef={props.input.clanDesc}
                            helperText={checkForm.clanDescMessage !== '' && checkForm.clanDescMessage}
                            error={checkForm.clanDescMessage !== ''}
                            name="clanDesc"
                            value={checkForm.clanDescValue ? checkForm.clanDescValue : ''}
                            onChange={handleInputChange}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={12} lg={12}>
                    <FormControl fullWidth>
                        <TextField
                            id="outlined-basic"
                            label="Bannière"
                            variant="outlined"
                            type="text"
                            inputRef={props.input.clanBanner}
                            helperText={checkForm.clanBannerMessage !== '' && checkForm.clanBannerMessage}
                            error={checkForm.clanBannerMessage !== ''}
                            name="clanBanner"
                            value={checkForm.clanBannerValue ? checkForm.clanBannerValue : ''}
                            onChange={handleInputChange}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={12} lg={12}>
                    <FormControl fullWidth>
                        <TextField
                            id="outlined-basic"
                            label="Discord"
                            variant="outlined"
                            type="text"
                            inputRef={props.input.clanDiscord}
                            helperText={checkForm.clanDiscordMessage !== '' && checkForm.clanDiscordMessage}
                            error={checkForm.clanDiscordMessage !== ''}
                            name="clanDiscord"
                            value={checkForm.clanDiscordValue ? checkForm.clanDiscordValue : ''}
                            onChange={handleInputChange}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={12} lg={12}>
                    <FormControl fullWidth>
                        <TextField
                            id="outlined-basic"
                            label="Nombre de membre"
                            variant="outlined"
                            type="text"
                            inputRef={props.input.clanPopulation}
                            helperText={checkForm.clanPopulationMessage !== '' && checkForm.clanPopulationMessage}
                            error={checkForm.clanPopulationMessage !== ''}
                            name="clanPopulation"
                            value={checkForm.clanPopulationValue ? checkForm.clanPopulationValue : ''}
                            onChange={handleInputChange}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={12} lg={12}>
                    <FormControl fullWidth>
                        <TextField
                            id="outlined-basic"
                            label="Activité"
                            variant="outlined"
                            type="text"
                            inputRef={props.input.clanActivity}
                            helperText={checkForm.clanActivityMessage !== '' && checkForm.clanActivityMessage}
                            error={checkForm.clanActivityMessage !== ''}
                            name="clanActivity"
                            value={checkForm.clanActivityValue ? checkForm.clanActivityValue : ''}
                            onChange={handleInputChange}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={12} lg={12}>
                    <FormControl fullWidth>
                        <TextField
                            id="outlined-basic"
                            label="Recrutement"
                            variant="outlined"
                            type="text"
                            inputRef={props.input.clanRecrut}
                            helperText={checkForm.clanRecrutMessage !== '' && checkForm.clanRecrutMessage}
                            error={checkForm.clanRecrutMessage !== ''}
                            name="clanRecrut"
                            value={checkForm.clanRecrutValue ? checkForm.clanRecrutValue : ''}
                            onChange={handleInputChange}
                        />
                    </FormControl>
                </Grid>
            </Grid>
            <Grid container spacing={2}
            >
                <Grid item xs={6} md={6} lg={6}>
                    <Button onClick={props.handleClose}>Retour</Button>
                </Grid>
                <Grid item xs={6} md={6} lg={6}>
                    <Button onClick={() => {props.addClan()}}>Valider</Button>
                </Grid>
            </Grid>
        </Box>
    )
}