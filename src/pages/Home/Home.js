import React from 'react'
import Box from "@mui/material/Box"
import Navbar from '../../Components/Navbar/Navbar'
import HomeCarousel from '../../Components/HomeCarousel/HomeCarousel'
import SponsoCarousel from '../../Components/SponsoCarousel/SponsoCarousel'
import Card from '../../Components/Card/Card'
import './Home.css'
import Grid from "@mui/material/Grid"
import Button from "@material-ui/core/Button"

import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import WidgetDiscord from '../../Components/WidgetDiscord/WidgetDiscord'
import HomeStream from '../../Components/HomeStream/HomeStream'
import HomeMatches from '../../Components/HomeMatches/HomeMatches'
import Footer from '../../Components/Footer/Footer'
import Stats from '../../Components/Stats/Stats'

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
                <SponsoCarousel/>
            </Box>
            <Box sx={{flexGrow: 1}}>
                <div className="skew-c"/>
                <div className="colour-block">
                    <Grid container spacing={{xs: 1, md: 6}} columns={{xs: 3, sm: 8, md: 12}}>
                        <Grid item xs={3} sm={3} md={3}>
                            <h2>PORTAIL</h2>
                            <Button>Se référencer</Button>
                        </Grid>
                        <Grid item xs={3} sm={3} md={3}>
                            <h2>TEAM EXPERIENCE</h2>
                            <Button>POSTULER</Button>
                        </Grid>
                        <Grid item xs={6} sm={6} md={6}>
                            <h2>EVENT</h2>
                            <Grid container spacing={{xs: 1, md: 12}} columns={{xs: 3, sm: 8, md: 12}}>
                                <Grid item xs={6} sm={6} md={6}>
                                    <Card
                                    title="Event Name"
                                    firstContent="Some Description"
                                    secondContent=""
                                    firstAction="Action 1"
                                    firstLink=""
                                    secondAction="Action 2"
                                    secondLink=""
                                    thirdAction="Action 3"
                                    thirdLink=""
                                    />
                                    <Card
                                    title="Event Name"
                                    firstContent="Some Description"
                                    secondContent=""
                                    firstAction="Action 1"
                                    firstLink=""
                                    secondAction="Action 2"
                                    secondLink=""
                                    thirdAction="Action 3"
                                    thirdLink=""
                                    />
                                </Grid>
                                <Grid item xs={6} sm={6} md={6}>
                                    <Card
                                    title="Event Name"
                                    firstContent="Some Description"
                                    secondContent=""
                                    firstAction="Action 1"
                                    firstLink=""
                                    secondAction="Action 2"
                                    secondLink=""
                                    thirdAction="Action 3"
                                    thirdLink=""
                                    />
                                    <Card
                                    title="Event Name"
                                    firstContent="Some Description"
                                    secondContent=""
                                    firstAction="Action 1"
                                    firstLink=""
                                    secondAction="Action 2"
                                    secondLink=""
                                    thirdAction="Action 3"
                                    thirdLink=""
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
                <div className="skew-cc"/>
                <div className="black-block">
                    <Grid container spacing={{xs: 1, md: 12}} columns={{xs: 4, sm: 8, md: 12}}>
                        <Grid item xs={5} sm={5} md={5} className="column">
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
                            <p>
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
                    <Grid container spacing={{xs: 1, md: 6}} columns={{xs: 4, sm: 8, md: 12}}>
                        <Grid item xs={5} sm={5} md={5}>
                            <div>
                                <WidgetDiscord/>
                            </div>
                        </Grid>
                        <Grid item xs={2} sm={2} md={2}>
                            <div className="divider-down-to-up"/>
                        </Grid>
                        <Grid item xs={5} sm={5} md={5}>
                            <p className="text">
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
                    <Grid container spacing={{xs: 1, md: 6}} columns={{xs: 4, sm: 8, md: 12}}>
                        <Grid item xs={4} sm={4} md={4}>
                            <h3>Sardoche</h3>
                            <HomeStream
                                url="https://www.twitch.tv/sardoche"
                            />
                        </Grid>
                        <Grid item xs={4} sm={4} md={4}>
                            <h3>Mojitomangue</h3>
                            <HomeStream
                                url="https://www.twitch.tv/mojitomangue"
                            />
                        </Grid>
                        <Grid item xs={4} sm={4} md={4}>
                            <h3>At0mium</h3>
                            <HomeStream
                                url="https://www.twitch.tv/at0mium"
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={{xs: 1, md: 6}} columns={{xs: 4, sm: 8, md: 12}}>
                        <Grid item xs={4} sm={4} md={4}>
                            <h3>Solary</h3>
                            <HomeStream
                                url="https://www.twitch.tv/solary"
                            />
                        </Grid>
                        <Grid item xs={4} sm={4} md={4}>
                            <h3>Aspigtv</h3>
                            <HomeStream
                                url="https://www.twitch.tv/aspigtv"
                            />
                        </Grid>
                        <Grid item xs={4} sm={4} md={4}>
                            <h3>Mooters</h3>
                            <HomeStream
                                url="https://www.twitch.tv/mooters"
                            />
                        </Grid>
                    </Grid>
                </div>
                <div className="skew-c"/>
                <div className="colour-block">
                    <h2>Latest Match</h2>
                    <Grid container spacing={{xs: 1, md: 6}} columns={{xs: 4, sm: 8, md: 12}}>
                        <Grid item xs={12} sm={12} md={12}>
                            <HomeMatches/>
                        </Grid>
                    </Grid>
                </div>
                <div className="skew-cc"/>
                <div className="black-block">
                    <Stats/>
                </div>
                <div className="black-block footer">
                    <Footer/>
                </div>

            </Box>
        </div>

    )
}








