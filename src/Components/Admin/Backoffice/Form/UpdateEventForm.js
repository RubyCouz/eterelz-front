import React, {useState} from 'react'
import Grid from "@material-ui/core/Grid";
import {Box, FormControl, TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import validForm from "../../../../Tools/ValidForms";

export default function UpdateEventForm(props) {
    const [checkForm, setCheckForm] = useState({
        eventNameValue: '',
        eventNameMessage: '',
        eventDateValue: '',
        eventDateMessage: '',
        eventDescValue: '',
        eventDescMessage: '',
        eventScoreValue: '',
        eventScoreMessage: '',
        eventWinnerValue: '',
        eventWinnerMessage: '',
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
                            label="Nom de l'event"
                            variant="outlined"
                            type="text"
                            inputRef={props.input.eventName}
                            helperText={checkForm.eventNameMessage !== '' && checkForm.eventNameMessage}
                            error={checkForm.eventNameMessage !== ''}
                            name="eventName"
                            value={checkForm.eventNameValue ? checkForm.eventNameValue : ''}
                            onChange={handleInputChange}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={12} lg={12}>
                    <FormControl fullWidth>
                        <TextField
                            id="outlined-basic"
                            label="Date"
                            variant="outlined"
                            type="datetime-local"
                            inputRef={props.input.eventDate}
                            helperText={checkForm.eventDateMessage !== '' && checkForm.eventDateMessage}
                            error={checkForm.eventDateMessage !== ''}
                            name="email"
                            value={checkForm.eventDateValue ? checkForm.eventDateValue : ''}
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
                            type="text"
                            inputRef={props.input.eventDesc}
                            helperText={checkForm.eventDescMessage !== '' && checkForm.eventDescMessage}
                            error={checkForm.eventDescMessage !== ''}
                            name="email"
                            value={checkForm.eventDescValue ? checkForm.eventDescValue : ''}
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
                    <Button onClick={() => {props.updateEvent(props.state.game)}}>Valider</Button>
                </Grid>
            </Grid>
        </Box>
    )
}