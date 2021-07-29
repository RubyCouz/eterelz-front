import React from 'react'
import './EventItem.css'
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PageviewIcon from '@material-ui/icons/Pageview';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import { pink } from '@material-ui/core/colors';


const useStyles = makeStyles((theme) => ({
    pink: {
        color: theme.palette.getContrastText(pink[500]),
        backgroundColor: pink[500],
    },

}));

export default function EventItem(props) {
    const classes = useStyles();

    return (
        <li
            className="events__list-item"
        >
            <div>
                <h2>{props.event_name}</h2>
                <h3>{new Date(props.event_date).toLocaleString()}</h3>
                <Fab aria-label="like">
                    <FavoriteIcon />
                </Fab>
            </div>
            <div>
                {
                    props.userId === props.creatorId ?
                        <div>
                            <p>Your the owner of the event</p>
                            <Fab color="secondary" aria-label="edit">
                                <EditIcon />
                            </Fab>
                            <Fab color="red" aria-label="delete">
                                <DeleteIcon />
                            </Fab>
                        </div>
                        :
                        <div>
                                <Avatar className={classes.pink} onClick = {props.onDetail.bind(this, props.eventId)}>
                                    <PageviewIcon />
                                </Avatar>

                        </div>
                }

            </div>
        </li>
    )
}
