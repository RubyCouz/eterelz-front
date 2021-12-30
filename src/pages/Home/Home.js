import React from 'react'
import Box from "@mui/material/Box"
import Navbar from '../../Components/Navbar/Navbar'
import HomeCarousel from '../../Components/HomeCarousel/HomeCarousel'
import SponsoCarousel from '../../Components/SponsoCarousel/SponsoCarousel'
import './Home.css'
import Grid from "@mui/material/Grid"
import Button from '@mui/material/Button'
import EventCalendar from '../../Components/EventCalendar/EventCalendar'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import WidgetDiscord from '../../Components/WidgetDiscord/WidgetDiscord'
import HomeStream from '../../Components/HomeStream/HomeStream'
import HomeMatches from '../../Components/HomeMatches/HomeMatches'
import Footer from '../../Components/Footer/Footer'
import Toolbar from '@mui/material/Toolbar'
import useScrollTrigger from '@mui/material/useScrollTrigger'
import Fab from '@mui/material/Fab'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import Zoom from '@mui/material/Zoom'
import {useDocTitle} from '../../Hook/useDocTitle'
// import Stats from '../../Components/Stats/Stats'
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

export default function Home(props) {
    useDocTitle('EterelZ HomePage')
    const [expanded, setExpanded] = React.useState(false);
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    return (
        <div className="bg">
            <Box sx={{flexGrow: 1}}>
                <Navbar/>
                <Toolbar id="back-to-top-anchor"/>
            </Box>
            <Box sx={{flexGrow: 1}}>
                <HomeCarousel/>
            </Box>
            <Box sx={{flexGrow: 1}}>
                <SponsoCarousel/>
            </Box>
            <Box sx={{flexGrow: 1}}>
                <div className="skew-c"/>
                <div className="colour-block">
                    <Grid container spacing={{xs: 1, md: 6}} columns={{xs: 3, sm: 8, md: 12}}>
                        <Grid item xs={3} sm={3} md={3}>
                            <Grid container>
                                <Grid item xs={12} sm={12} md={12}>
                                    <h2>PORTAIL</h2>
                                    <Button>Se référencer</Button>
                                </Grid>
                                <Grid item xs={12} sm={12} md={12}>
                                    <h2>TEAM EXPERIENCE</h2>
                                    <Button>POSTULER</Button>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={9} sm={9} md={9}>
                            <Grid container spacing={{xs: 1, md: 12}} columns={{xs: 3, sm: 8, md: 12}}>
                                <Grid item xs={12} sm={12} md={12}>
                                    <EventCalendar/>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
                <div className="skew-cc"/>
                <div className="black-block">
                    <Grid container spacing={1}>
                        <Grid item xs={12} md={6} lg={9} className="column">
                            <div>
                                <Accordion
                                    className="homeCollapsible"
                                    expanded={expanded === 'panel1'}
                                    onChange={handleChange('panel1')}
                                >
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon/>}
                                        aria-controls="panel1bh-content"
                                        id="panel1bh-header"
                                    >
                                        <Typography sx={{color: 'text.secondary'}} className="textWhite">
                                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet asperiores
                                            commodi, culpa deleniti deserunt dolor expedita explicabo magnam maiores
                                            porro quod velit voluptate. Alias doloribus impedit mollitia perferendis
                                            porro, ratione.
                                        </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography className="textWhite">
                                            Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat.
                                            Aliquam eget maximus est, id dignissim quam.
                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>
                            </div>
                        </Grid>
                        <Grid item xs={12} md={6} lg={3}>
                            <WidgetDiscord/>
                        </Grid>

                    </Grid>
                </div>
                <div className="skew-c"/>
                <div className="colour-block">
                    <h2>AffiliatZ Streamer</h2>
                    <Grid container spacing={{xs: 1, md: 6}} columns={{xs: 4, sm: 8, md: 12}}>
                        <Grid item xs={4} sm={4} md={4}>
                            <h3>Hellrog IV</h3>
                            <HomeStream
                                url="https://www.twitch.tv/hellrogiv"
                            />
                        </Grid>
                        <Grid item xs={4} sm={4} md={4}>
                            <h3>Petitdbl</h3>
                            <HomeStream
                                url="https://www.twitch.tv/petitdbl"
                            />
                        </Grid>
                        <Grid item xs={4} sm={4} md={4}>
                            <h3>Deepanalyst</h3>
                            <HomeStream
                                url="https://www.twitch.tv/deepanalyst"
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={{xs: 1, md: 6}} columns={{xs: 4, sm: 8, md: 12}}>
                        <Grid item xs={4} sm={4} md={4}>
                            <h3>Unluckboy</h3>
                            <HomeStream
                                url="https://www.twitch.tv/unluckoy"
                            />
                        </Grid>
                        <Grid item xs={4} sm={4} md={4}>
                            <h3>Peaceotto</h3>
                            <HomeStream
                                url="https://www.twitch.tv/peaceotto"
                            />
                        </Grid>
                        <Grid item xs={4} sm={4} md={4}>
                            <h3>Starzfr</h3>
                            <HomeStream
                                url="https://www.twitch.tv/starzfr"
                            />
                        </Grid>
                    </Grid>
                </div>
                <div className="skew-cc"/>
                <div className="black-block">
                    <Grid container spacing={{xs: 1, md: 6}} columns={{xs: 4, sm: 8, md: 12}}>
                        <Grid item xs={4} sm={4} md={4}>

                        </Grid>
                        <Grid item xs={4} sm={4} md={4}>

                        </Grid>
                        <Grid item xs={4} sm={4} md={4}>

                        </Grid>
                    </Grid>
                    <Grid container spacing={{xs: 1, md: 6}} columns={{xs: 4, sm: 8, md: 12}}>
                        <Grid item xs={4} sm={4} md={4}>
                            <div className="polygon1"/>
                        </Grid>
                        <Grid item xs={4} sm={4} md={4}>
                            <div className="polygon2"/>
                        </Grid>
                        <Grid item xs={4} sm={4} md={4}>
                            <div className="polygon3"/>
                        </Grid>
                    </Grid>
                    <Grid container spacing={{xs: 1, md: 6}} columns={{xs: 4, sm: 8, md: 12}}>
                        <Grid item xs={4} sm={4} md={4}>

                        </Grid>
                        <Grid item xs={4} sm={4} md={4}>

                        </Grid>
                        <Grid item xs={4} sm={4} md={4}>

                        </Grid>
                    </Grid>
                </div>
                <div className="skew-c"/>
                <div className="colour-block blockStat">
                    <h2>Latest Match</h2>
                    <Grid container spacing={{xs: 1, md: 6}} columns={{xs: 4, sm: 8, md: 12}}>
                        <Grid item xs={12} sm={12} md={12}>
                            <HomeMatches/>
                        </Grid>
                    </Grid>
                </div>
                <div className="skew-cc"/>
                <div className="black-block footer">
                    <Footer/>
                </div>
            </Box>
            <ScrollTop {...props}>
                <Fab color="secondary" size="small" aria-label="scroll back to top">
                    <KeyboardArrowUpIcon/>
                </Fab>
            </ScrollTop>
        </div>

    )
}








