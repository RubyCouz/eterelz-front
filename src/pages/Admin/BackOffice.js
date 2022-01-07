import React, {useState} from 'react'
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import UserDatagrid from '../../Components/Admin/Backoffice/UserDatagrid'
import GameDatagrid from '../../Components/Admin/Backoffice/GameDatagrid'
import EventDatagrid from '../../Components/Admin/Backoffice/EventDatagrid'
import ClanDatagrid from '../../Components/Admin/Backoffice/ClanDatagrid'
import Grid from '@mui/material/Grid'

function TabPanel(props) {
    const {children, value, index, ...other} = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{p: 3}}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

export default function BackOffice() {

    const [value, setValue] = useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box
            sx={{display: 'flex', height: 600, marginTop: 2}}
        >
            <Grid container spacing={2}>
                <Grid item xs={1} md={1} lg={1}>
                    <Tabs
                        orientation="vertical"
                        variant="scrollable"
                        value={value}
                        onChange={handleChange}
                        aria-label="Vertical tabs example"
                        sx={{borderRight: 1, borderColor: 'divider', height: 600}}
                    >
                        <Tab label="Utilisateurs" {...a11yProps(0)} />
                        <Tab label="Jeux" {...a11yProps(1)} />
                        <Tab label="Evènement" {...a11yProps(2)} />
                        <Tab label="Clan" {...a11yProps(3)} />
                        {/*<Tab label="Item Five" {...a11yProps(4)} />*/}
                        {/*<Tab label="Item Six" {...a11yProps(5)} />*/}
                        {/*<Tab label="Item Seven" {...a11yProps(6)} />*/}
                    </Tabs>
                </Grid>
                <Grid item xs={11} md={11} lg={11}>
                    <TabPanel value={value} index={0}>
                        <UserDatagrid/>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <GameDatagrid/>
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <EventDatagrid/>
                    </TabPanel>
                    <TabPanel value={value} index={3}>
                        <ClanDatagrid/>
                    </TabPanel>
                    {/*<TabPanel value={value} index={4}>*/}
                    {/*    Item Five*/}
                    {/*</TabPanel>*/}
                    {/*<TabPanel value={value} index={5}>*/}
                    {/*    Item Six*/}
                    {/*</TabPanel>*/}
                    {/*<TabPanel value={value} index={6}>*/}
                    {/*    Item Seven*/}
                    {/*</TabPanel>*/}
                </Grid>
            </Grid>


        </Box>
    )
}
