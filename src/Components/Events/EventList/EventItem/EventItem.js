import React, {useContext, useState} from 'react'
import './EventItem.css'
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
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';


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
    },
    root: {
        maxWidth: 800,
        marginBottom: 10,
    },

    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
    // media: {
    //     height: 0,
    //     paddingTop: '56.25%', // 16:9
    // },
}));

export default function RecipeReviewCard(props) {
    const classes = useStyles();
    const theme = useTheme();
    const auth = useContext(AuthContext)
    const [state] = useState({
        textModal : '',
        colorTextModal : '',
        colorButton : ''
    })
    // pour modal ouverture de la modal
    const [open, setOpen] = React.useState(false);

    //taille de la modal de supp et archive
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

    //confirmation d'une action sur modal delete et archive
    const confirmModal = () => {

        if(state.textModal==='supprimer'){
            props.deleteEvent({
                variables:{
                    id:props.eventId
                }
            })
            ModalClose()
        }
        else{
            ModalClose()
        }
    }




    //expension de la carte (pour voir les infos)
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (

        <Card className={classes.root}>
            <div>
                {/*//modal suppression et archivage */}
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
            {/*carte affichage d'un event*/}
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                        R
                    </Avatar>
                }
                //bouton d'action
                action={

                    <IconButton aria-label="settings" onClick={props.showDialogSetting}>

                        <MoreVertIcon  />
                    </IconButton>
                }
                //titre
                title="Nom de l'utilisateur"
                //date
                subheader={new Date(props.event_date).toLocaleString()}
            />
            {/*------------Ajout d'image------------------*/}
            {/*<CardMedia*/}
            {/*    className={classes.media}*/}
            {/*    image="/static/images/cards/paella.jpg"*/}
            {/*    title="Paella dish"*/}
            {/*/>*/}
            <CardContent>
                {/*//titre de l'event*/}
                <Typography variant="body2" color="textSecondary" component="p">
                    {props.event_name}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>

                {

                    //Si l'utilisateur est le créateur affiche :
                    props.userId === props.creatorId ?
                        <div>
                            <p>Your the owner of the event</p>
                            <IconButton aria-label="add to favorites">
                                <StarIcon />
                            </IconButton>
                            <IconButton onClick={props.onDetail.bind(this, props.eventId)}>
                                <PageviewIcon/>
                            </IconButton>

                            <IconButton aria-label="edit" onClick={() => props.openModal({updating: true, id : props.eventId})}>
                                <EditIcon/>
                            </IconButton>
                            <IconButton aria-label="delete" onClick={deleteModal}>
                                <DeleteIcon/>
                            </IconButton>
                            {
                                //si connecté et admin affiche archive sur event crée
                                (auth.token && auth.playload.userRole === 'admin') &&
                                <IconButton aria-label="archive" onClick={archiveModal}>
                                    <ArchiveIcon/>
                                </IconButton>
                            }
                        </div>
                        :
                        <div>
                            <IconButton aria-label="add to favorites">
                                <StarIcon />
                            </IconButton>
                            <IconButton onClick={props.onDetail.bind(this, props.eventId)}>
                                <PageviewIcon/>
                            </IconButton>

                            {
                                //edition sur les évent non crées
                                (auth.token && auth.playload.userRole === 'admin') &&
                                <IconButton aria-label="edit" onClick={() => props.openModal({updating: true, id : props.eventId})}>
                                    <EditIcon/>
                                </IconButton>
                            }
                            {
                                //si connecté et admin affiche delete sur events non crée
                                (auth.token && auth.playload.userRole === 'admin') &&
                                <IconButton aria-label="delete" onClick={deleteModal}>
                                    <DeleteIcon/>
                                </IconButton>
                            }
                            {
                                //si connecté et admin affiche archive sur events non crée
                                (auth.token && auth.playload.userRole === 'admin') &&
                                <IconButton aria-label="archive" onClick={archiveModal}>
                                    <ArchiveIcon/>
                                </IconButton>
                            }

                        </div>
                }

                <IconButton

                    className={clsx(classes.expand, {
                        [classes.expandOpen]: expanded,
                    })}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >

                    <ExpandMoreIcon />
                </IconButton>
                <IconButton aria-label="share">
                    <ShareIcon />
                </IconButton>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography paragraph>
                        {props.event_name}
                    </Typography>
                    <Typography paragraph>
                        {props.children}
                        {props.userLogin}
                    </Typography>
                </CardContent>
            </Collapse>
        </Card>
    );
}
