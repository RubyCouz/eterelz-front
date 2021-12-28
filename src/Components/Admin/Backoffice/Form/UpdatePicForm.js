import React from 'react'
import {Box, FormControl} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

export default function UpdatePicForm(props) {


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
                        <input
                            className="fileInput"
                            type="file"
                            onChange={props.onfileChange}
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
                    <Button onClick={props.updatePic}>Valider</Button>

                </Grid>
            </Grid>
        </Box>
    )
}