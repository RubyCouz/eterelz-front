import React, {useContext, useEffect, useState} from 'react'
import {makeStyles} from '@mui/styles'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import InputBase from '@mui/material/InputBase'
import Badge from '@mui/material/Badge'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search'
import MailIcon from '@mui/icons-material/Mail'
import NotificationsIcon from '@mui/icons-material/Notifications'
import MoreIcon from '@mui/icons-material/MoreVert'
import MenuItem from '@mui/material/MenuItem'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import clsx from 'clsx'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ExitToAppTwoToneIcon from '@mui/icons-material/ExitToAppTwoTone'
import ListItemText from '@mui/material/ListItemText'
import {NavLink} from 'react-router-dom'
import AuthContext from '../../context/auth-context'
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded'
import SportsEsportsRoundedIcon from '@mui/icons-material/SportsEsportsRounded'
import GamepadIcon from '@mui/icons-material/Gamepad'
import GroupIcon from '@mui/icons-material/Group'
import ListIcon from '@mui/icons-material/List'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import EventNoteTwoToneIcon from '@mui/icons-material/EventNoteTwoTone'
import Avatar from '@mui/material/Avatar'
import {USERBYID} from '../../Queries/UserQueries'
import {useQuery} from "@apollo/client";

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
        width: '100%',
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: theme.palette.common.white,
        '&:hover': {
            backgroundColor: theme.palette.common.white
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    }, logo: {
        width: '150px',
    },
    list: {
        width: 250,
    },
}));

