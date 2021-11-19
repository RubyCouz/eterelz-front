import * as React from 'react'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import { red } from '@mui/material/colors'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import './TeamCard.css'

export default function TeamCard(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <Card sx={{ maxWidth: 345 }} className="card">
            <CardHeader
                avatar={
                    <Avatar sx={{ width: 64, height: 64 }} aria-label="recipe" variant="square">
                        <img src={props.icon} alt="profil pic" title="profil pic NVALV" className="profilPic"/>
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon
                            id={props.moreVertIconId}
                            aria-controls={props.menuID}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}
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
                            <MenuItem onClick={handleClose}>
                                <a href={props.firstLink} target="_blanked">{props.firstAction}</a>
                            </MenuItem>
                            <MenuItem onClick={handleClose}>
                                <a href={props.secondLink} target="_blanked">{props.secondAction}</a>
                            </MenuItem>
                            <MenuItem onClick={handleClose}>
                                <a href={props.thirdLink} target="_blanked">{props.thirdAction}</a>
                                </MenuItem>
                        </Menu>
                    </IconButton>
                }
                title={props.title}
                subheader={props.firstContent + ' ' + props.secondContent}
            />
        </Card>
    );
}
