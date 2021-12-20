import React, {
    useRef,
    useState
} from 'react'
import {
    useMutation,
    useQuery
} from '@apollo/client'
import AuthNavbar from '../Components/Navbar/AuthNavbar'
import {LIST_USERS, UPDATE_USER} from '../Queries/UserQueries'
import {DataGrid, GridRowsProp} from '@mui/x-data-grid'
import {GridColDef} from '@mui/x-data-grid'
import Loading from './Loading'
import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'
import BlockIcon from '@mui/icons-material/Block'
import IconButton from '@material-ui/core/IconButton'
import EditIcon from '@material-ui/icons/Edit'
import {blue, green, red} from '@material-ui/core/colors'
import {Box, FormControl, Modal, TextField} from '@material-ui/core'
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

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

//Functionnal componnent
export default function BackOffice() {
    const {data} = useQuery(LIST_USERS);
    const [updateUser] = useMutation(UPDATE_USER, {
        refetchQueries: [{query: LIST_USERS}],
    });
    const [state, setState] = useState({
        openModal: false,
        user: ''
    })
    const login = useRef('')
    const email = useRef('')
    const address = useRef('')
    const city = useRef('')
    const role = useRef('')
    const zip = useRef('')
    const userState = useRef('')
    const discord = useRef('')

    const dateParser = (num) => {
        const timestamp = Date.parse(num);
        const date = new Date(timestamp).toLocaleDateString("fr-FR");
        return date.toString();
    };
    // construction dataGrid
    const rows: GridRowsProp = []
    const columns: GridColDef[] = [
        {field: 'col1', headerName: 'Pseudo', flex: 1},
        {field: 'col2', headerName: 'Email', flex: 1},
        {field: 'col3', headerName: 'Rôle', flex: 1},
        {field: 'col4', headerName: 'Membre depuis le', flex: 1},
        {
            field: 'col5',
            headerName: 'Profil actif',
            flex: 1,
            sortable: false,
            disableClickEventBubbling: true,
            renderCell: ((params) => {
                return (
                    <div className="d-flex justify-content-between align-items-center" style={{cursor: "pointer"}}>
                        <IsActiveIcon index={params.row.id} bool={params.value}/>
                    </div>
                )
            })
        },
        {
            field: 'col6',
            headerName: 'Action',
            flex: 1,
            sortable: false,
            disableClickEventBubbling: true,
            renderCell: ((params) => {
                return (
                    <div className="d-flex justify-content-between align-items-center" style={{cursor: "pointer"}}>
                        <ActionMenu
                            index={params.row.id}
                            user={params.value.user}
                        />
                    </div>
                )
            })
        },
    ]

    const handleClose = () => {
        setState({
            ...state, openModal: false
        })
    };
    // sélection icon actif ou non
    const IsActiveIcon = ({index, bool}) => {
        if (bool) {
            return <div>
                <IconButton color="secondary" aria-label="add an alarm">
                    <CheckIcon style={{color: blue[500]}}/>
                </IconButton>
            </div>
        } else {
            return <div>
                <IconButton color="secondary" aria-label="add an alarm">
                    <CloseIcon style={{color: blue[500]}}/>
                </IconButton>
            </div>
        }
    }
    // affichage menu action dans dataGrid
    const ActionMenu = ({index, user}) => {
        const handleModal = () => (
            setState({
                ...state,
                user: user,
                openModal: true
            })
        )
        return <div>
            <IconButton
                color="secondary"
                aria-label="add an alarm"
                id={user._id}
                onClick={() => {
                    handleModal()
                }}
            >
                <EditIcon style={{color: green[500]}}
                />
            </IconButton>
            <IconButton
                onClick={() => {
                    updateUser({
                        variables: {
                            id: user._id,
                            update: {user_isActive: !user.user_isActive},
                        },
                    });
                }
                }
            >
                <BlockIcon style={{color: red[500]}}/>
            </IconButton>
        </div>
    }
    // envoie de data dans le tableau rows et dans la modal
    if (data !== undefined) {
        let i = 1
        data.users.map((user, key) => {
            const userData = {
                id: i,
                col1: user.user_login,
                col2: user.user_email,
                col3: user.user_role,
                col4: dateParser(user.createdAt),
                col5: user.user_isActive,
                col6: {user: user}
            }
            rows.push(userData)
            i++
            return rows
        })
    }
    return (
        <>
            <AuthNavbar/>
            {!data ?
                <Loading/> :
                <div style={{height: 500, width: '100%'}}>
                    <DataGrid rows={rows} columns={columns}/>
                </div>

            }
            <Modal
                open={state.openModal}
                onClose={handleClose}
                key={state.user._id}
            >
                <Grid container>
                    <Grid
                        item
                        xs={12} md={12} lg={12}
                    >
                        <Box
                            sx={style}
                            component="form"
                            noValidate
                            autoComplete="off"
                        >
                            <Grid container
                                  spacing={2}
                            >
                                <Grid
                                    item
                                    xs={12} md={12} lg={12}
                                >
                                    <FormControl fullWidth>
                                        <TextField
                                            id="outlined-basic"
                                            label="Pseudo"
                                            variant="outlined"
                                            type="text"
                                            inputRef={login}
                                            name="login"
                                            value={state.user.user_login}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid
                                    item
                                    xs={12} md={12} lg={12}
                                >
                                    <FormControl fullWidth>
                                        <TextField
                                            id="outlined-basic"
                                            label="Email"
                                            variant="outlined"
                                            type="email"
                                            inputRef={email}
                                            name="email"
                                            value={state.user.user_email}
                                        />
                                    </FormControl>

                                </Grid>
                                <Grid
                                    item
                                    xs={12} md={12} lg={12}
                                >
                                    <FormControl fullWidth>
                                        <TextField
                                            id="outlined-basic"
                                            label="Discord"
                                            variant="outlined"
                                            type="text"
                                            inputRef={discord}
                                            name="discord"
                                            value={state.user.user_discord ? state.user.user_discord : ''}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid
                                    item
                                    xs={12} md={12} lg={12}
                                >
                                    <FormControl fullWidth>
                                        <TextField
                                            id="outlined-basic"
                                            label="Adresse"
                                            variant="outlined"
                                            type="text"
                                            inputRef={address}
                                            name="address"
                                            value={state.user.user_address ? state.user.user_address : ''}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid
                                    item
                                    xs={12} md={12} lg={12}
                                >
                                    <FormControl fullWidth>
                                        <TextField
                                            id="outlined-basic"
                                            label="Code Postal"
                                            variant="outlined"
                                            type="text"
                                            inputRef={zip}
                                            name="zip"
                                            value={state.user.user_zip ? state.user.user_zip : ''}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid
                                    item
                                    xs={12} md={12} lg={12}
                                >
                                    <FormControl fullWidth>
                                        <TextField
                                            id="outlined-basic"
                                            label="Ville"
                                            variant="outlined"
                                            type="text"
                                            inputRef={city}
                                            name="city"
                                            value={state.user.user_city ? state.user.user_city : ''}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid
                                    item
                                    xs={12} md={12} lg={12}
                                >
                                    <FormControl fullWidth>
                                        <TextField
                                            id="outlined-basic"
                                            label="Rôle"
                                            variant="outlined"
                                            type="text"
                                            inputRef={role}
                                            name="role"
                                            value={state.user.user_role}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid
                                    item
                                    xs={12} md={12} lg={12}
                                >
                                    <FormControl fullWidth>
                                        <TextField
                                            id="outlined-basic"
                                            label="Etat"
                                            variant="outlined"
                                            type="text"
                                            inputRef={userState}
                                            name="state"
                                            value={state.user.user_state ? state.user.user_state : ''}
                                        />
                                    </FormControl>
                                </Grid>
                            </Grid>
                            <Grid container spacing={2}>
                                <Grid
                                    item
                                    xs={6} md={6} lg={6}
                                >
                                    <Button onClick={handleClose}>Retour</Button>
                                </Grid>
                                <Grid
                                    item
                                    xs={6} md={6} lg={6}
                                >
                                    <Button>Valider</Button>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                </Grid>
            </Modal>
        </>
    )
}