export default function AuthNavbar(props) {
    const auth = useContext(AuthContext)
    const id = auth.playload.userId
    const classes = useStyles()
    const {data} = useQuery(
        USERBYID,
        {
            variables: {id}
        }
    )
    const [user, setUser] = useState('')
    useEffect(() => {
        if (data !== undefined) {
            setUser(data)
        }
    }, [data])
    const [state, setState] = useState({
        left: false
    })
    const toggleDrawer = (anchor, open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return
        }

        setState({...state, [anchor]: open});
    }
    const list = (anchor) => (
        <div
            className={clsx(classes.list, {
                [classes.fullList]: anchor === 'top' || anchor === 'bottom',
            })}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <div className={classes.drawerHeader}>

            </div>
            <Divider/>
            <List color="secondary">
                <ListItem
                    button
                    key="dashboard"
                    component={NavLink}
                    to="/dashboard"
                    onClick={toggleDrawer(anchor, false)}
                >
                    <ListItemIcon><DashboardRoundedIcon/></ListItemIcon>
                    <ListItemText primary="Dashboard"/>
                </ListItem>
                <ListItem
                    button
                    key="tournaments"
                    component={NavLink}
                    to="tournaments"
                    onClick={toggleDrawer(anchor, false)}
                    className={classes.listItem}
                >
                    <ListItemIcon><SportsEsportsRoundedIcon/></ListItemIcon>
                    <ListItemText primary="Tournaments"/>
                </ListItem>
                <ListItem
                    button
                    key="events"
                    component={NavLink}
                    to="events"
                    onClick={toggleDrawer(anchor, false)}
                    className={classes.listItem}
                >
                    <ListItemIcon><GamepadIcon/></ListItemIcon>
                    <ListItemText primary="Events"/>
                </ListItem>
                <ListItem
                    button
                    key="clan"
                    component={NavLink}
                    to="clans"
                    onClick={toggleDrawer(anchor, false)}
                    className={classes.listItem}
                >
                    <ListItemIcon><GroupIcon/></ListItemIcon>
                    <ListItemText primary="Clan"/>
                </ListItem>
                <ListItem
                    button
                    key="streams"
                    component={NavLink}
                    to="streams"
                    onClick={toggleDrawer(anchor, false)}
                    className={classes.listItem}
                >
                    <ListItemIcon><EventNoteTwoToneIcon/></ListItemIcon>
                    <ListItemText primary="Streams"/>
                </ListItem>
                {
                    (auth.token && auth.playload.userRole === 'admin') &&
                    <div>
                        <Divider/>
                        <ListItem
                            button
                            key="backoffice"
                            component={NavLink}
                            to="/admin/"
                            onClick={toggleDrawer(anchor, false)}
                            className={classes.listItem}
                        >
                            <ListItemIcon><ListIcon/></ListItemIcon>
                            <ListItemText primary="BackOffice"/>
                        </ListItem>
                    </div>
                }
                <Divider/>
                <ListItem
                    button
                    key="profil"
                    component={NavLink}
                    to="account"
                    onClick={toggleDrawer(anchor, false)}
                    className={classes.listItem}
                >
                    <ListItemIcon><AccountCircleIcon/></ListItemIcon>
                    <ListItemText primary="Profil"/>
                </ListItem>
                <Divider/>
                <ListItem
                    button key="logout"
                    onClick={auth.logout}
                    className={classes.listItem}
                    component={NavLink}
                    to="/"
                >
                    <ListItemIcon><ExitToAppTwoToneIcon/></ListItemIcon>
                    <ListItemText primary="Déconnexion"/>
                </ListItem>
            </List>
        </div>
    )

    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{vertical: 'top', horizontal: 'right'}}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{vertical: 'top', horizontal: 'right'}}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <IconButton aria-label="show 4 new mails" color="inherit">
                    <Badge badgeContent={4} color="secondary">
                        <MailIcon/>
                    </Badge>
                </IconButton>
                <p>Messages</p>
            </MenuItem>
            <MenuItem>
                <IconButton aria-label="show 11 new notifications" color="inherit">
                    <Badge badgeContent={11} color="secondary">
                        <NotificationsIcon/>
                    </Badge>
                </IconButton>
                <p>Notifications</p>
            </MenuItem>
        </Menu>
    );

    return (
        <>
            <div className={classes.grow}>
                <AppBar position="static">
                    <Toolbar>
                        {['left'].map((anchor) => (
                            <React.Fragment key={anchor}>
                                <IconButton
                                    edge="start"
                                    className={classes.menuButton}
                                    color="inherit"
                                    aria-label="open drawer"
                                    onClick={toggleDrawer(anchor, true)}
                                >
                                    <MenuIcon/>
                                </IconButton>
                                <SwipeableDrawer
                                    anchor={anchor}
                                    open={state[anchor]}
                                    onClose={toggleDrawer(anchor, false)}
                                    onOpen={toggleDrawer(anchor, true)}
                                >
                                    {list(anchor)}
                                </SwipeableDrawer>
                            </React.Fragment>
                        ))}
                        <NavLink to="/">
                            <img
                                src="/img/themes/logo.png"
                                alt="Logo EterelZ"
                                className={classes.logo}
                            />
                        </NavLink>
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon/>
                            </div>
                            <InputBase
                                placeholder="Search…"
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                                inputProps={{'aria-label': 'search'}}
                            />
                        </div>
                        <div className={classes.grow}/>
                        <div className={classes.sectionDesktop}>
                            <IconButton aria-label="show 4 new mails" color="inherit">
                                <Badge badgeContent={4} color="secondary">
                                    <MailIcon/>
                                </Badge>
                            </IconButton>
                            <IconButton aria-label="show 17 new notifications" color="inherit">
                                <Badge badgeContent={17} color="secondary">
                                    <NotificationsIcon/>
                                </Badge>
                            </IconButton>
                            {user &&
                            <IconButton aria-label="show 17 new notifications" color="inherit">
                                <Avatar
                                    alt={"profilPic de " + data.user.user_login}
                                    src={"http://localhost:8080/Upload/ProfilePic/" + data.user.user_avatar}/>
                            </IconButton>
                            }
                        </div>
                        <div className={classes.sectionMobile}>
                            <IconButton
                                aria-label="show more"
                                aria-controls={mobileMenuId}
                                aria-haspopup="true"
                                onClick={handleMobileMenuOpen}
                                color="inherit"
                            >
                                <MoreIcon/>
                            </IconButton>
                        </div>
                    </Toolbar>
                </AppBar>
                {renderMobileMenu}
            </div>
        </>
    )
}
