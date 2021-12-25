import React, {useCallback, useEffect, useRef, useState} from 'react'
import styled from '@emotion/styled'
import {DataGrid, GridColDef, GridOverlay, GridToolbar} from '@mui/x-data-grid'
import {Backdrop, Box, LinearProgress, Modal, Snackbar} from '@material-ui/core'
import Loading from "../../../pages/Loading";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import {red} from "@material-ui/core/colors";
import {CREATEGAME, DELETEGAME, LISTGAMES, UPDATEGAME} from "../../../Queries/GameQueries";
import {useMutation, useQuery} from "@apollo/client";
import formatDate from "../../../Tools/FormatDate";
import AddGameForm from './Form/AddGameForm'
import templateRegex from "../../../Data/template-regex";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import {Alert} from "@material-ui/lab";
import Typography from "@material-ui/core/Typography";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
const StyledGridOverlay = styled(GridOverlay)(({theme}) => ({
    flexDirection: 'column',
    '& .ant-empty-img-1': {
        // fill: '#262626',
        fill: '#aeb8c2',
        // fill: theme.palette.mode === 'light' ? '#aeb8c2' : '#262626',
    },
    '& .ant-empty-img-2': {
        // fill: '#595959',
        fill: '#f5f5f7',
        // fill: theme.palette.mode === 'light' ? '#f5f5f7' : '#595959',
    },
    '& .ant-empty-img-3': {
        // fill: '#434343',
        fill: '#dce0e6',
        // fill: theme.palette.mode === 'light' ? '#dce0e6' : '#434343',
    },
    '& .ant-empty-img-4': {
        // fill: '#1c1c1c',
        fill: '#fff',
        // fill: theme.palette.mode === 'light' ? '#fff' : '#1c1c1c',
    },
    '& .ant-empty-img-5': {
        // fillOpacity: '0.08',
        // fill: '#fff',
        fillOpacity: '0.8',
        fill: '#f5f5f5',
        // fillOpacity: theme.palette.mode === 'light' ? '0.8' : '0.08',
        // fill: theme.palette.mode === 'light' ? '#f5f5f5' : '#fff',
    },
}));
// barre de chargement de données
function CustomLoadingOverlay() {
    return (
        <GridOverlay>
            <div style={{position: 'absolute', top: 0, width: '100%'}}>
                <LinearProgress/>
            </div>
        </GridOverlay>
    );
}
// overlay si pas de données
function CustomNoRowsOverlay() {
    return (
        <StyledGridOverlay>
            <svg
                width="120"
                height="100"
                viewBox="0 0 184 152"
                aria-hidden
                focusable="false"
            >
                <g fill="none" fillRule="evenodd">
                    <g transform="translate(24 31.67)">
                        <ellipse
                            className="ant-empty-img-5"
                            cx="67.797"
                            cy="106.89"
                            rx="67.797"
                            ry="12.668"
                        />
                        <path
                            className="ant-empty-img-1"
                            d="M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z"
                        />
                        <path
                            className="ant-empty-img-2"
                            d="M33.83 0h67.933a4 4 0 0 1 4 4v93.344a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z"
                        />
                        <path
                            className="ant-empty-img-3"
                            d="M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.525H42.94a2.262 2.262 0 0 1 0-4.525zM121.813 105.032c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238 0-5.96-2.29-6.734-5.36a7.309 7.309 0 0 1-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 5.277-2.421 5.277-5.393V75.1c0-2.972 2.343-5.426 5.25-5.426h26.318v33.569c0 .617-.077 1.216-.221 1.789z"
                        />
                    </g>
                    <path
                        className="ant-empty-img-3"
                        d="M149.121 33.292l-6.83 2.65a1 1 0 0 1-1.317-1.23l1.937-6.207c-2.589-2.944-4.109-6.534-4.109-10.408C138.802 8.102 148.92 0 161.402 0 173.881 0 184 8.102 184 18.097c0 9.995-10.118 18.097-22.599 18.097-4.528 0-8.744-1.066-12.28-2.902z"
                    />
                    <g className="ant-empty-img-4" transform="translate(149.65 15.383)">
                        <ellipse cx="20.654" cy="3.167" rx="2.849" ry="2.815"/>
                        <path d="M5.698 5.63H0L2.898.704zM9.259.704h4.985V5.63H9.259z"/>
                    </g>
                </g>
            </svg>
            <Box sx={{mt: 1}}>No Rows</Box>
        </StyledGridOverlay>
    );
}
const initRows = (data) => {

    let rows = []
    data.games.map((game, key) => {
    console.log(game)
        const gameData = {
            id: game._id,
            game_name: game.game_name,
            game_desc: game.game_desc,
            game_pic: game.game_pic,
            game_creator: game.game_creator,
            createdAt: formatDate(game.createdAt),
            updatedAt: formatDate(game.updatedAt),
            Action: {game: game},
        }
        rows.push(gameData)
        return rows
    })
    return rows
}
const formValidate = (input, value) => {
    if (value === '') {
        return true
    } else {
        return templateRegex[input].regex.test(value)
    }
}
export default function GameDatagrid() {
    const columns: GridColDef[] = [
        {
            field: 'game_name',
            headerName: 'Titre',
            flex: 1,
            editable: true,
            preProcessEditCellProps: (params) => {
                const isValid = formValidate('gameName', params.props.value);
                return {...params.props, error: !isValid};
            },
        },
        {
            field: 'game_desc',
            headerName: 'Description',
            flex: 1,
            editable: true,
            preProcessEditCellProps: (params) => {
                const isValid = formValidate('gameDesc', params.props.value);
                return {...params.props, error: !isValid};
            },
        },
        {
            field: 'game_pic',
            headerName: 'Jaquette',
            flex: 1,
            editable: true,
            preProcessEditCellProps: (params) => {
                const isValid = formValidate('gamePic', params.props.value);
                return {...params.props, error: !isValid};
            },
        },
        {
            field: 'createdAt',
            headerName: 'Créé le',
            flex: 1
        },
        {
            field: 'updatedAt',
            headerName: 'Dernière mise à jour',
            flex: 1
        },
        {
            field: 'Action',
            headerName: 'Action',
            flex: 1,
            sortable: false,
            disableClickEventBubbling: true,
            renderCell: ((params) => {
                return (
                    <div className="d-flex justify-content-between align-items-center" style={{cursor: "pointer"}}>
                        <ActionMenu
                            index={params.row.id}
                            game={params.value.game}
                        />
                    </div>
                )
            })
        },
    ]
    const [snackbar, setSnackbar] = useState(null)
    const [state, setState] = useState({
        deleteModal: false,
        openModal: false,
        game: '',

    })
    const [rows, setRows] = useState();
    const {data} = useQuery(LISTGAMES)
    const [createGame] = useMutation(CREATEGAME, {
        refetchQueries: [{query: LISTGAMES}]
    })
    const [updateGame] = useMutation(UPDATEGAME, {
        refetchQueries: [{query: LISTGAMES}]
    })
    const [deleteGame] = useMutation(DELETEGAME, {
        refetchQueries: [{query: LISTGAMES}]
    })
    const ref = {
        gameName: useRef(''),
        gameDesc: useRef(''),
        gamePic: useRef(''),
    }
    const updateGameInfo = useCallback(async (game) => {
        await updateGame({
            variables: {
                id: game.id,
                update: game.update
            }
        })
    }, [updateGame])
    const handleCellEditCommit = useCallback(
        async (params) => {
            console.log(params)
            try {
                // Make the HTTP request to save in the backend
                const response = await updateGameInfo({
                    id: params.id,
                    update: {
                        [params.field]: params.value,
                    }
                })
                setSnackbar({children: 'Modification du jeu enregistrée !!!', severity: 'success'});
                setRows((prev) =>
                    prev.map((row) => (row.id === params.id ? {...row, ...response} : row)),
                );
            } catch (error) {
                setSnackbar({children: 'Il y a eu un problème...', severity: 'error'});
                // Restore the row in case of error
                setRows((prev) => [...prev]);
            }
        },
        [updateGameInfo],
    )
    useEffect(() => {
        if (data !== undefined) {
            const init = initRows(data)
            setRows(init)
        }
    }, [data])
    const handleCloseSnackbar = () => setSnackbar(null)
    const handleDeleteModal = async (game) => (
        setState({
            ...state,
            game: game,
            deleteModal: true
        })
    )
    const handleModalCreate = async () => (
        setState({
            ...state,
            game: null,
            openModal: true
        })
    )
    const handleCloseModal = () => {
        setState({
            ...state,
            openModal: false,
            deleteModal: false
        })
    }
    // affichage menu action dans dataGrid
    const ActionMenu = ({index, game}) => {
        return <div>
            <IconButton
                color="secondary"
                aria-label="Delete user"
                id={'delete' + game._id}
                onClick={() => {
                    handleDeleteModal(game)
                }}
            >
                <DeleteForeverIcon style={{color: red[500]}}
                />
            </IconButton>
        </div>
    }
    const addGame = () => {
        createGame({
            variables: {
                createGame: {
                    game_name: ref.gameName.current.value,
                    game_pic: ref.gamePic.current.value,
                    game_desc: ref.gameDesc.current.value,
                }
            },
            errorPolicy: 'all',
            onCompleted: data1 => {
                setSnackbar({children: 'Invitation envoyée !!!', severity: 'success'})
                handleCloseModal()
            },
            onError: (({networkError}) => {
                if (networkError) {
                    networkError.result.errors.map(({message, status}) => {
                        setSnackbar({children: message, severity: 'error'})
                        return null
                    })
                }
            })

        })
    }
    const deleteGameInfo = (game) => {
        deleteGame({
            variables: {
                id:game._id
            },
            errorPolicy: 'all',
            onCompleted: data => {
                setSnackbar({children: 'Jeu supprimé !!!', severity: 'success'})
                handleCloseModal()
            },
            onError: (({networkError}) => {
                if (networkError) {
                    networkError.result.errors.map(({message, status}) => {
                        setSnackbar({children: 'Jeu sup... Ah nan, y a eu un problème quelque part...', severity: 'error'})
                        return networkError
                    })
                }
            })
        })
    }
    return (
        <>
            {data === undefined ?
                <Loading/> :
                <Box sx={{
                    height: 500,
                    width: '100%',
                    '& .MuiDataGrid-cell--editing': {
                        bgcolor: 'rgb(255,215,115, 0.19)',
                        color: '#1a3e72',
                    },
                    '& .Mui-error': {
                        bgcolor: 'rgb(126,10,15)',
                        color: '#ff4343',
                    },
                }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={12} lg={12}>
                            <Box textAlign="right">
                                <Button color="secondary" onClick={() => {
                                    handleModalCreate()
                                }}>Ajouter un jeu</Button>
                            </Box>
                        </Grid>
                    </Grid>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        components={{
                            Toolbar: GridToolbar,
                            LoadingOverlay: CustomLoadingOverlay,
                            NoRowsOverlay: CustomNoRowsOverlay,
                        }}
                        onCellEditCommit={handleCellEditCommit}
                    />
                    {!!snackbar && (
                        <Snackbar open onClose={handleCloseSnackbar} autoHideDuration={6000}>
                            <Alert {...snackbar} onClose={handleCloseSnackbar}/>
                        </Snackbar>
                    )}
                    {
                        state.openModal &&
                        <Modal
                            open={state.openModal}
                            onClose={handleCloseModal}
                            key="createGameModal"
                            closeAfterTransition
                            BackdropComponent={Backdrop}
                            BackdropProps={{timeout: 500}}
                        >
                            <Grid container>
                                <Grid
                                    item
                                    xs={12} md={12} lg={12}
                                >

                                        <AddGameForm
                                            style={style}
                                            input={ref}
                                            handleClose={() => {
                                                handleCloseModal()
                                            }}
                                            addGame={() => {
                                                addGame()
                                            }}
                                        />
                                </Grid>
                            </Grid>
                        </Modal>
                    }
                    {
                        state.deleteModal &&
                        <Modal
                            open={state.deleteModal}
                            onClose={handleCloseModal}
                            key={state.game.game_id}
                            closeAfterTransition
                            BackdropComponent={Backdrop}
                            BackdropProps={{timeout: 500}}
                        >
                            <Grid container>
                                <Grid
                                    item
                                    xs={12} md={12} lg={12}
                                >
                                    <Box sx={style}>
                                        <Typography id="modal-modal-title" variant="h6" component="h2">
                                            Suppression de
                                            l'utilisateur {state.game.game_name}
                                        </Typography>
                                        <Typography id="modal-modal-description" sx={{mt: 2}}>
                                            Etes-vous sûr de vouloir supprimer ce jeu ?
                                        </Typography>
                                        <Grid container spacing={2}>
                                            <Grid
                                                item
                                                xs={6} md={6} lg={6}
                                            >
                                                <Button onClick={handleCloseModal}>Retour</Button>
                                            </Grid>
                                            <Grid
                                                item
                                                xs={6} md={6} lg={6}
                                            >
                                                <Button onClick={() => {
                                                    deleteGameInfo(state.game)
                                                }}>Valider</Button>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Modal>
                    }
                </Box>
            }
        </>
    )
}