import React, {useRef, useState} from 'react'
import styled from '@emotion/styled'
import {DataGrid, GridColDef, GridOverlay, GridRowsProp, GridToolbar} from '@mui/x-data-grid'
import {Backdrop, Box, LinearProgress, Modal} from '@material-ui/core'
import Loading from "../../../pages/Loading";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import {green, red} from "@material-ui/core/colors";
import BlockIcon from "@mui/icons-material/Block";
import {LISTEVENT, CREATEEVENT, UPDATEEVENT} from '../../../Queries/EventQueries'
import {useMutation, useQuery} from "@apollo/client";
import formatDate from "../../../Tools/FormatDate";
import AddEventForm from './Form/AddEventForm'
import UpdateEventForm from './Form/UpdateEventForm'

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

export default function EventDatagrid() {
    const [state, setState] = useState({
        openModal: false,
        event: ''
    })
    const ref = {
        eventName: useRef(''),
        eventDesc: useRef(''),
    }
    const {data} = useQuery(LISTEVENT)
    const [createEvent] = useMutation(CREATEEVENT, {
        refetchQueries: [{query: LISTEVENT}]
    })
    const [updateEvent] = useMutation(UPDATEEVENT, {
        refetchQueries: [{query: UPDATEEVENT}]
    })
    const handleModalCreate = async () => (
        setState({
            ...state,
            event: null,
            openModal: true
        })
    )
    const handleClose = () => {
        setState({
            ...state, openModal: false
        })
    };
    // affichage menu action dans dataGrid
    const ActionMenu = ({index, event}) => {
        const handleModal = async () => (
            setState({
                ...state,
                event: event,
                openModal: true
            })
        )
        return <div>
            <IconButton
                color="secondary"
                aria-label="add an alarm"
                id={event._id}
                onClick={() => {
                    handleModal()
                }}
            >
                <EditIcon style={{color: green[500]}}
                />
            </IconButton>
            <IconButton>
                <BlockIcon style={{color: red[500]}}/>
            </IconButton>
        </div>
    }
    const rows: GridRowsProp = []
    const columns: GridColDef[] = [
        {field: 'col1', headerName: 'Nom de l\'event', flex: 1},
        {field: 'col2', headerName: 'Date', flex: 1},
        {field: 'col3', headerName: 'Description', flex: 1},
        {field: 'col4', headerName: 'Créateur', flex: 1},
        {field: 'col5', headerName: 'Score', flex: 1},
        {field: 'col6', headerName: 'Gagnant', flex: 1},
        {field: 'col7', headerName: 'Créé le', flex: 1},
        {field: 'col8', headerName: 'Dernière mise à jour', flex: 1},
        {
            field: 'col9',
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
    if (data !== undefined) {
        let i = 1
        data.events.map((event, key) => {
            const userData = {
                id: i,
                col1: event.event_name,
                col2: event.event_date,
                col3: event.event_desc,
                col4: event.event_creator.user_login,
                col5: event.event_score,
                col6: event.event_winner,
                col7: formatDate(event.createdAt),
                col8: formatDate(event.updatedAt),
                col9: {event: event}
            }
            rows.push(userData)
            i++
            return rows
        })
    }
    const addEvent = () => {
        createEvent({
            variables: {
                createEvent: {
                    event_name: ref.eventName.current.value,
                    event_date: ref.eventDate.current.value,
                    event_desc: ref.eventDesc.current.value,
                }
            },
            errorPolicy: 'all',
            onCompleted: data => {
                console.log(data)
                handleClose()
            },
            onError: error => {
                console.log(error)
            }
        })
    }
    const updateEventInfo = (event) => {
        updateEvent({
            variables: {
                id: event._id,
                update: {
                    event_name: ref.eventName.current.value,
                    event_date: ref.eventDate.current.value,
                    event_desc: ref.eventDesc.current.value,
                }
            },
            errorPolicy: 'all',
            onCompleted: data => {
                console.log(data)
                handleClose()
            },
            onError: error => {
                console.log(error)
            }
        })
        return event
    }
    return (
        <>
            {/*{data === undefined ?*/}
            {/*    <Loading/> :*/}
            <div style={{height: 500, width: '100%'}}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={12} lg={12}>
                        <Box textAlign="right">
                            <Button color="secondary" onClick={() => {
                                handleModalCreate()
                            }}>Ajouter un évènement</Button>
                        </Box>
                    </Grid>
                </Grid>
                {data ?
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        components={{
                            Toolbar: GridToolbar,
                            LoadingOverlay: CustomLoadingOverlay,
                            NoRowsOverlay: CustomNoRowsOverlay,
                        }}
                    /> :
                    <Loading/>
                }
                <Modal
                    open={state.openModal}
                    onClose={handleClose}
                    key={state.event !== null ? state.event._id : 'createEventModal'}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{timeout: 500}}
                >
                    <Grid container>
                        <Grid
                            item
                            xs={12} md={12} lg={12}
                        >
                            {state.event ?
                                <UpdateEventForm
                                    style={style}
                                    input={ref}
                                    state={state}
                                    handleClose={() => {
                                        handleClose()
                                    }}
                                    updateEvent={() => {
                                        updateEventInfo(state.event)
                                    }}
                                /> :
                                <AddEventForm
                                    style={style}
                                    input={ref}
                                    handleClose={() => {
                                        handleClose()
                                    }}
                                    addEvent={() => {
                                        addEvent()
                                    }}
                                />
                            }
                        </Grid>
                    </Grid>
                </Modal>
            </div>
            }
        </>
    )
}