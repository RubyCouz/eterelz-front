import * as React from 'react'
import LittleCard from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import ReactPlayer from 'react-player'

import {makeStyles} from "@material-ui/core/styles";


import './Card.css'




const reactPlayerStyle = {
    margin: 0,
    padding: 0
}

export default function Card(props) {
    const useStyle = makeStyles((theme) => ({
            backgroundUrl: {
                '&:before': {
                    opacity: props.opacity,
                    backgroundImage: 'url(' + props.bgUrl + ')'
                }
            }
        })
    )
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    let classes = useStyle()

    return (
        <div className={classes.backgroundUrl + ' demo-wrap'}>
            <div className="demo-content">
                <LittleCard sx={{maxWidth: 345}} className="card">
                    <CardHeader className="cardHeader"
                                avatar={
                                    <div>
                                        {
                                            props.icon &&
                                            <Avatar sx={{width: 64, height: 64}} aria-label="recipe" variant="square" className="cardAvatar">
                                                <img src={props.icon} alt="profil pic" title="profil pic NVALV" className="profilPic"/>
                                            </Avatar>
                                        }
                                    </div>
                                }
                                action={
                                    <div>
                                        {
                                            props.firstAction &&
                                            <IconButton
                                                aria-label="settings"
                                                id={props.moreVertIconId}
                                                aria-controls={props.menuID}
                                                aria-haspopup="true"
                                                aria-expanded={open ? 'true' : undefined}
                                                onClick={handleClick}
                                            >
                                                <MoreVertIcon className="menuIcon"/>
                                            </IconButton>
                                        }
                                    </div>
                                }
                                title={props.title}
                                subheader={props.firstContent + ' ' + props.secondContent}
                    />
                    {
                        props.firstAction &&
                        <Menu
                            id={props.menuID}
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}

                        >
                            <div className="menu">
                                <MenuItem onClick={handleClose}>
                                    <a href={props.firstLink} target="_blanked">{props.firstAction}</a>
                                </MenuItem>
                                {
                                    props.secondAction &&
                                    <MenuItem onClick={handleClose}>
                                        <a href={props.secondLink} target="_blanked">{props.secondAction}</a>
                                    </MenuItem>
                                }
                                {
                                    props.thirdAction &&
                                    <MenuItem onClick={handleClose}>
                                        <a href={props.thirdLink} target="_blanked">{props.thirdAction}</a>
                                    </MenuItem>
                                }
                            </div>
                        </Menu>
                    }
                    {
                        (props.content || props.url) &&
                        <CardContent>
                            <Typography variant="body2" color="text.secondary">
                                {
                                    props.url ?
                                        <ReactPlayer
                                            autoplay={true}
                                            url={props.url}
                                            width="100%"
                                            height="100%"
                                            style={reactPlayerStyle}
                                            muted={true}
                                            controls={true}
                                            config={{
                                                twitch: {
                                                    autoplay: true
                                                }
                                            }}
                                        />
                                        :
                                        props.content
                                }

                            </Typography>
                        </CardContent>
                    }
                </LittleCard>
            </div>
        </div>
    );
}
