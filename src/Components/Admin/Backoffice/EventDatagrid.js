import React, {useCallback, useEffect, useRef, useState} from 'react'
import styled from '@emotion/styled'
import {DataGrid, GridColDef, GridOverlay, GridToolbar} from '@mui/x-data-grid'
import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import LinearProgress from '@mui/material/LinearProgress'
import Modal from '@mui/material/Modal'
import Snackbar from '@mui/material/Snackbar'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Loading from '../../../pages/Loading'
import {red} from '@mui/material/colors'
import BlockIcon from '@mui/icons-material/Block'
import {LISTEVENT, CREATEEVENT, UPDATEEVENT, DELETEEVENT} from '../../../Queries/EventQueries'
import {useMutation, useQuery} from '@apollo/client'
import formatDate from '../../../Tools/FormatDate'
import AddEventForm from './Form/AddEventForm'
import templateRegex from '../../../Data/template-regex'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import Alert from '@mui/material/Alert'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import UpdatePicForm from './Form/UpdatePicForm'

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
    data.events.map((event, key) => {
        const eventData = {
            id: event._id,
            event_pic: event.event_pic,
            event_name: event.event_name,
            event_start: event.event_start,
            event_end: event.event_end,
            event_allDay: event.event_allDay,
            event_desc: event.event_desc,
            event_creator: event.event_creator.user_login,
            event_score: event.event_score,
            event_winner: event.event_winner,
            createdAt: formatDate(event.createdAt),
            updatedAt: formatDate(event.updatedAt),
            Action: {event: event},
        }
        rows.push(eventData)
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
export default function EventDatagrid() {
    const columns: GridColDef[] = [
        {
            field: 'event_pic',
            headerName: 'Affiche',
            flex: 1,
            align: 'center',
            renderCell: ((params) => {
                return (
                    <div style={{cursor: "pointer"}}>
                        <RenderPic
                            params={params}
                            eventId={params.id}
                            picture={params.value}
                            eventName={params.row.event_name}
                        />
                    </div>
                )

            })
        },
        {
            field: 'event_name',
            headerName: 'Nom',
            flex: 1,
            editable: true,
            preProcessEditCellProps: (params) => {
                const isValid = formValidate('eventName', params.props.value);
                return {...params.props, error: !isValid};
            },
        },
        {
            field: 'event_start',
            headerName: 'Début',
            type: 'dateTime',
            flex: 1,
            editable: true,
            preProcessEditCellProps: (params) => {
                const isValid = formValidate('eventStart', params.props.value);
                return {...params.props, error: !isValid};
            },
        },
        {
            field: 'event_end',
            headerName: 'Fin',
            type: 'dateTime',
            flex: 1,
            editable: true,
            preProcessEditCellProps: (params) => {
                const isValid = formValidate('eventEnd', params.props.value);
                return {...params.props, error: !isValid};
            },
        },
        {
            field: 'event_allDay',
            headerName: 'Toute la journée',
            type: 'boolean',
            flex: 1,
            // editable: true,
            // preProcessEditCellProps: (params) => {
            //     const isValid = formValidate('eventDate', params.props.value);
            //     return {...params.props, error: !isValid};
            // },
        },
        {
            field: 'event_desc',
            headerName: 'Description',
            flex: 1,
            editable: true,
            preProcessEditCellProps: (params) => {
                const isValid = formValidate('eventDesc', params.props.value);
                return {...params.props, error: !isValid};
            },
        },
        {
            field: 'event_creator',
            headerName: 'Créé par',
            flex: 1,
        },
        {
            field: 'event_score',
            headerName: 'Score',
            flex: 1,
            editable: true,
            preProcessEditCellProps: (params) => {
                const isValid = formValidate('eventScore', params.props.value);
                return {...params.props, error: !isValid};
            },
        },
        {
            field: 'event_winner',
            headerName: 'Vainqueur',
            flex: 1,
            editable: true,
            preProcessEditCellProps: (params) => {
                const isValid = formValidate('eventWinner', params.props.value);
                return {...params.props, error: !isValid};
            },
        },
        {
            field: 'createdAt',
            headerName: 'Créé le',
            type: 'date',
            flex: 1
        },
        {
            field: 'updatedAt',
            headerName: 'Dernière mise à jour',
            type: 'date',
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
                            event={params.value.event}
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
    const [rows, setRows] = React.useState();
    const [allDay, setAllDay] = useState(false)
    const handleSwitchChange = (event) => {
        setAllDay(event.target.checked)
    }
    const {data} = useQuery(LISTEVENT)
    const [createEvent] = useMutation(CREATEEVENT, {
        refetchQueries: [{query: LISTEVENT}]
    })
    const [updateEvent] = useMutation(UPDATEEVENT, {
        refetchQueries: [{query: LISTEVENT}]
    })
    const [deleteEvent] = useMutation(DELETEEVENT, {
        refetchQueries: [{query: LISTEVENT}]
    })
    const ref = {
        eventPic: useRef(''),
        eventName: useRef(''),
        eventDesc: useRef(''),
        eventStart: useRef(''),
        eventEnd: useRef(''),
        eventAllDay: useRef(allDay)
    }
    const updateEventInfo = useCallback(async (event) => {
        await updateEvent({
            variables: {
                id: event.id,
                update: event.update
            }
        })
    }, [updateEvent])
    const handleCellEditCommit = useCallback(
        async (params) => {
            try {
                // Make the HTTP request to save in the backend
                const response = await updateEventInfo({
                    id: params.id,
                    update: {
                        [params.field]: params.value,
                    }
                })
                setSnackbar({children: 'Modification de l\'event enregistrée !!!', severity: 'success'});
                setRows((prev) =>
                    prev.map((row) => (row.id === params.id ? {...row, ...response} : row)),
                );
            } catch (error) {
                setSnackbar({children: 'Il y a eu un problème...', severity: 'error'});
                // Restore the row in case of error
                setRows((prev) => [...prev]);
            }
        },
        [updateEventInfo],
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
            const response = await updateEventInfo({
                id: params.id,
                update: {
                    event_pic: state.selectedFile.name,
                }
            })
            setSnackbar({children: 'Modification du profil enregistrée !!!', severity: 'success'})
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
            formData.append("file", file, file.name)
            req.open('POST', 'http://localhost:8080/upload/event/' + id)
            req.send(formData)
        })
    }
    const handleCloseSnackbar = () => setSnackbar(null)
    const handleModalCreate = async () => (
        setState({
            ...state,
            event: null,
            openModal: true
        })
    )
    const handleCloseModal = () => {
        setState({
            ...state,
            openModal: false,
            deleteModal: false,
            picModal: false,
            event: '',
        })
    }
    const handleDeleteModal = async (event) => (
        setState({
            ...state,
            event: event,
            deleteModal: true
        })
    )
    const handleModalPic = async (params) => {
        setState({
            ...state,
            picModal: true,
            params: params
        })
    }
    const RenderPic = ({params}) => {
        if(params.value !== '' && params.value !== null) {
            return (
                <Avatar
                    src={"http://localhost:5000/Upload/Event/" + params.value}
                    alt={params.value}
                    title={"Affiche de " + params.row.event_name}
                    onClick={() => {
                        handleModalPic(params)
                    }}/>
            )
        } else {
            return (
                <Avatar
                    src={"http://localhost:5000/Upload/Event/default.gif"}
                    alt={params.value}
                    title={"avatar de " + params.row.event_name}
                    onClick={() => {
                        handleModalPic(params)
                    }}/>
            )
        }

    }
    // affichage menu action dans dataGrid
    const ActionMenu = ({index, event}) => {
        return <div>
            <IconButton>
                <BlockIcon style={{color: red[500]}}/>
            </IconButton>
            <IconButton
                color="secondary"
                aria-label="Delete event"
                id={'delete' + event._id}
                onClick={() => {
                    handleDeleteModal(event)
                }}
            >
                <DeleteForeverIcon style={{color: red[500]}}
                />
            </IconButton>
        </div>
    }
    const addEvent = async () => {
        await createEvent({
            variables: {
                createEvent: {
                    event_pic: (state.selectedFile !== null ? state.selectedFile.name : ''),
                    event_name: ref.eventName.current.value,
                    event_start: ref.eventStart.current.value,
                    event_end: ref.eventEnd.current.value,
                    event_allDay: allDay,
                    event_desc: ref.eventDesc.current.value,
                }
            },
            errorPolicy: 'all',
            onCompleted: data1 => {
                console.log(data1.createEvent.event_pic)
                if (data1.createEvent.event_pic !== '') {
                    setState({...state, id: data1.createEvent._id
                    })
                }
                setSnackbar({children: 'Evènement créé !!!', severity: 'success'})
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
    const deleteEventInfo = (event) => {
        deleteEvent({
            variables: {
                id: event._id
            },
            errorPolicy: 'all',
            onCompleted: data => {
                setSnackbar({children: 'Evènement supprimé !!!', severity: 'success'})
                handleCloseModal()
            },
            onError: (({networkError}) => {
                if (networkError) {
                    networkError.result.errors.map(({message, status}) => {
                        setSnackbar({children: 'Profil supprimé !!!', severity: 'success'})
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
        if(state.id !== '' && state.selectedFile !== null) {
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
                }}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={12} lg={12}>
                            <Box textAlign="right">
                                <Button color="secondary" onClick={() => {
                                    handleModalCreate()
                                }}>Ajouter un évènement</Button>
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
                            open anchorOrigin={{ vertical, horizontal }}
                            onClose={handleCloseSnackbar}
                            autoHideDuration={6000}
                        >
                            <Alert {...snackbar} onClose={handleCloseSnackbar}/>
                        </Snackbar>
                    )}
                    {
                        state.openModal &&
                        <Modal
                            open={state.openModal}
                            onClose={handleCloseModal}
                            key="createEventModal"
                            closeAfterTransition
                            BackdropComponent={Backdrop}
                            BackdropProps={{timeout: 500}}
                        >
                            <Grid container>
                                <Grid
                                    item
                                    xs={12} md={12} lg={12}
                                >
                                    <AddEventForm
                                        style={style}
                                        input={ref}
                                        allDay={allDay}
                                        handleSwitchChange={handleSwitchChange}
                                        onfileChange={onFileChange}
                                        handleCloseModal={() => {
                                            handleCloseModal()
                                        }}
                                        addEvent={() => {
                                            addEvent()
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
                            key={state.event.event_id}
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
                                            l'évènement {state.event.event_name ? state.event.event_name : state.event._id}
                                        </Typography>
                                        <Typography id="modal-modal-description" sx={{mt: 2}}>
                                            Etes-vous sûr de vouloir supprimer cet évènement ?
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
                                                    deleteEventInfo(state.event)
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