import React, {useState} from 'react'
import GameItem from './GameItem/GameItem'
import {Checkbox, FormControlLabel} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {Grid} from "@mui/material";

export default function GameList(props) {

    /**
     * création d'une liste de jeu à envoyer dans la collection UserGame
     * @param e (event)
     * @param index (index du jeu)
     */
    const onGameClick = (e, index) => {
        // récupération de l'index du jeu et vérification de sa présence dans la liste du user
        let gameArrayIndex = props.gameArray.indexOf(props.games.games[index])
        // si -1, le jeu ne se trouve pas dans la liste
        if (gameArrayIndex === -1) {
            // envoie du jeu dans la liste
            props.gameArray.push(props.games.games[index])
            // changement de class
            e.target.className = "thumbnail hover"
        } else {
            // suppression du jeu de la liste
            props.gameArray.splice(gameArrayIndex, 1)
            // changement de class
            e.target.className = "thumbnail"
        }
    }

    return (
        <Grid
            container
            spacing={3}
            jusitfyContent="space-around"
            alignItems="center"
        >
            {
                props.games.games.map((game, index) => {
                        return (
                            <div>
                                <GameItem
                                    key={game._id}
                                    gameId={game._id}
                                    game_name={game.game_name}
                                    onGameClick={(e) => onGameClick(e, index)}
                                    game_pic={game.game_pic}
                                    userId={props.authUserId}
                                />
                            </div>
                        )
                    }
                )
            }
            {/*<Button*/}
            {/*    color="primary"*/}
            {/*    variant="contained"*/}
            {/*    justifyContent="flex-end"*/}
            {/*    onClick={props.addGameToPlaylist}*/}
            {/*>*/}
            {/*    Add to my playlist*/}
            {/*</Button>*/}
        </Grid>
    )
}