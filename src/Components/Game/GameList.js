import React from 'react'
import GameItem from './GameItem/GameItem'
export default function GameList(props) {
    return(
        <ul>
            {
                props.games.map(game =>
                    <GameItem
                        key={game._id}
                        gameId={game._id}
                        game_name={game.game_name}
                        game_desc={game.game_desc}
                        userId={props.authUserId}
                    />
                )
            }
        </ul>
    )
}