import React from 'react'
import './GameItem.css'
import {Grid} from "@mui/material";

export default function GameItem(props) {
    return (
    <Grid
        item
        xs={12}
        sm={6}
        md={4}
        lg={3}
    >
        <h3>{props.game_name}</h3>
        <img
            key={props.key}
            data-id={props.key}
            src={"http://localhost:8080/Upload/Game/" + props.game_pic}
            alt={"Jaquette de " + props.game_name} title={props.game_name}
            className="thumbnail"
            onClick={props.onGameClick}
        />
        <p>{props.game_desc}</p>
    </Grid>
    )
}