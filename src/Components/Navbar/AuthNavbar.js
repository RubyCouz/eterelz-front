import React, {useContext} from 'react'
import {makeStyles} from '@material-ui/core'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import InputBase from '@material-ui/core/InputBase'
import Badge from '@material-ui/core/Badge'
import Menu from '@material-ui/core/Menu'
import MenuIcon from '@material-ui/icons/Menu'
import SearchIcon from '@material-ui/icons/Search'
import MailIcon from '@material-ui/icons/Mail'
import NotificationsIcon from '@material-ui/icons/Notifications'
import MoreIcon from '@material-ui/icons/MoreVert'
import Fab from '@material-ui/core/Fab'
import PropTypes from 'prop-types'
import useScrollTrigger from '@material-ui/core/useScrollTrigger'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import Zoom from '@material-ui/core/Zoom'
import {MenuItem} from '@material-ui/core'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import clsx from 'clsx'
import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import {
    ExitToAppTwoTone as ExitToAppTwoToneIcon
} from '@material-ui/icons'
import ListItemText from '@material-ui/core/ListItemText'
import {NavLink} from 'react-router-dom'
import AuthContext from '../../context/auth-context'
import DashboardRoundedIcon from '@material-ui/icons/DashboardRounded'
import SportsEsportsRoundedIcon from '@material-ui/icons/SportsEsportsRounded'
import GamepadIcon from '@material-ui/icons/Gamepad'
import GroupIcon from '@material-ui/icons/Group'
import ListIcon from '@material-ui/icons/List'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import EventNoteTwoToneIcon from '@material-ui/icons/EventNoteTwoTone'


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

function ScrollTop(props) {
    const {children, window} = props;
    const classes = useStyles();
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
        disableHysteresis: true,
        threshold: 100,
    });

    const handleClick = (event) => {
        const anchor = (event.target.ownerDocument || document).querySelector('#back-to-top-anchor');

        if (anchor) {
            anchor.scrollIntoView({behavior: 'smooth', block: 'center'});
        }
    };
    return (
        <Zoom in={trigger}>
            <div onClick={handleClick} role="presentation" className={classes.root}>
                {children}
            </div>
        </Zoom>
    );
}

ScrollTop.propTypes = {
    children: PropTypes.element.isRequired,
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};
export default function AuthNavbar(props) {
    const auth = useContext(AuthContext)
    const classes = useStyles()

    const [state, setState] = React.useState({
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
                    className={classes.listItem}
                >
                    <ListItemIcon><DashboardRoundedIcon/></ListItemIcon>
                    <ListItemText primary="Dashboard"/>
                </ListItem>
                <ListItem
                    button
                    key="tournaments"
                    component={NavLink}
                    to="/tournaments"
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
                    to="/events"
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
                    to="/clan"
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
                    to="/streams"
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
                                key="backOffice"
                                component={NavLink}
                                to="/backOffice"
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
                    to="/account"
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
                    to="/home"
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
                                src="./img/themes/logo.png"
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
                <ScrollTop {...props}>
                    <Fab color="secondary" size="small" aria-label="scroll back to top">
                        <KeyboardArrowUpIcon/>
                    </Fab>
                </ScrollTop>
            </div>
        </>
    )
}
