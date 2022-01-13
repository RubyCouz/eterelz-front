// import React, {useContext, useRef, useState} from 'react'
import React from 'react'
// import {makeStyles, useTheme} from '@mui/styles'
import {makeStyles} from '@mui/styles'
// import AuthContext from '../context/auth-context'
import PropTypes from 'prop-types'
// import AuthContext from '../context/auth-context'
// import SwipeableViews from 'react-swipeable-views'
import AppBar from '@mui/material/AppBar'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import {useDocTitle} from '../Hook/useDocTitle'
// import UserGameList from '../Components/UserGame/UserGameList'
// import {
//     gql,
//     useQuery,
//     useMutation
// } from '@apollo/client'
// import TextField from '@mui/material/TextField'
// import Button from '@mui/material/Button'
// import Upload from '../Components/Upload/Upload'
// import ModalGame from '../Components/ModalGame/ModalGame'
// import Grid from '@mui/material/Grid'
// import Container from '@mui/material/Container'

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

const useStyles = makeStyles({
        root: {
            width: '100%'
        },
        modal: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        paper: {
            border: '2px solid #000',
        }
    }
)
// const USERGAME_QUERY = gql`
//     fragment UserGameQuery on UserGame{
//         _id
//         user {
//             _id
//             user_login
//         }
//         game {
//             _id
//             game_name
//             game_pic
//         }
//     }
// `

// const GAME_QUERY = gql`
//     fragment GameQuery on Game{
//         _id
//         game_name
//         game_desc
//         game_pic
//         game_creator {
//             _id
//             user_email
//         }
//         createdAt
//     }
// `
//
// const LIST_USERGAME = gql`
//     ${USERGAME_QUERY}
//     query{
//         userGame{
//             ...UserGameQuery
//         }
//     }
// `

// const LIST_GAMES = gql`
//     ${GAME_QUERY}
//     query{
//         games{
//             ...GameQuery
//         }
//     }
// `
//
// const CREATE_GAME = gql`
//     ${GAME_QUERY}
//     mutation CreateGame($game_name: String!, $game_desc: String!, $game_pic: String!) {
//         createGame(gameInput: {
//             game_name: $game_name
//             game_desc: $game_desc
//             game_pic: $game_pic
//         })
//         {
//             ...GameQuery
//         }
//     }
// `

// const ADDGAME_PLAYLIST = gql`
//     ${USERGAME_QUERY}
//     mutation PlayGame($gameId: ID!) {
//         playGame(
//             gameId: $gameId
//         )
//         {
//             ...UserGameQuery
//         }
//     }
// `

