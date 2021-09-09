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
import GameList from '../Components/Game/GameList'
import {
    gql,
    useQuery,
    useMutation
} from '@apollo/client'
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Upload from "../Components/Upload/Upload";

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
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}))

const GAME_QUERY = gql`
    fragment GameQuery on Game{
        _id
        game_name
        game_desc
        game_pic
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
    mutation CreateGame($game_name: String!, $game_desc: String!, $game_pic: String!) {
        createGame(gameInput: {
            game_name: $game_name
            game_desc: $game_desc
            game_pic: $game_pic
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
        isLoading: false,
        games: [],
    })

    const game_name = useRef('')
    const game_desc = useRef('')
    const game_pic = useRef('')

    const [value, setValue] = React.useState(0);
    const [uploadProgress, setUploadProgress] = React.useState({})
    const [uploadingFile, setUploadingFile] = React.useState()
    const [uploading, setUploading] = React.useState(false)
    const [successfulUploaded, setSuccessfulUploaded] = React.useState(false)
    const {loading, error, data} = useQuery(LIST_GAMES)
    const [addGameHandler] = useMutation(
        CREATE_GAME,
        {
            onCompleted: (dataMutationGame) => {
                if (dataMutationGame.createGame !== undefined) {
                    console.log(state.games)
                    let listGame = state.games
                    listGame.push(dataMutationGame.createGame)
                    setState({...state, games: listGame})
                }
            }
        }
    )

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };

    const addGame = async () => {
        setUploading(true)
        setUploadProgress({})
        const promises = []
        promises.push(sendRequest(uploadingFile))
        try {
            await Promise.all(promises)
            setUploading(false)
            setSuccessfulUploaded(true)
            await addGameHandler({
                variables: {
                    game_name: game_name.current.value,
                    game_desc: game_desc.current.value,
                    game_pic: uploadingFile.name,
                    game_creator: context.playload.userId
                }
            })

        } catch (e) {
                // ajout error
            setSuccessfulUploaded(false)
            setUploading(false)
            throw new Error(e)
        }

    }

    const sendRequest = (file) => {
        return new Promise((resolve, reject) => {
            const req = new XMLHttpRequest()

            req.upload.addEventListener('progress', event => {

                if (event.lengthComputable) {
                    const copy = {...uploadProgress}
                    copy[file.name] = {
                        state: 'pending',
                        percentage: (event.loaded / event.total) * 100
                    };
                    setUploadProgress(copy)
                }
            })

            req.upload.addEventListener('load', event => {
                const copy = {...uploadProgress}
                copy[file.name] = {state: 'done', percentage: 100}
                setUploadProgress(copy)
                resolve(req.response)
            })

            req.upload.addEventListener('error', event => {
                const copy = {...uploadProgress}
                copy[file.name] = {state: 'error', percentage: 0}
                setUploadProgress(copy)
                reject(req.response)
            })

            const formData = new FormData()
            formData.append("file", file, file.name)

            req.open('POST', 'http://localhost:8080/upload/game')
            req.send(formData)
        });
    }


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
                    <Tab label="Liste des jeux" {...a11yProps(0)} />
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
                    {
                        data ?
                            <GameList
                                games={data.games}
                                authUserId={context.playload ? context.playload.userId : null}
                            /> :
                            <p>{JSON.stringify(error)}</p>

                    }
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                    Item Two
                </TabPanel>
                <TabPanel value={value} index={2} dir={theme.direction}>
                    <form action="" className="auth-form" encType="multipart/form-data">
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
                            <Upload
                                uploading={uploading}
                                setSuccessfullUploaded={setSuccessfulUploaded}
                                successfullUploaded={successfulUploaded}
                                setUploadProgress={setUploadProgress}
                                setUploading={setUploading}
                                uploadProgress={uploadProgress}
                                setUploadingFile={setUploadingFile}
                                game_pic={game_pic}
                            />
                            <Box display="flex" style={{width: '100%'}}>
                                <Button
                                    color="primary"
                                    variant="contained"
                                    justifyContent="flex-end"
                                    onClick={addGame}
                                >
                                    Add
                                </Button>
                            </Box>
                        </div>
                    </form>

                </TabPanel>
            </SwipeableViews>

        </div>
    )
}