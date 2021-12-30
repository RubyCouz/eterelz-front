import React, {useState} from 'react'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import Button from '@mui/material/Button'
import validForm from '../../../../Tools/ValidForms'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import Stack from '@mui/material/Stack'
import {DesktopDateTimePicker} from "@mui/lab";
import styled from "@emotion/styled";

const Android12Switch = styled(Switch)(({theme}) => ({
    padding: 8,
    '& .MuiSwitch-track': {
        borderRadius: 22 / 2,
        '&:before, &:after': {
            content: '""',
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)',
            width: 16,
            height: 16,
        },
        '&:before': {
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
            left: 12,
        },
        '&:after': {
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path d="M19,13H5V11H19V13Z" /></svg>')`,
            right: 12,
        },
    },
    '& .MuiSwitch-thumb': {
        boxShadow: 'none',
        width: 16,
        height: 16,
        margin: 2,
    },
}));

export default function AddUserForm(props) {
    const [checkForm, setCheckForm] = useState({
        eventNameValue: '',
        eventNameMessage: '',
        eventStartValue: '',
        eventStartMessage: '',
        eventEndValue: '',
        eventEndMessage: '',
        eventDescValue: '',
        eventDescMessage: '',
        eventScoreValue: '',
        eventScoreMessage: '',
        eventWinnerValue: '',
        eventWinnerMessage: '',
    })
    const [start, setStart] = useState(new Date(checkForm.eventStartValue ? checkForm.eventStartValue : ''))
    const [end, setEnd] = useState(new Date(checkForm.eventEndValue ? checkForm.eventEndValue : ''))

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
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <Stack spacing={3}>
                                <DesktopDateTimePicker
                                    label="Début"
                                    value={start}
                                    minDate={new Date()}
                                    minTime={new Date()}
                                    onChange={(newValue) => {
                                        setStart(newValue);
                                    }}
                                    renderInput={(params) => <TextField {...params} variant="outlined" name="eventStart"
                                                                        inputRef={props.input.eventStart}/>}
                                />
                            </Stack>
                        </LocalizationProvider>
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={12} lg={12}>
                    <FormControl fullWidth>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <Stack spacing={3}>
                                <DesktopDateTimePicker
                                    label="Fin"
                                    value={end}
                                    minDate={new Date(start)}
                                    minTime={new Date(start)}
                                    onChange={(newValue) => {
                                        setEnd(newValue);
                                    }}
                                    renderInput={(params) => <TextField {...params} variant="outlined" name="eventEnd"
                                                                        inputRef={props.input.eventEnd}/>}
                                />
                            </Stack>
                        </LocalizationProvider>
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={12} lg={12}>
                    <FormControlLabel
                        ref={props.input.eventAllDay}
                        name="eventAllDay"
                        control={<Android12Switch/>}
                        onChange={props.handleSwitchChange}
                        label="Event sur toute la journée ?"
                        labelPlacement="start"
                        value={props.allDay}
                    />
                </Grid>
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
                            label="Description"
                            variant="outlined"
                            type="text"
                            inputRef={props.input.eventDesc}
                            helperText={checkForm.eventDescMessage !== '' && checkForm.eventDescMessage}
                            error={checkForm.eventDescMessage !== ''}
                            name="eventDesc"
                            value={checkForm.eventDescValue ? checkForm.eventDescValue : ''}
                            onChange={handleInputChange}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={12} lg={12}>
                    <FormControl fullWidth>
                        <input
                            className="fileInput"
                            type="file"
                            onChange={props.onfileChange}
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
                    <Button onClick={() => {
                        props.addEvent()
                    }}>Valider</Button>
                </Grid>
            </Grid>
        </Box>
    )
}