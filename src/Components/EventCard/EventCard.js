import * as React from 'react'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import {red} from '@mui/material/colors'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import './EventCard.css'

export default function EventCard(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Card sx={{maxWidth: 345}} className="card">
            <CardHeader
                avatar={
                    <Avatar sx={{bgcolor: red[500]}} aria-label="recipe">
                        R
                    </Avatar>
                }
                action={
                    <IconButton
                        aria-label="settings"
                        id={props.moreVertIconId}
                        aria-controls={props.menuID}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                    >
                        <MoreVertIcon/>

                    </IconButton>
                }
                title="Name of the event"
                subheader="Some description"
            />
            <Menu
                id={props.menuID}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={handleClose}>Action 1</MenuItem>
                <MenuItem onClick={handleClose}>Action 2</MenuItem>
                <MenuItem onClick={handleClose}>Action 3</MenuItem>
            </Menu>
        </Card>
    );
}