export default function Dashboard(callbackfn, thisArg) {
    useDocTitle('EterelZ Dashboard')
    // const theme = useTheme();
// const auth = useContext(AuthContext)
    let classes = useStyles()
    // let gameArray = []
    // const context = useContext(AuthContext)
    //
    // const [state, setState] = useState({
    //     isLoading: false,
    //     games: [],
    //     addedGames: []
    // })
    // const [open, setOpen] = React.useState(false);
    // const game_name = useRef('')
    // const game_desc = useRef('')
    // const game_pic = useRef('')
    // const game_choice = useRef('')

    const [value, setValue] = React.useState(0);
    // const [uploadProgress, setUploadProgress] = React.useState({})
    // const [uploadingFile, setUploadingFile] = React.useState()
    // const [uploading, setUploading] = React.useState(false)
    // const [successfulUploaded, setSuccessfulUploaded] = React.useState(false)

    // const {data: games_data, loading: games_loading, error: games_error} = useQuery(LIST_GAMES)
    // const {data: userGames_data, loading: userGames_loading, error: userGames_error} = useQuery(LIST_USERGAME)

    // const {data: games_data} = useQuery(LIST_GAMES)
    // const {data: userGames_data} = useQuery(LIST_USERGAME)

    // const [addGameHandler] = useMutation(
    //     CREATE_GAME,
    //     {
    //         onCompleted: (dataMutationGame) => {
    //             if (dataMutationGame.createGame !== undefined) {
    //                 let listGame = state.games
    //                 listGame.push(dataMutationGame.createGame)
    //                 setState({...state, games: listGame})
    //             }
    //         }
    //     }
    // )

    // const [addGameToPlaylistHandler] = useMutation(
    //     ADDGAME_PLAYLIST,
    //     {
    //         onCompleted: (dataMutationAddedGame) => {
    //             if (dataMutationAddedGame.playGame !== undefined) {
    //                 let listAddedGame = state.addedGames
    //                 listAddedGame.push(dataMutationAddedGame.playGame)
    //                 setState({...state, addedGames: listAddedGame})
    //             }
    //         }
    //     }
    // )

    // const [scroll, setScroll] = React.useState('paper');

    // const handleClickOpen = (scrollType) => () => {
    //     setOpen(true);
    //     setScroll(scrollType);
    // };
    //
    // const handleClose = () => {
    //     setOpen(false);
    // };

    // /**
    //  * ouverture de la modal
    //  */
    // const handleOpen = () => {
    //     setOpen(true);
    // };
    //
    // /**
    //  * fermeture de la modal
    //  */
    // const handleClose = () => {
    //     setOpen(false);
    // };
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    // const handleChangeIndex = (index) => {
    //     setValue(index);
    // };

    /**
     * ajout d'un jeux dans la collection Game
     * @returns {Promise<void>}
     */
    // const addGame = async () => {
    //     setUploading(true)
    //     setUploadProgress({})
    //     const promises = []
    //     promises.push(sendRequest(uploadingFile))
    //     try {
    //         await Promise.all(promises)
    //         setUploading(false)
    //         setSuccessfulUploaded(true)
    //         await addGameHandler({
    //             variables: {
    //                 game_name: game_name.current.value,
    //                 game_desc: game_desc.current.value,
    //                 game_pic: uploadingFile.name,
    //                 game_creator: context.playload.userId
    //             }
    //         })
    //
    //     } catch (e) {
    //         // ajout error
    //         setSuccessfulUploaded(false)
    //         setUploading(false)
    //         throw new Error(e)
    //     }
    //
    // }

    /**
     * envoie de la requête vers le serveur, gestion de chargement et des erreurs
     * @param file
     * @returns {Promise<unknown>}
     */
    // const sendRequest = (file) => {
    //     return new Promise((resolve, reject) => {
    //         const req = new XMLHttpRequest()
    //
    //         req.upload.addEventListener('progress', event => {
    //             if (event.lengthComputable) {
    //                 const copy = {...uploadProgress}
    //                 copy[file.name] = {
    //                     state: 'pending',
    //                     percentage: (event.loaded / event.total) * 100
    //                 };
    //                 setUploadProgress(copy)
    //             }
    //         })
    //         req.upload.addEventListener('load', event => {
    //             const copy = {...uploadProgress}
    //             copy[file.name] = {state: 'done', percentage: 100}
    //             setUploadProgress(copy)
    //             resolve(req.response)
    //         })
    //         req.upload.addEventListener('error', event => {
    //             const copy = {...uploadProgress}
    //             copy[file.name] = {state: 'error', percentage: 0}
    //             setUploadProgress(copy)
    //             reject(req.response)
    //         })
    //
    //         const formData = new FormData()
    //         formData.append("file", file, file.name)
    //
    //         req.open('POST', 'http://localhost:8080/upload/game')
    //         req.send(formData)
    //     });
    // }

    /**
     * Ajout d'un ou plusieurs jeux à la playlist user
     */
    // const addGameToPlaylist = () => {
    //     gameArray.map(async game => {
    //             try {
    //                 await addGameToPlaylistHandler({
    //                     variables: {
    //                         gameId: game._id
    //                     }
    //                 })
    //                 handleClose()
    //             } catch (e) {
    //                 throw new Error(e)
    //             }
    //         }
    //     )
    // }

    return (
        <div className={classes.root}>
            <AppBar position="static" color="default">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                    aria-label="full width tabs example"
                >
                    <Tab label="Mes jeux" {...a11yProps(0)} />
                    <Tab label="Item Two" {...a11yProps(1)} />
                    <Tab label="Ajouter un jeu" {...a11yProps(2)} />
                </Tabs>
            </AppBar>
            {/*<SwipeableViews*/}
            {/*    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}*/}
            {/*    index={value}*/}
            {/*    onChangeIndex={handleChangeIndex}*/}
            {/*>*/}
            {/*    <TabPanel value={value} index={0} dir={theme.direction}>*/}
            {/*        <Grid item xs={12}>*/}
            {/*            <Button onClick={handleClickOpen('paper')}>Ajoutez un jeu à votre collection</Button>*/}
            {/*        </Grid>*/}
            {/*        <Container maxWidth="md">*/}
            {/*            {*/}
            {/*                userGames_data !== undefined && userGames_data.userGame !== null ?*/}
            {/*                    <UserGameList*/}
            {/*                        games={userGames_data}*/}
            {/*                        authUserId={context.playload ? context.playload.userId : null}*/}
            {/*                    />*/}
            {/*                    :*/}
            {/*                    <div>*/}
            {/*                        <p>Vous n'avez pas encore de jeux dans votre collection</p>*/}
            {/*                        <p>Il est temps de commencer l'aventure en cliquant sur le bouton ci-dessus !!!</p>*/}
            {/*                    </div>*/}
            {/*            }*/}
            {/*        </Container>*/}

            {/*        <ModalGame*/}
            {/*            gameArray={gameArray}*/}
            {/*            addGameToPlaylist={addGameToPlaylist}*/}
            {/*            game_choice={game_choice}*/}
            {/*            games={games_data}*/}
            {/*            handleClose={handleClose}*/}
            {/*            open={open}*/}
            {/*            scroll={scroll}*/}
            {/*        />*/}
            {/*    </TabPanel>*/}
            {/*    <TabPanel value={value} index={1} dir={theme.direction}>*/}
            {/*        Item Two*/}
            {/*    </TabPanel>*/}
            {/*    <TabPanel value={value} index={2} dir={theme.direction}>*/}
            {/*        <form action="" className="auth-form" encType="multipart/form-data">*/}
            {/*            <div className="form-control">*/}
            {/*                <TextField*/}
            {/*                    id="game_name"*/}
            {/*                    label="Titre du jeu"*/}
            {/*                    name="game_name"*/}
            {/*                    type="text"*/}
            {/*                    helperText="Entrez le titre du jeu"*/}
            {/*                    fullWidth={true}*/}
            {/*                    inputRef={game_name}*/}
            {/*                    required*/}
            {/*                />*/}
            {/*                <TextField*/}
            {/*                    id="game_desc"*/}
            {/*                    label="Description"*/}
            {/*                    name="game_desc"*/}
            {/*                    type="text"*/}
            {/*                    helperText="La description ne doit pas dépasser 100 caractères"*/}
            {/*                    fullWidth={true}*/}
            {/*                    inputRef={game_desc}*/}
            {/*                    required*/}
            {/*                />*/}
            {/*                <Upload*/}
            {/*                    uploading={uploading}*/}
            {/*                    setSuccessfullUploaded={setSuccessfulUploaded}*/}
            {/*                    successfullUploaded={successfulUploaded}*/}
            {/*                    setUploadProgress={setUploadProgress}*/}
            {/*                    setUploading={setUploading}*/}
            {/*                    uploadProgress={uploadProgress}*/}
            {/*                    setUploadingFile={setUploadingFile}*/}
            {/*                    game_pic={game_pic}*/}
            {/*                />*/}
            {/*                <Box display="flex" style={{width: '100%'}}>*/}
            {/*                    <Button*/}
            {/*                        color="primary"*/}
            {/*                        variant="contained"*/}
            {/*                        justifyContent="flex-end"*/}
            {/*                        onClick={addGame}*/}
            {/*                    >*/}
            {/*                        Add*/}
            {/*                    </Button>*/}
            {/*                </Box>*/}
            {/*            </div>*/}
            {/*        </form>*/}

            {/*    </TabPanel>*/}
            {/*</SwipeableViews>*/}
        </div>
    )
}