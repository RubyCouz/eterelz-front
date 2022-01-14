import React, {useCallback, useEffect, useRef, useState} from 'react'
import styled from '@emotion/styled'
import {DataGrid, GridColDef, GridOverlay, GridToolbar} from '@mui/x-data-grid'
import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import LinearProgress from '@mui/material/LinearProgress'
import Modal from '@mui/material/Modal'
import Snackbar from '@mui/material/Snackbar'
import Loading from '../../../pages/Loading'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import AddClanForm from './Form/AddClanForm'
import IconButton from '@mui/material/IconButton'
import {red} from '@mui/material/colors'
import {useMutation, useQuery} from '@apollo/client'
import {LISTCLANS, CREATECLAN, UPDATECLAN, DELETECLAN} from '../../../Queries/ClanQueries'
import formatDate from '../../../Tools/FormatDate'
import templateRegex from '../../../Data/template-regex'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import Alert from '@mui/material/Alert'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import UpdatePicForm from './Form/UpdatePicForm'
import {HOST} from '../../../config'

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
}))
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
    data.clans.map((clan, key) => {
        const clanData = {
            id: clan._id,
            clan_name: clan.clan_name,
            clan_desc: clan.clan_desc,
            clan_banner: clan.clan_banner,
            clan_discord: clan.clan_discord,
            clan_population: clan.clan_population,
            clan_recrut: clan.clan_recrut,
            clan_activity: clan.clan_activity,
            clan_creator: clan.clan_creator.user_login,
            createdAt: formatDate(clan.createdAt),
            updatedAt: formatDate(clan.updatedAt),
            Action: {clan: clan},
        }
        rows.push(clanData)
        return rows
    })
    return rows
}
const formValidate = (input, value) => {
    if (value === '') {
        return true
    } else {
        return templateRegex[input].regex.test(value.toLowerCase())
    }
}
export default function ClanDatagrid() {
    const columns: GridColDef[] = [
        {
            field: 'clan_banner',
            headerName: 'Bannière',
            flex: 1,
            align: "center",
            renderCell: ((params) => {
                return (
                    <div style={{cursor: "pointer"}}>
                        <RenderPic
                            params={params}
                            clanId={params.id}
                            picture={params.value}
                            clanName={params.row.clan_name}
                        />
                    </div>
                )

            })
        },
        {
            field: 'clan_name',
            headerName: 'Nom du clan / team',
            flex: 1,
            editable: true,
            preProcessEditCellProps: (params) => {
                const isValid = formValidate('clanName', params.props.value);
                return {...params.props, error: !isValid};
            },
        },
        {
            field: 'clan_desc',
            headerName: 'Description',
            flex: 1,
            editable: true,
            preProcessEditCellProps: (params) => {
                const isValid = formValidate('clanDesc', params.props.value);
                return {...params.props, error: !isValid};
            },
        },
        {
            field: 'clan_discord',
            headerName: 'Discord',
            flex: 1,
            editable: true,
            preProcessEditCellProps: (params) => {
                const isValid = formValidate('clanDiscord', params.props.value);
                return {...params.props, error: !isValid};
            },
        },
        {
            field: 'clan_population',
            headerName: 'Nombre de membres',
            flex: 1,
            editable: true,
            preProcessEditCellProps: (params) => {
                const isValid = formValidate('clanPopulation', params.props.value);
                return {...params.props, error: !isValid};
            },
        },
        {
            field: 'clan_recrut',
            headerName: 'Recrutement',
            flex: 1,
            editable: true,
            preProcessEditCellProps: (params) => {
                const isValid = formValidate('clanRecrut', params.props.value);
                return {...params.props, error: !isValid};
            },
        },
        {
            field: 'clan_activity',
            headerName: 'Activité',
            flex: 1,
            editable: true,
            preProcessEditCellProps: (params) => {
                const isValid = formValidate('clanActivity', params.props.value);
                return {...params.props, error: !isValid};
            },
        },
        {
            field: 'clan_creator',
            headerName: 'Créateur',
            flex: 1,
        },
        {
            field: 'createdAt',
            headerName: 'Créé(e) depuis le',
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
                            clan={params.value.clan}
                        />
                    </div>
                )
            })
        },
        ]
    const [horizontal] = useState('center')
    const [vertical] = useState('bottom')
    const [snackbar, setSnackbar] = useState(null)
    const [state, setState] = useState({
        id: '',
        picModal: false,
        deleteModal: false,
        openModal: false,
        event: '',
        params: '',
        selectedFile: null
    })
    const ref = {
        clanPic: useRef(''),
        clanName: useRef(''),
        clanDesc: useRef(''),
        clanDiscord: useRef(''),
        clanPopulation: useRef(''),
        clanRecrut: useRef(''),
        clanActivity: useRef(''),
    }
    const [rows, setRows] = useState();
    const {data} = useQuery(LISTCLANS)
    const [createClan] = useMutation(CREATECLAN, {
        refetchQueries: [{query: LISTCLANS}]
    })
    const [updateClan] = useMutation(UPDATECLAN, {
        refetchQueries: [{query: LISTCLANS}]
    })
    const [deleteClan] = useMutation(DELETECLAN, {
        refetchQueries: [{query: LISTCLANS}]
    })
    const updateClanInfo = useCallback(async (clan) => {
        await updateClan({
            variables: {
                id: clan.id,
                update: clan.update
            }
        })
    }, [updateClan])
    const handleCellEditCommit = useCallback(
        async (params) => {
            try {
                // Make the HTTP request to save in the backend
                const response = await updateClanInfo({
                    id: params.id,
                    update: {
                        [params.field]: params.value,
                    }
                })
                setSnackbar({
                    children: 'Modification des informations de la team / clan enregistrée !!!',
                    severity: 'success'
                });
                setRows((prev) =>
                    prev.map((row) => (row.id === params.id ? {...row, ...response} : row)),
                );
            } catch (error) {
                setSnackbar({children: 'Il y a eu un problème...', severity: 'error'});
                // Restore the row in case of error
                setRows((prev) => [...prev]);
            }
        },
        [updateClanInfo],
    )
    const onFileChange = (event) => {
        setState({
            ...state,
            selectedFile: event.target.files[0]
        })
    }
    const updatePic = async (params) => {
        const promises = []
        promises.push(sendRequest(state.selectedFile, params.id))
        try {
            await Promise.all(promises)
            const response = await updateClanInfo({
                id: params.id,
                update: {
                    clan_banner: state.selectedFile.name,
                }
            })
            setSnackbar({children: 'Modification du clan enregistrée !!!', severity: 'success'})
            setRows((prev) =>
                prev.map((row) => (row.id === params.id ? {...row, ...response} : row)),
            )
            handleCloseModal()
        } catch (error) {
            setSnackbar({children: 'Il y a eu un problème...', severity: 'error'});
            // Restore the row in case of error
            setRows((prev) => [...prev]);
        }
    }
    const sendRequest = (file, id) => {
        return new Promise((resolve, reject) => {
            const req = new XMLHttpRequest()
            req.upload.addEventListener('progress', event => {
                console.log('in progress')
            })
            req.upload.addEventListener('load', event => {
                console.log('complete')
                resolve(req.response)
            })
            req.upload.addEventListener('error', event => {
                console.log('error')
            })
            const formData = new FormData()
            formData.append('file', file, file.name)
            req.open('POST', HOST + '/upload/clan/' + id)
            req.send(formData)
        })
    }
    const handleCloseSnackbar = () => setSnackbar(null)
    const handleDeleteModal = async (clan) => (
        setState({
            ...state,
            clan: clan,
            deleteModal: true
        })
    )
    const handleModalCreate = async () => (
        setState({
            ...state,
            clan: null,
            openModal: true
        })
    )
    const handleModalPic = async (params) => {
        setState({
            ...state,
            picModal: true,
            params: params
        })
    }
    const handleCloseModal = () => {
        setState({
            ...state,
            openModal: false,
            deleteModal: false,
            picModal: false,
            event: '',
        })
    }
    const RenderPic = ({params}) => {
        if (params.value !== '' && params.value !== null) {
            return (
                <Avatar
                    src={HOST + "/Upload/Clan/" + params.value}
                    alt={params.value}
                    title={"Bannière de " + params.row.clanName}
                    onClick={() => {
                        handleModalPic(params)
                    }}/>
            )
        } else {
            return (
                <Avatar
                    src={HOST + "/Upload/Clan/default.gif"}
                    alt={params.value}
                    title={"Bannière de " + params.row.clanName}
                    onClick={() => {
                        handleModalPic(params)
                    }}/>
            )
        }
    }
    // affichage menu action dans dataGrid
    const ActionMenu = ({index, clan}) => {
        return <div>
            <IconButton
                color="secondary"
                aria-label="Delete clan"
                id={'delete' + clan._id}
                onClick={() => {
                    handleDeleteModal(clan)
                }}
            >
                <DeleteForeverIcon style={{color: red[500]}}
                />
            </IconButton>
        </div>
    }
    const addClan = async () => {
        await createClan({
            variables: {
                createClan: {
                    clan_name: ref.clanName.current.value,
                    clan_desc: ref.clanDesc.current.value,
                    clan_banner: (state.selectedFile !== null ? state.selectedFile.name : ''),
                    clan_discord: ref.clanDiscord.current.value,
                    clan_population: ref.clanPopulation.current.value,
                    clan_recrut: ref.clanRecrut.current.value,
                    clan_activity: ref.clanActivity.current.value,
                }
            },
            errorPolicy: 'all',
            onCompleted: data1 => {
                if (data1.createClan.clan_banner !== '') {
                    setState({
                        ...state, id: data1.createClan._id
                    })
                }
                setSnackbar({children: 'Clan / Team créé(e) !!!', severity: 'success'})
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
    const deleteClanInfo = (clan) => {
        deleteClan({
            variables: {
                id: clan._id
            },
            errorPolicy: 'all',
            onCompleted: data => {
                setSnackbar({children: 'Clan / Team supprimé(e) !!!', severity: 'success'})
                handleCloseModal()
            },
            onError: (({networkError}) => {
                if (networkError) {
                    networkError.result.errors.map(({message, status}) => {
                        setSnackbar({children: 'Clan / Team sup... Oh wait...', severity: 'error'})
                        return networkError
                    })
                }
            })
        })
    }
    useEffect(() => {
        if (data !== undefined) {
            const init = initRows(data)
            setRows(init)
        }
        if (state.id !== '' && state.selectedFile !== null) {
            const promises = []
            promises.push(sendRequest(state.selectedFile, state.id))
        }
    }, [data, state.id, state.selectedFile])
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
                                }}>Ajouter un clan</Button>
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
                        <Snackbar
                            open
                            onClose={handleCloseSnackbar}
                            autoHideDuration={6000}
                            anchorOrigin={{vertical, horizontal}}
                        >
                            <Alert {...snackbar} onClose={handleCloseSnackbar}/>
                        </Snackbar>
                    )}
                    {
                        state.openModal &&
                        <Modal
                            open={state.openModal}
                            onClose={handleCloseModal}
                            key="createClanModal"
                            closeAfterTransition
                            BackdropComponent={Backdrop}
                            BackdropProps={{timeout: 500}}
                        >
                            <Grid container>
                                <Grid
                                    item
                                    xs={12} md={12} lg={12}
                                >
                                    <AddClanForm
                                        style={style}
                                        input={ref}
                                        onfileChange={onFileChange}
                                        handleClose={() => {
                                            handleCloseModal()
                                        }}
                                        addClan={() => {
                                            addClan()
                                        }}
                                    />
                                </Grid>
                            </Grid>
                        </Modal>
                    }
                    {state.deleteModal &&
                    <Modal
                        open={state.deleteModal}
                        onClose={handleCloseModal}
                        key={state.clan.clan_id}
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
                                        du clan / team {state.clan.clan_name ? state.clan.clan_name : state.clan._id}
                                    </Typography>
                                    <Typography id="modal-modal-description" sx={{mt: 2}}>
                                        Etes-vous sûr de vouloir supprimer ce clan / team ?
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
                                                deleteClanInfo(state.clan)
                                            }}>Valider</Button>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Grid>
                        </Grid>
                    </Modal>
                    }
                    {state.picModal &&
                    <Modal
                        open={state.picModal}
                        onClose={handleCloseModal}
                        key={state.params.id}
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
                                    <h1>Modification de l'affiche de {state.params.row.event_name}</h1>
                                    <UpdatePicForm
                                        handleCloseModal={handleCloseModal}
                                        onfileChange={onFileChange}
                                        updatePic={() => {
                                            updatePic(state.params)
                                        }}
                                    />
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