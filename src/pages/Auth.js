import * as React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import {useTheme} from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
// import {makeStyles} from "@material-ui/core/styles";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Grid from "@material-ui/core/Grid";

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
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

// const useStyles = makeStyles((theme) => ({
//     root: {
//         width: '100%',
//     },
//     snackbar: {
//         width: '100%',
//         '& > * + *': {
//             marginTop: theme.spacing(2),
//         },
//     },
//     margin: {
//         margin: theme.spacing(1),
//     },
//     error: {
//         '& > *': {
//             margin: theme.spacing(1),
//         },
//     },
// }));



export default function FullWidthTabs() {

    // let classes = useStyles()
    const theme = useTheme();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };

    return (
        <Box sx={{flexGrow: 1}}>
            <Grid
                container
                justifyContent="center"
                alignItems="center"
            >
                <Grid item xs>

                </Grid>
                <Grid item xs={4}>
                    <Card sx={{
                        minWidth: 275,
                        marginTop: '35%'
                    }}>
                        <CardContent>
                            <Typography variant="body2">
                                <SwipeableViews
                                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                                    index={value}
                                    onChangeIndex={handleChangeIndex}
                                >
                                    <TabPanel value={value} index={0} dir={theme.direction}>
                                        <h1>Connexion</h1>
                                        <form className="auth-form">
                                            <div className="form-control">
                                                <div>
                                                    <TextField
                                                        id="standard-error-helper-text"
                                                        label="Email"
                                                        name="log_user_email"
                                                        type="text"
                                                        helperText="Entrer votre email"
                                                        fullWidth={true}
                                                        required
                                                    />
                                                </div>
                                                <Button value="Annuler"
                                                        variant="outlined"
                                                >
                                                    <a href="/home" title="retour à l'accueil">Retour</a>

                                                </Button>
                                                    <Tabs
                                                        value={value}
                                                        onChange={handleChange}
                                                        aria-label="full width tabs example"
                                                    >
                                                        <Tab
                                                            label="Retour" {...a11yProps(0)}
                                                            sx={{
                                                                display: 'none'
                                                            }}

                                                        />
                                                        <Tab label="Suivant"
                                                             {...a11yProps(1)} />
                                                    </Tabs>
                                            </div>
                                        </form>
                                    </TabPanel>
                                    <TabPanel value={value} index={1} dir={theme.direction}>
                                        <h1>Mot de passe</h1>
                                        <form className="auth-form">
                                            <div className="form-control">
                                                <div>
                                                    <TextField
                                                        id="standard-error-helper-text"
                                                        label="Email"
                                                        name="log_user_email"
                                                        type="text"
                                                        helperText="Entrer votre email"
                                                        fullWidth={true}
                                                        required
                                                    />
                                                </div>
                                                    <Tabs
                                                        value={value}
                                                        onChange={handleChange}
                                                        indicatorColor="secondary"
                                                        textColor="inherit"
                                                        variant="fullWidth"
                                                        aria-label="full width tabs example"
                                                    >
                                                        <Tab label="Retour" {...a11yProps(0)} />
                                                    </Tabs>
                                                <Button variant="contained"
                                                        color="primary"
                                                        justifyContent="flex-end"
                                                >
                                                    Valider
                                                </Button>
                                            </div>
                                        </form>
                                    </TabPanel>
                                </SwipeableViews>
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small">Learn More</Button>
                        </CardActions>
                    </Card>
                </Grid>
                <Grid item xs>

                </Grid>
            </Grid>
        </Box>


    );
}
