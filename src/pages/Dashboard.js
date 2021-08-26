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
import Progress from "../Components/Progress/Progress";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";

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
        games: [],
        isLoading: false,
        files: [],
        uploading: false,
        uploadProgress: [],
        successfullUploaded: false
    })

    const game_name = useRef('')
    const game_desc = useRef('')
    const game_pic = useRef('')
    const {loading, error, data} = useQuery(LIST_GAMES)

    const [value, setValue] = React.useState(0);

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

    const onFilesAdded = (files) => {
        console.log(files)
        setState({...state, files: files})
        // console.log(state.files)
    }

    const addGame = async () => {
        setState({
            ...state,
            uploadProgress: {},
            uploading: true
        })
        const promises = []
        state.files.forEach(file => {
            console.log(file)
            promises.push(sendRequest(file))
            addGameHandler({
                variables: {
                    game_name: game_name.current.value,
                    game_desc: game_desc.current.value,
                    game_pic: state.files[0].name,
                    game_creator: context.playload.userId
                }
            })
        })
        try{
            await Promise.all(promises)
                .setState({
                    ...state,
                    successfullUpload: true,
                    uploading: false
                })

        } catch (e) {
            // ajout error
            setState({
                ...state,
                successfullUploaded: true,
                uploading:false
            })
        }

    }

    const sendRequest = (file) => {
        return new Promise((resolve, reject) => {
            const req = new XMLHttpRequest()

            req.upload.addEventListener('progress', event => {
                if(event.lengthComputable) {
                    const copy = {...state.uploadProgress}
                    copy[file.name] = {
                        state: 'pending',
                        percentage: (event.loaded / event.total) * 100
                    }
                    setState({
                        ...state,
                        uploadProgress: copy
                    })
                }
            })

            req.upload.addEventListener('load', event => {
                const copy = {...state.uploadProgress}
                copy[file.name] = {
                    state: 'done',
                    percentage: 100
                }
                setState({
                    ...state,
                    uploadProgress: copy
                })
                resolve(req.response)
            })

            req.upload.addEventListener('error', event => {
                const copy = {...state.uploadProgress}
                copy[file.name] = {
                    state: 'error',
                    percentage: 0
                }
                setState({
                    ...state,
                    uploadProgress: copy
                })
                reject(req.response)
            })
            const formData = new FormData()
            formData.append('file', file, file.name)

            req.open('POST', 'http://localhost:8080/upload/game')
            req.send(formData)
        })
    }

    const renderProgress = (file) => {
        setState({
            ...state,
            uploadProgress: file.name
        })
        const uploadProgress = state.uploadProgress
        if(state.uploading || state.successfullUploaded) {
            return(
                <div className="progressWrapper">
                    <Progress progress={uploadProgress ? uploadProgress.percentage : 0} />
                    <CheckCircleOutlineIcon
                        className="checkIcon"
                        style={{
                            opacity:
                                uploadProgress && uploadProgress.state === "done" ? 0.5 : 0
                        }}
                    />
                </div>
            )
        }
    }


    return (
        <>
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
                                    uploadRef={game_pic}
                                    onFilesAdded={onFilesAdded}
                                    renderProgress={renderProgress}
                                    files={state.files}
                                />
                            </div>
                            <Box display="flex" style={{width: '100%'}}>
                                <Button variant="contained"
                                        color="primary"
                                        justifyContent="flex-end"
                                        onClick={addGame}
                                >Add</Button>
                            </Box>
                        </form>
                    </TabPanel>
                </SwipeableViews>
            </div>
        </>
    );
}