import React from 'react'
import AuthNavbar from '../../Components/Navbar/AuthNavbar'
import Footer from '../../Components/Footer/Footer'
import {Outlet} from "react-router-dom";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Zoom from "@mui/material/Zoom";
import Fab from "@mui/material/Fab";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

function ScrollTop(props) {
    const {children, window} = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
        disableHysteresis: true,
        threshold: 100,
    });
    const handleClick = (event) => {
        const anchor = (event.target.ownerDocument || document).querySelector(
            '#back-to-top-anchor',
        );

        if (anchor) {
            anchor.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
            });
        }
    };
    return (
        <Zoom in={trigger}>
            <Box
                onClick={handleClick}
                role="presentation"
                sx={{position: 'fixed', bottom: 16, left: 16}}
            >
                {children}
            </Box>
        </Zoom>
    );
}

export default function Index(props) {

    return (
        <>
            <Box sx={{flexGrow: 1, height: '50px'}}>
                <AuthNavbar/>
                <Toolbar id="back-to-top-anchor"/>
            </Box>
            <Outlet/>
            <ScrollTop {...props}>
                <Fab color="secondary" size="small" aria-label="scroll back to top">
                    <KeyboardArrowUpIcon/>
                </Fab>
            </ScrollTop>
            <Box sx={{flexGrow: 1}} className="black-block footer">
                <Footer/>
            </Box>
        </>
    )
}
