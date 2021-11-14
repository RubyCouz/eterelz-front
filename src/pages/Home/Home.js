import React, {useState} from 'react'
import Box from "@mui/material/Box"
import Navbar from '../../Components/Navbar/Navbar'
import HomeCarousel from '../../Components/HomeCarousel/HomeCarousel'
import EventCard from '../../Components/EventCard/EventCard'
import ActionModul from '../../Components/ActionModul/ActionModul'
import './Home.css'
import Grid from "@mui/material/Grid";
import Button from "@material-ui/core/Button";

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import WidgetDiscord from '../../Components/WidgetDiscord/WidgetDiscord'
import Divider from "@material-ui/core/Divider";


export default function Home(props) {

    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <div>
            <Box sx={{flexGrow: 1}}>
                <Navbar/>
            </Box>
            <Box sx={{flexGrow: 1}}>
                <HomeCarousel/>
            </Box>
            <Box sx={{flexGrow: 1}}>
                <div className="skew-c"/>
                <div className="colour-block">
                    <Grid container spacing={{xs: 1, md: 10}} columns={{xs: 3, sm: 8, md: 12}}>
                        <Grid item xs={4} sm={4} md={4} className="column">
                            <h2>PORTAIL</h2>
                            <Button>Se référencer</Button>
                        </Grid>
                        <Grid item xs={4} sm={4} md={4} className="column">
                            <h2>TEAM EXPERIENCE</h2>
                            <Button>POSTULER</Button>
                        </Grid>
                        <Grid item xs={4} sm={4} md={4} className="column">
                            <h2>EVENT</h2>
                            <EventCard/>
                            <EventCard/>
                            <EventCard/>
                        </Grid>
                    </Grid>
                </div>
                <div className="skew-cc"/>
                <div className="black-block">
                    <Grid container spacing={{xs: 1, md: 12}} columns={{xs: 4, sm: 8, md: 12}}>
                        <Grid item xs={5} sm={5} md={5}>
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
                                        <Typography sx={{color: 'text.secondary'}}>
                                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet asperiores
                                            commodi, culpa deleniti deserunt dolor expedita explicabo magnam maiores
                                            porro quod velit voluptate. Alias doloribus impedit mollitia perferendis
                                            porro, ratione.
                                        </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography>
                                            Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat.
                                            Aliquam eget maximus est, id dignissim quam.
                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>
                            </div>
                        </Grid>
                        <Grid item xs={2} sm={2} md={2}>
                            <div className="divider-up-to-down"/>
                        </Grid>
                        <Grid item xs={5} sm={5} md={5}>
                            <p className="column">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium adipisci amet
                                asperiores
                                aspernatur, laboriosam reprehenderit unde vel? Accusamus culpa, cupiditate, eaque eum
                                exercitationem molestias perspiciatis quas sequi similique sit vitae.
                            </p>
                            <p>AVEC UN PUTAIN D'AGENDA EN PRIME !!!</p>
                        </Grid>

                    </Grid>
                </div>
                <div className="skew-c"/>
                <div className="colour-block">
                    <Grid container spacing={{xs: 1, md: 12}} columns={{xs: 4, sm: 8, md: 12}}>
                        <Grid item xs={5} sm={5} md={5}>
                            <div>
                                <WidgetDiscord/>
                            </div>
                        </Grid>
                        <Grid item xs={2} sm={2} md={2}>
                            <div className="divider-down-to-up"/>
                        </Grid>
                        <Grid item xs={5} sm={5} md={5}>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam consequuntur delectus
                                error, magni odit officiis sequi ullam? Aliquam assumenda autem, consequuntur eveniet
                                expedita facilis harum labore, quas saepe sint, voluptate?
                            </p>
                        </Grid>
                    </Grid>
                </div>
                <div className="skew-cc"/>
                <div className="black-block">
                    <h2>Streamer</h2>
                </div>
                <div className="skew-c"/>
                <div className="colour-block">
                <h2>Latest Match</h2>
                </div>
                <div className="skew-cc"/>
            </Box>
        </div>

    )
}








