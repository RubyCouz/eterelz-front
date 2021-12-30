import React, {useState} from 'react'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import validForm from "../../../../Tools/ValidForms";

export default function AddGameForm(props) {
    const [checkForm, setCheckForm] = useState({
        gameNameValue: '',
        gameNameMessage: '',
        gameDescValue: '',
        gameDescMessage: '',
        gamePicValue: '',
        gamePicMessage: '',
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
                            label="Titre"
                            variant="outlined"
                            type="text"
                            inputRef={props.input.gameName}
                            helperText={checkForm.gameNameMessage !== '' && checkForm.gameNameMessage}
                            error={checkForm.gameNameMessage !== ''}
                            name="gameName"
                            value={checkForm.gameNameValue ? checkForm.gameNameValue : ''}
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
                            inputRef={props.input.gameDesc}
                            helperText={checkForm.gameDescMessage !== '' && checkForm.gameDescMessage}
                            error={checkForm.gameDescMessage !== ''}
                            name="gameDesc"
                            value={checkForm.gameDescValue ? checkForm.gameDescValue : ''}
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
                    <Button onClick={() => {props.addGame()}}>Valider</Button>
                </Grid>
            </Grid>
        </Box>
    )
}