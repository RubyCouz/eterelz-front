import React, {useContext, useState} from 'react'
import './UserGameItem.css'

export default function UserGameItem(props) {
    return (
    <div>
        <h3>{props.game_name}</h3>
        <p>{props.game_desc}</p>
        <img
            src={"http://localhost:8080/Upload/Game/" + props.game_pic}
            alt={"Jaquette de " + props.game_name} title={props.game_name}
            className="thumbnail"
            onClick={props.onGameClick}
        />
    </div>
    )
}