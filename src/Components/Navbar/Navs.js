import React, { useContext } from 'react'
import clsx from 'clsx'

import {
    NavLink,
} from 'react-router-dom'

import {
    makeStyles,
    useTheme,
} from '@material-ui/core/styles'

import {
    Menu as MenuIcon,
    ChevronLeft as ChevronLeftIcon,
    ChevronRight as ChevronRightIcon,
    EventNoteTwoTone as EventNoteTwoToneIcon,
    ExitToAppTwoTone as ExitToAppTwoToneIcon,
    AccountCircle as AccountCircleIcon,
} from '@material-ui/icons'

import {
    CssBaseline,
    MenuItem,
    Drawer,
    AppBar,
    Toolbar,
    List,
    Divider,
    IconButton,
    ListItem,
    ListItemIcon,
    ListItemText,
} from "@material-ui/core"

import AuthContext from '../../context/auth-context'

const drawerWidth = 240

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
}));

export default function Navbar() {
    const classes = useStyles();
    const theme = useTheme();

    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const auth = useContext(AuthContext)
    
    return (
        <>
            <CssBaseline/>
            <AppBar
                position="fixed"
                className={
                    clsx(classes.appBar, {
                        [classes.appBarShift]: open,
                    })
                }
            >
                <Toolbar>
                    <IconButton
                        color = "inherit"
                        aria-label = "open drawer"
                        onClick = {handleDrawerOpen}
                        edge = "start"
                        className = {
                            clsx(classes.menuButton, {
                                [classes.hide]: open,
                            })
                        }
                    >
                        <MenuIcon/>
                    </IconButton>
                    <img 
                        src="./img/themes/logo.png"
                        alt="Logo EterelZ"
                        className={classes.logo}
                    />
                    <MenuItem>
                        <NavLink to="/auth">
                            <IconButton
                                aria-label="account of current user"
                                aria-controls="primary-search-account-menu"
                                aria-haspopup="true"
                                color="inherit"
                            >
                                <AccountCircleIcon/>
                            </IconButton>
                        </NavLink>
                    </MenuItem>

                </Toolbar>
            </AppBar>
            <Drawer
                elevation={0}
                color="primary" 
                variant="permanent"
                /*className={
                    clsx(classes.drawer, {
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    })
                }*/
                classes={{
                    paperAnchorDockedLeft: clsx({
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    }),
                }}
            >
                <div
                    className={classes.toolbar}
                >
                    <IconButton
                        onClick={handleDrawerClose}
                    >
                        {theme.direction === 'rtl' ? <ChevronRightIcon/> : <ChevronLeftIcon/>}
                    </IconButton>
                </div>
                <Divider/>
                <List color="secondary">
                    {
                        auth.token &&
                            <>
                                {/*<ListItem button key="engagement">*/}
                                {/*    <ListItemIcon><AccountBoxTwoToneIcon/></ListItemIcon>*/}
                                {/*    <NavLink>Participation aux events</NavLink>*/}
                                {/*</ListItem>*/}
                                <ListItem button key="logout" onClick={auth.logout} className={classes.listItem}>
                                    <ListItemIcon><ExitToAppTwoToneIcon/></ListItemIcon>
                                    <ListItemText primary="Déconnexion"/>
                                </ListItem>
                            </>
                    }
                    {
                        (auth.token && auth.playload.userRole === 'admin') &&
                            <ListItem
                                button
                                key="backOffice"
                                component={NavLink}
                                to="/backOffice"
                                onClick={handleDrawerClose}
                                className={classes.listItem}
                            >
                                <ListItemIcon><EventNoteTwoToneIcon/></ListItemIcon>
                                <ListItemText primary="BackOffice"/>
                            </ListItem>
                    }
                    <ListItem 
                        button
                        key="events"
                        component={NavLink}
                        to="/events"
                        onClick={handleDrawerClose}
                        className={classes.listItem}
                    >
                        <ListItemIcon><EventNoteTwoToneIcon/></ListItemIcon>
                        <ListItemText primary="Events"/>
                    </ListItem>
                </List>
            </Drawer>
        </>

    )
}



