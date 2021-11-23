import React from 'react'

import {
    IconButton,
    AppBar,
    MenuItem,
    Toolbar, Menu,
} from '@material-ui/core'
import {AccountCircle} from '@material-ui/icons'
import {makeStyles} from '@material-ui/core/styles'
import Box from "@mui/material/Box"
import {NavLink} from "react-router-dom"
import MoreIcon from "@material-ui/icons/MoreVert"

import './Navbar.css'

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
    navbar: {
        backgroundColor: 'rgb(0,168,212)',
        background: 'linear-gradient(90deg, rgba(0,168,212,1) 0%, rgba(134,24,173,1) 53%)'
    }
}))

export default function Home(props) {

    const classes = useStyles();
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
    const [anchorEl, setAnchorEl] = React.useState(null);


    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    }

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    }

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    }

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>My account</MenuItem>
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle/>
                </IconButton>
                <a href="../Auth">CONNEXION</a>
            </MenuItem>
        </Menu>
    )

    return (
        <div>
            <Box sx={{flexGrow: 1}}>
                <AppBar
                    className={classes.navbar}
                    position="static"
                    // color="primary"
                >
                    <Toolbar>
                        <NavLink to="/">
                            <img
                                src="./img/themes/logo.png"
                                alt="Logo EterelZ"
                                className={classes.logo}
                            />
                        </NavLink>
                        <Box xs={{flexGrow: 1}}>
                            <p className="disclaimer">Corporation of Gamers</p>
                        </Box>
                        <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                            {/*<Tabs*/}
                            {/*    value={value}*/}
                            {/*    onChange={handleChange}*/}
                            {/*    indicatorColor="secondary"*/}
                            {/*    textColor="inherit"*/}
                            {/*    variant="fullWidth"*/}
                            {/*    aria-label="full width tabs example"*/}
                            {/*>*/}
                            {/*    <Tab label="Tournois / Event" {...a11yProps(0)} />*/}
                            {/*    <Tab label="Les Streams" {...a11yProps(1)} />*/}
                            {/*    <Tab label="Jeux" {...a11yProps(2)} />*/}
                            {/*    <Tab label="La commu EterelZ" {...a11yProps(3)} />*/}
                            {/*</Tabs>*/}
                        </Box>
                        <Box sx={{flexGrow: 1}}/>
                        <Box sx={{display: {xs: 'none', md: 'flex'}}}>
                            <IconButton
                                size="large"
                                edge="end"
                                aria-label="account of current user"
                                aria-controls={menuId}
                                aria-haspopup="true"
                                onClick={handleProfileMenuOpen}
                                color="inherit"
                            >
                                <AccountCircle/>
                            </IconButton>
                        </Box>
                        <Box sx={{display: {xs: 'flex', md: 'none'}}}>
                            <IconButton
                                size="large"
                                aria-label="show more"
                                aria-controls={mobileMenuId}
                                aria-haspopup="true"
                                onClick={handleMobileMenuOpen}
                                color="inherit"
                            >
                                <MoreIcon/>
                            </IconButton>
                        </Box>
                    </Toolbar>
                </AppBar>
                {renderMobileMenu}
                {renderMenu}
                {/*<SwipeableViews*/}
                {/*    axis={props.theme === 'rtl' ? 'x-reverse' : 'x'}*/}
                {/*    index={value}*/}
                {/*    onChangeIndex={handleChangeIndex}*/}
                {/*>*/}
                {/*    <TabPanel value={value} index={0}>*/}
                {/*        Page descriptif tournoi / event*/}
                {/*    </TabPanel>*/}
                {/*    <TabPanel value={value} index={1}>*/}
                {/*        Page présentation Streamer, aperçu streamer en direct*/}
                {/*    </TabPanel>*/}
                {/*    <TabPanel value={value} index={2}>*/}
                {/*        Page Présentation des Jeux de la commu EterelZ*/}
                {/*    </TabPanel>*/}
                {/*    <TabPanel value={value} index={3}>*/}
                {/*        Page présentation commu EterelZ*/}
                {/*    </TabPanel>*/}
                {/*</SwipeableViews>*/}
            </Box>
        </div>
    )

}