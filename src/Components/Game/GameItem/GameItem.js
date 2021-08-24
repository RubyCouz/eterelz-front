import React, {useContext, useState} from 'react'

export default function GameItem(props) {
    return (
    <li>
        <h2>{props.game_name}</h2>
        <p>{props.game_desc}</p>
    </li>
    )
}