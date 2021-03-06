import React from 'react'
import {Link} from 'react-router-dom'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'
import Menu from '@mui/material/Menu'
import AccountCircle from '@mui/icons-material/AccountCircle'
import { makeStyles } from '@mui/styles'
import Box from '@mui/material/Box'
import {NavLink} from 'react-router-dom'
import MoreIcon from '@mui/icons-material/MoreVert'
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
        background: 'linear-gradient(90deg, rgba(0,168,212,1) 0%, rgba(134,24,173,1) 53%)',
        height: '60px'
    }
}))

export default function Home(props) {
    const classes = useStyles();
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    }
    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    }
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)
    const menuId = 'primary-search-account-menu';
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
            <MenuItem>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle/>
                </IconButton>
                <Link to="/auth">CONNEXION</Link>
            </MenuItem>
        </Menu>
    )
    return (
            <Box sx={{flexGrow: 1}}>
                <AppBar
                    className={classes.navbar}
                    position="fixed"
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

                        </Box>
                        <Box sx={{flexGrow: 1}}/>
                        <Box sx={{display: {xs: 'none', md: 'flex'}}}>
                            <IconButton
                                size="large"
                                edge="end"
                                aria-label="account of current user"
                                aria-controls={menuId}
                                aria-haspopup="true"
                                color="inherit"
                            >
                                <Link to="/auth"><AccountCircle/></Link>
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
            </Box>
    )

}