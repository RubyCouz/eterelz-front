import React from 'react'
import UserGameItem from './UserGameItem/UserGameItem'
import Grid from '@mui/material/Grid'

export default function UserGameList(props) {
    return (
        <Grid
            container
            spacing={3}
            jusitfyContent="space-around"
            alignItems="center"
        >
            {
                props.games.userGame.map((game, index) => {
                        return (
                            <Grid
                                item
                                xs={12}
                                sm={6}
                                md={4}
                                lg={3}>
                                <div>
                                    <UserGameItem
                                        key={game.game._id}
                                        gameId={game.game._id}
                                        game_name={game.game.game_name}
                                        // onGameClick={() => onGameClick(index)}
                                        game_pic={game.game.game_pic}
                                        userId={props.authUserId}
                                    />
                                </div>
                            </Grid>

                        )
                    }
                )
            }
        </Grid>
    )
}