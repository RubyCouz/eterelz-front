import React, {useState} from 'react'
import {createMuiTheme, CssBaseline, MenuItem, ThemeProvider} from "@material-ui/core"
import Switch from "@material-ui/core/Switch"
import {blue, deepPurple, lightBlue, purple, red} from "@material-ui/core/colors";

export default function ModeButton(props) {


    return (
        <Switch
            onChange={props.changeMode}
            defaultChecked
            color="default"
            inputProps={{ 'aria-label': 'checkbox with default color' }}
        />
    )
}