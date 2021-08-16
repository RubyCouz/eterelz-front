import React, {useContext, useState} from 'react'
import './EventItem.css'
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import PageviewIcon from '@material-ui/icons/Pageview';
import ArchiveIcon from '@material-ui/icons/Archive';
import StarIcon from '@material-ui/icons/Star';
import { makeStyles } from '@material-ui/core/styles';
import {pink, red, yellow, lightGreen, green} from '@material-ui/core/colors';
import AuthContext from "../../../../context/auth-context";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    show: {
        color: theme.palette.getContrastText(pink[500]),
        backgroundColor: pink[500],
    },
    delete: {
        color: theme.palette.getContrastText(red['A700']),
        backgroundColor: red['A700'],
    },
    archive: {
        color: theme.palette.getContrastText(green['A700']),
        backgroundColor: green['A700'],
    },
    star: {
        color: theme.palette.getContrastText(yellow[500]),
        backgroundColor: yellow[500],
    },
    red_font: {
        color : red[600]
    },
    green_font: {
        color : green[600]
    },
    lightGreen : {
        color: theme.palette.getContrastText(lightGreen[500]),
        backgroundColor: lightGreen[500],
}
}));

export default function EventItem(props) {

    const [state] = useState({
        textModal : '',
        colorTextModal : '',
        colorButton : ''
    })

    const classes = useStyles();
    const auth = useContext(AuthContext)

    // pour modal
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    //taille de la modal
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    //fonction appel modal de suppression
    const deleteModal = () => {
        state.textModal = 'supprimer';
        state.colorTextModal = classes.red_font;
        state.colorButton = classes.delete;
        setOpen(true);
    };

    //fonction appel modal d'archivage
    const archiveModal = () => {
        state.textModal = 'archiver';
        state.colorTextModal = classes.green_font;
        state.colorButton = classes.archive;
        setOpen(true);
    };

    //fonction fermeture modal
    const ModalClose = () => {
        setOpen(false);
    };

    //confirmation
    const confirmModal = () => {

        if(state.textModal==='supprimer'){
            console.log('supprimer')
            props.deleteEvent({
                variables:{
                    id:props.eventId
                }
            })
            ModalClose()
        }
        else{
            console.log('archiver')
            ModalClose()
        }
    }



    return (
        <li
            className="events__list-item"
        >
            <div>
                <h2>{props.event_name}</h2>
                <h3>{new Date(props.event_date).toLocaleString()}</h3>
                <Fab className={classes.star} aria-label="star">
                    <StarIcon />
                </Fab>
            </div>
            <div>
                <div>
                    {/*//modal suppression*/}
                    <Dialog
                        fullScreen={fullScreen}
                        open={open}
                        onClose={ModalClose}
                        aria-labelledby="responsive-dialog-title"
                    >
                        <DialogTitle id="responsive-dialog-title">{props.event_name}</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Voulez vous vraiment <span className={state.colorTextModal}>{state.textModal}</span> l'event <span>{props.event_name}</span>?
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button autoFocus onClick={ModalClose} color="primary">
                                Annuler
                            </Button>
                            <Button  className={state.colorButton} autoFocus onClick={confirmModal}>
                                {state.textModal}
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
                {
                    //Si l'utilisateur est le créateur affiche :
                    props.userId === props.creatorId ?
                        <div>
                            <p>Your the owner of the event</p>
                            <Fab className={classes.show} onClick = {props.onDetail.bind(this, props.eventId)}>
                                <PageviewIcon />
                            </Fab>

                            <Fab color="primary" aria-label="edit">
                                <EditIcon />
                            </Fab>
                            <Fab className={classes.delete} aria-label="delete"  onClick={deleteModal} >
                                <DeleteIcon />
                            </Fab>
                            {
                                //si connecté et admin affiche archive sur event crée
                                (auth.token && auth.playload.userRole === 'admin') &&
                                <Fab className={classes.lightGreen} aria-label="archive" onClick={archiveModal} >
                                    <ArchiveIcon />
                                </Fab>
                            }
                        </div>
                        :
                        <div>
                                <Fab className={classes.show} onClick = {props.onDetail.bind(this, props.eventId)}>
                                    <PageviewIcon />
                                </Fab>

                            {
                                //edition sur les évent non crées
                                (auth.token && auth.playload.userRole === 'admin') &&
                                <Fab color="primary" aria-label="edit">
                                    <EditIcon />
                                </Fab>
                            }
                            {
                                //si connecté et admin affiche delete sur events non crée
                                (auth.token && auth.playload.userRole === 'admin') &&
                                <Fab className={classes.delete} aria-label="delete"  onClick={deleteModal} >
                                    <DeleteIcon />
                                </Fab>
                            }
                            {
                                //si connecté et admin affiche archive sur events non crée
                                (auth.token && auth.playload.userRole === 'admin') &&
                                <Fab className={classes.lightGreen} aria-label="archive" onClick={archiveModal}>
                                    <ArchiveIcon />
                                </Fab>
                            }
                        </div>
                }

            </div>
        </li>
    )
}
