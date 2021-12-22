import React, {useState} from 'react'
import {Box, FormControl, TextField} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import validForm from "../../../../Tools/ValidForms";

export default function UpdateGameForm(props) {

    const [checkForm, setCheckForm] = useState({
        gameNameValue: props.state.game.game_name ? props.state.game.game_name : '',
        gameNameMessage: '',
        gameDescValue: props.state.game.game_desc ? props.state.game.game_desc : '',
        gameDescMessage: '',
        gamePicValue: props.state.game.game_pic ? props.state.game.game_pic : '',
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
                            label="Titre du jeu"
                            variant="outlined"
                            type="text"
                            inputRef={props.input.gameName}
                            helperText={checkForm.gameNameMessage !== '' && checkForm.gameNameMessage}
                            error={checkForm.gameNameMessage !== ''}
                            name="gameName"
                            value={checkForm.gameNameValue}
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
                            label="Description"
                            variant="outlined"
                            type="text"
                            inputRef={props.input.gameDesc}
                            helperText={checkForm.gameDescMessage !== '' && checkForm.gameDescMessage}
                            error={checkForm.gameDescMessage !== ''}
                            name="gameDesc"
                            value={checkForm.gameDescValue}
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
                            label="Image"
                            variant="outlined"
                            type="text"
                            inputRef={props.input.gamePic}
                            helperText={checkForm.gamePicMessage !== '' && checkForm.gamePicMessage}
                            error={checkForm.gamePicMessage !== ''}
                            name="gamePic"
                            value={checkForm.gamePicValue}
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
                        props.updateGame(props.state.game)
                    }}>Valider</Button>

                </Grid>
            </Grid>
        </Box>
    )
}