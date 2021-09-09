import React, {useContext, useState} from 'react'
import './GameItem.css'

export default function GameItem(props) {
    return (
    <li>
        <h2>{props.game_name}</h2>
        <p>{props.game_desc}</p>
        <img
            src={"http://localhost:8080/Upload/Game/" + props.game_pic}
            alt={"Jaquette de " + props.game_name} title={props.game_name}
            className="thumbnail"
        />
    </li>
    )
}