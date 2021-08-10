import React, {useContext, useRef, useState} from 'react'
import AuthNavbar from '../Components/Navbar/AuthNavbar'
import {makeStyles, useTheme} from "@material-ui/core/styles"
import AuthContext from '../context/auth-context'

import PropTypes from 'prop-types'
import SwipeableViews from 'react-swipeable-views'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'

import {
    gql,
    useQuery,
    useMutation
} from '@apollo/client'
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

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
        width: '100%'
    }
}))

const GAME_QUERY = gql`
    fragment GameQuery on Game{
        _id
        game_name
        game_creator {
            _id
            user_email
        }
        createdAt
    }
`
const LIST_GAMES = gql`
    ${GAME_QUERY}
    query{
        games{
            ...GameQuery
        }
    }
`
const CREATE_GAME = gql`
    ${GAME_QUERY}
    mutation CreateGame($game_name: String!, $game_desc: String!) {
        createGame(gameInput: {
            game_name: $game_name
            game_desc: $game_desc
        })
        {
            ...GameQuery
        }
    }
`

export default function Dashboard() {
    const theme = useTheme();

    let classes = useStyles()
    const context = useContext(AuthContext)

    const [state, setState] = useState({
        games: [],
        isLoading: false
    })

    const game_name = useRef('')
    const game_desc = useRef('')

    const {loading, error, data} = useQuery(LIST_GAMES)

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };

    // const addGameHandler = () => {
    //     console.log(context)
    //     console.log(game_desc.current.value)
    //     console.log(game_name.current.value)
    // }

    const [addGameHandler] = useMutation(
        CREATE_GAME,
        {
            onCompleted: (dataMutationGame) => {
                if(dataMutationGame.createGame !== undefined) {
                    let listGame = state.games
                    console.log(listGame)
                    listGame.push(dataMutationGame.createGame)
                    setState({...state, games: listGame})
                }
            }
        }
    )

    return (
        <div className={classes.root}>
            <AuthNavbar/>
            <AppBar position="static" color="default">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                    aria-label="full width tabs example"
                >
                    <Tab label="Item One" {...a11yProps(0)} />
                    <Tab label="Item Two" {...a11yProps(1)} />
                    <Tab label="Ajouter un jeu" {...a11yProps(2)} />
                </Tabs>
            </AppBar>
            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
                onChangeIndex={handleChangeIndex}
            >
                <TabPanel value={value} index={0} dir={theme.direction}>
                    Item One
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                    Item Two
                </TabPanel>
                <TabPanel value={value} index={2} dir={theme.direction}>
                    <form action="" className="auth-form">
                        <div className="form-control">
                            <TextField
                                id="game_name"
                                label="Titre du jeu"
                                name="game_name"
                                type="text"
                                helperText="Entrez le titre du jeu"
                                fullWidth={true}
                                inputRef={game_name}
                                required
                            />
                            <TextField
                                id="game_desc"
                                label="Description"
                                name="game_desc"
                                type="text"
                                helperText="La description ne doit pas dépasser 100 caractère"
                                fullWidth={true}
                                inputRef={game_desc}
                                required
                            />
                        </div>
                        <Box display="flex" style={{width: '100%'}}>
                            <Button variant="contained"
                                    color="primary"
                                    justifyContent="flex-end"
                                    onClick={
                                        () => addGameHandler({
                                        variables: {
                                            game_name: game_name.current.value,
                                            game_desc: game_desc.current.value,
                                            game_creator: context.playload.userId
                                        }
                                    })}
                            >Add</Button>
                        </Box>
                    </form>
                </TabPanel>
            </SwipeableViews>
        </div>
);
}