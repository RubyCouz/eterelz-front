import React, {useContext} from 'react'
import PropTypes from 'prop-types'
import SwipeableViews from 'react-swipeable-views'
import {makeStyles} from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import IconButton from "@material-ui/core/IconButton"
import {NavLink} from "react-router-dom"
import {
    AccountCircle as AccountCircleIcon
} from "@material-ui/icons";
import { MenuItem } from "@material-ui/core"
import Toolbar from "@material-ui/core/Toolbar";
import AuthContext from "../../context/auth-context";
import ModeButton from '../ModeButton/ModeButton'
import ThemeContext from "../../context/theme-context";

function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
    logo: {
        width: '150px',
    },
}));

export default function Navbar(props) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const [state, setState] = React.useState({
        left: false
    })
    const toggleDrawer = (anchor, open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return
        }

        setState({...state, [anchor]: open});
    }
    const handleChange = (event, newValue) => {
        setValue(newValue);
    }

    const handleChangeIndex = (index) => {
        setValue(index);
    }

    const auth = useContext(AuthContext)

    const changeTheme = useContext(ThemeContext)
    return (
        <>
            <div className={classes.root}>
                <AppBar
                    position="static"
                    color="primary"
                >
                    <Toolbar>

                        <img
                            src="./img/themes/logo.png"
                            alt="Logo EterelZ"
                            className={classes.logo}
                        />
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            indicatorColor="secondary"
                            textColor="inherit"
                            variant="fullWidth"
                            aria-label="full width tabs example"
                        >
                            <Tab label="Tournois / Event" {...a11yProps(0)} />
                            <Tab label="Les Streams" {...a11yProps(1)} />
                            <Tab label="Jeux" {...a11yProps(2)} />
                            <Tab label="La commu EterelZ" {...a11yProps(3)} />
                        </Tabs>
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
                        <MenuItem>
                            <ModeButton changeMode={changeTheme.theme}/>
                        </MenuItem>
                    </Toolbar>
                </AppBar>
                <SwipeableViews
                    axis={props.theme === 'rtl' ? 'x-reverse' : 'x'}
                    index={value}
                    onChangeIndex={handleChangeIndex}
                >
                    <TabPanel value={value} index={0} dir={props.theme}>
                        Page descriptif tournoi / event
                    </TabPanel>
                    <TabPanel value={value} index={1} dir={props.theme}>
                        Page présentation Streamer, aperçu streamer en direct
                    </TabPanel>
                    <TabPanel value={value} index={2} dir={props.theme}>
                        Page Présentation des Jeux de la commu EterelZ
                    </TabPanel>
                    <TabPanel value={value} index={3} dir={props.theme}>
                        Page présentation commu EterelZ
                    </TabPanel>
                </SwipeableViews>
            </div>
        </>
    )
}
