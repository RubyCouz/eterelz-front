// import React from 'react'
// import { makeStyles } from '@material-ui/core/styles'
// import Modal from '@material-ui/core/Modal'
// import Backdrop from '@material-ui/core/Backdrop'
// import Fade from '@material-ui/core/Fade'

//
// const useStyles = makeStyles((theme) => ({
//     modal: {
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     paper: {
//         backgroundColor: theme.palette.background.paper,
//         border: '2px solid #000',
//         boxShadow: theme.shadows[5],
//         padding: theme.spacing(2, 4, 3),
//     },
// }))
//
// export default function (props) {
//     const classes = useStyles();
//     return(
//         <Modal
//             aria-labelledby="transition-modal-title"
//             aria-describedby="transition-modal-description"
//             className={classes.modal}
//             open={props.open}
//             onClose={props.handleClose}
//             closeAfterTransition
//             BackdropComponent={Backdrop}
//             BackdropProps={{
//                 timeout: 500,
//             }}
//         >
//             <Fade in={props.open}>
//                 <div className={classes.paper}>
//
//
//                 </div>
//             </Fade>
//         </Modal>
//     )
// }

import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import GameList from "../Game/GameList";


export default function ModalGame(props) {


    const descriptionElementRef = React.useRef(null);
    React.useEffect(() => {
        if (props.open) {
            const {current: descriptionElement} = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [props.open]);

    return (
        <div>
            <Dialog
                open={props.open}
                onClose={props.handleClose}
                scroll={props.scroll}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogTitle id="scroll-dialog-title">Subscribe</DialogTitle>
                <DialogContent dividers={props.scroll === 'paper'}>
                    <DialogContentText
                        id="scroll-dialog-description"
                        ref={descriptionElementRef}
                        tabIndex={-1}
                    >
                        <h2>Liste des Jeux</h2>
                        <GameList
                            gameArray={props.gameArray}
                            addGameToPlaylist={props.addGameToPlaylist}
                            game_choice={props.game_choice}
                            games={props.games}
                        />
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.handleClose}>Cancel</Button>
                    <Button onClick={props.addGameToPlaylist}>Add to my playlist</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
