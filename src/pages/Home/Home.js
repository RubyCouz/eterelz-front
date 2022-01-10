import React from 'react'
import Countup from 'react-countup'
import Box from "@mui/material/Box"
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
import {useDocTitle} from '../../Hook/useDocTitle'

export default function Home(props) {
    useDocTitle('EterelZ HomePage')
    const [expanded, setExpanded] = React.useState(false);
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    return (
        <div className="bg">

            <Box sx={{flexGrow: 1}}>
                <HomeCarousel/>
            </Box>
            <Box sx={{flexGrow: 1, height: 50}}>
                <SponsoCarousel/>
            </Box>
            <Box sx={{flexGrow: 1}}>
                {/*<div className="skew-c"/>*/}
                <Box className="colour-block">
                    <Grid container
                          spacing={{xs: 1, md: 6}}
                          columns={{xs: 3, sm: 8, md: 12}}
                          justifyContent="space-evenly"
                          alignItems="center"
                    >
                        <Grid item xs={3} sm={3} md={3}>
                            <Grid container
                                  justifyContent="space-evenly"
                                  alignItems="center"
                            >
                                <Grid item xs={12} sm={12} md={12}>
                                    <Box className="colour-block">
                                        <h2>PORTAIL</h2>
                                        <Button>Se référencer</Button>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={12} md={12}>
                                    <Box className="colour-block">
                                        <h2>TEAM EXPERIENCE</h2>
                                        <Button>POSTULER</Button>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={9} sm={9} md={9}>
                            <EventCalendar/>
                        </Grid>
                    </Grid>
                </Box>
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
                    <Accordion
                        className="homeCollapsible"
                        expanded={expanded === 'panelStreamer'}
                        onChange={handleChange('panelStreamer')}
                    >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon/>}
                            aria-controls="panelStreamer-content"
                            id="panelStreamer-header"
                        >
                            <Typography sx={{color: 'text.secondary'}} className="textWhite">
                                <h2>AffiliatZ Streamer</h2>
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography className="textWhite">
                                <Grid container spacing={{xs: 1, md: 6}} columns={{xs: 4, sm: 12, md: 12}}>
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
                                <Grid container spacing={{xs: 1, md: 6}} columns={{xs: 4, sm: 12, md: 12}}>
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
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                </div>
                <div className="skew-cc"/>
                <Box className="black-block" sx={{textAlign: 'center'}}>
                    <Grid container spacing={{xs: 1, md: 6}} columns={{xs: 4, sm: 12, md: 12}}>
                        <Grid item xs={12} md={12} lg={12}>
                            <h2>La commu EterelZ, c'est :</h2>
                        </Grid>
                        <Grid item xs={4} sm={4} md={4}>
                            <p className="counter">
                                <Countup
                                    end={1523}
                                    duration={10}
                                /> Joueurs
                            </p>
                        </Grid>
                        <Grid item xs={4} sm={4} md={4}>
                            <p className="counter">
                                <Countup
                                    end={65}
                                    duration={10}
                                /> Clans
                            </p>
                        </Grid>
                        <Grid item xs={4} sm={4} md={4}>
                            <p className="counter">
                                <Countup
                                    end={163}
                                    duration={10}
                                /> Evénements
                            </p>
                        </Grid>
                    </Grid>
                    <Grid container spacing={{xs: 1, md: 6}} columns={{xs: 4, sm: 12, md: 12}}>
                        <Grid item xs={4} sm={4} md={4}>
                            <p className="counter">
                                <Countup
                                    end={365}
                                    duration={10}
                                /> Tournois
                            </p>
                        </Grid>
                        <Grid item xs={4} sm={4} md={4}>
                            <p className="counter">
                                <Countup
                                    end={365}
                                    duration={10}
                                /> Créateurs de contenus
                            </p>
                        </Grid>
                        <Grid item xs={4} sm={4} md={4}>
                            <p className="counter">
                                <Countup
                                    end={267}
                                    duration={10}
                                /> Coachs
                            </p>
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
                </Box>
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

            </Box>

        </div>

    )
}








