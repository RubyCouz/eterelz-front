import React, {
    useState,
    useContext,
    useRef
} from 'react'
import AddIcon from '@material-ui/icons/Add'
import {
    Fab,
    CircularProgress,
} from '@material-ui/core'
import {makeStyles, useTheme} from '@material-ui/core/styles'
import {
    gql,
    useQuery,
    useMutation
} from '@apollo/client'
import Modal from '../Components/Modal/Modal'
import BackDrop from '../Components/Backdrop/Backdrop'
import EventList from '../Components/Events/EventList/EventList'
import AuthNavbar from '../Components/Navbar/AuthNavbar'
import AuthContext from '../context/auth-context'
import './Events.css'
import Autocomplete from '../Components/Tags/Tags'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%'
    }
}))

//Fragment d'un seul event
const EVENT_QUERY = gql`
    fragment EventQuery on Event{
        _id
        event_name
        event_date
        event_desc
        event_creator {
            _id
            user_email
        }
        createdAt
    }
`

//Liste des events
const LIST_EVENTS = gql`
    ${EVENT_QUERY}
    query{
        events{
            ...EventQuery
        }
    }
`

//Création d'un event
const CREATE_EVENTS = gql`
    ${EVENT_QUERY}
    mutation CreateEvent($event_name: String!, $event_date: String!, $event_desc: String!) {
        createEvent(eventInput: {
            event_name: $event_name
            event_date: $event_date
            event_desc: $event_desc
        })
        {
            ...EventQuery
        }
    }
`


//requête suppression d'un event par l'id
const DELETE_EVENTS = gql`
    mutation DeleteEvent($id : ID!) {
         deleteEvent(id: $id)
        {
            _id
        }
    }
`

//requête d'pdate d'un event par l'id
const UPDATE_EVENTS = gql`
 mutation UpdateEvent($id : ID!, $updateEventInput: UpdateEventInput) {
         updateEvent(id: $id, updateEventInput : $updateEventInput)
        {
            event_name 
            event_date
            event_desc
        }
    }
`

//fonction par defaut
export default function EventsPage(props) {


    let classes = useStyles()
    const context = useContext(AuthContext)

    const [state, setState] = useState({
        creating: false,
        isLoading: false,
        selectedEvent: null,
        updating : null
    })


    //fonction fermeture d'une modal
    const modalCancelHandler = () => {
        const cancelModal = {creating: false, selectedEvent: null, updating : false}
        setState({...state, ...cancelModal})
        setValue(initialValue)
    }
    //initialisation des valeurs
    const initialValue = {
        event_name : '',
        event_desc : '',
        event_date : '',
        event_time : ''
    }

    //récupération des valeurs initials
    const [value, setValue] = React.useState(initialValue);

    //fonction de d'ouverture d'un évent (variable récupère soit creating/updating et l'id
    const openModal = variable => {
        let resultat
        //ouvre la modal par rapport à son id
        if(variable.id){
            //récupère les informations par rapport à l'id
            let updatingEvent = data.events.find(e => e._id === variable.id)
            const dateTime = updatingEvent.event_date
            const time = new Date(dateTime)
            const dateSplit = dateTime.split('T')
            updatingEvent = {...updatingEvent, event_date : dateSplit[0],event_time : time.toLocaleTimeString()}
            resultat = {...state, updating : updatingEvent}

            //set les valeurs dans les inputs à l'ouverture de la modal
            setValue({...value, event_name : updatingEvent.event_name, event_desc : updatingEvent.event_desc, event_date : updatingEvent.event_date, event_time : updatingEvent.event_time})

        }
        else{
            resultat = {...state, ...variable}
        }
        setState(resultat)
    }

    //fonction d'affichage des détails d'un évent
    const showDetailHandler = eventId => {
        const selectedEvent = data.events.find(e => e._id === eventId)
        setState({...state, selectedEvent: selectedEvent})
    }

    //récupère la valeur de l'input
    const handleChange = (e) => {
        // récupère le nom de la variable et set la valeur à l'intérieur
        setValue ({...value, [e.target.name] : e.target.value})
    }

    const {loading, error, data} = useQuery(LIST_EVENTS)

    //Envoie des données à l'api
    const [sendCreateEvent] = useMutation(
        CREATE_EVENTS,
        {
            update(cache, { data: { createEvent } }) {
                cache.modify({
                    fields: {
                        events(existingEvent = []) {
                            const newEventRef = cache.writeFragment({
                                data: createEvent,
                                fragment: EVENT_QUERY
                            })
                            return existingEvent.concat(newEventRef)
                        }
                    }
                })
            },
        }
    )

    //bouton confirmer la creation d'un event r'envoie les données grâce à sendCreateEvent
    const confirmHandler = () => {
        sendCreateEvent({
            variables: {
                event_name: value.event_name,
                event_date: value.event_date + "T" + value.event_time,
                event_desc: value.event_desc
            },
            optimisticResponse: {
                createEvent: {
                    _id: "temp" + Date.now().toString(36),
                    __typename: "Event",
                    event_name: value.event_name,
                    event_date: value.event_date + "T" + value.event_time,
                    event_desc: value.event_desc,
                    event_creator: {
                        __typename: "User",
                        _id:  context.playload.userId,
                        user_email: context.playload.user_email
                    },
                    createdAt: new Date()
                }
            }
        })
        //ferme la modal
        modalCancelHandler()
    }

    const confirmUpdateHandler = () => {
        updateEvent({
            variables: {
                id : state.updating._id,
                updateEventInput : {
                    event_name: value.event_name,
                    event_date: value.event_date + "T" + value.event_time,
                    event_desc: value.event_desc
                },
            },
            //optimistic réponse r'envoie la réponse en avant sur le cache
            // optimisticResponse: {
            //     updateEvent: {
            //         __typename: "Event",
            //         event_name: value.event_name,
            //         event_date: value.event_date + "T" + value.event_time,
            //         event_desc: value.event_desc
            //
            //     }
            // }
        })
        //ferme la modal
        modalCancelHandler()
    }

    //constante de suppression d'un évent
    const [deleteEvent]  = useMutation(
        DELETE_EVENTS,
        {
            update: (cache, { data: { deleteEvent } }) => {
                cache.evict({ id: "Event:" + deleteEvent._id })    
            }
        }
    )


    //constante de modification d'un évent
    const [updateEvent]  = useMutation(
        UPDATE_EVENTS,
        {
                    refetchQueries:[{query:LIST_EVENTS}]
            // update(cache, { data: { updateEvent } }) {
            //     cache.modify({
            //         fields: {
            //             events(existingEvent = []) {
            //                 const updateEventRef = cache.writeFragment({
            //                     data: updateEvent,
            //                     fragment: EVENT_QUERY
            //                 })
            //                 return existingEvent.concat(updateEventRef)
            //             }
            //         }
            //     })
            // },
        }

    )

    return (
        <div className={classes.root}>
            <AuthNavbar/>
            <h1>Liste des Events</h1>
            {
                //condition de création OU de sélection d'un évent
                (state.creating || state.selectedEvent) &&
                    <BackDrop/>
            }
            {
                //Modal de création d'un évent
                state.creating &&
                    <Modal
                        title="Création d'un event"
                        canCancel
                        canConfirm
                        onCancel={modalCancelHandler}
                        onConfirm={confirmHandler}
                        confirmText="Confirm"
                    >

                        <form action="">

                            <div className="form_control">
                                <label htmlFor="event_name">Nom de l'event</label>
                                <input type="text" name="event_name" id="event_name" value={value.event_name} onChange={handleChange}/>
                            </div>
                            <div className="form_control">
                                <label htmlFor="event_desc">Description</label>
                                <textarea name="event_desc" name="event_desc" id="event_desc" cols="10" rows="4" value={value.event_desc} onChange={handleChange}/>
                            </div>
                            <div className="form_control">
                                <label htmlFor="event_date">Date</label>
                                <input type="date" name="event_date" id="event_date" value={value.event_date} onChange={handleChange}/>
                            </div>
                            <div className="form_control">
                                <label htmlFor="event_time">Heure</label>
                                <input type="time" name="event_time" id="event_time" value={value.event_time} onChange={handleChange}/>
                            </div>
                        </form>
                    </Modal>

            }
            {
                state.updating &&
                <Modal
                    title="Modification d'un évent"
                    canCancel
                    canConfirm
                    onCancel={modalCancelHandler}
                    onConfirm={confirmUpdateHandler}
                    confirmText="Confirm"
                    >

                    <form action="">

                        <div className="form_control">
                            <label htmlFor="event_name">Nom de l'event</label>
                            <input type="text" name="event_name" id="event_name"  value={value.event_name} onChange={handleChange}/>
                        </div>
                        <div className="form_control">
                            <label htmlFor="event_desc">Description</label>
                            <textarea name="event_desc" id="event_desc" cols="10" rows="4"  value={value.event_desc} onChange={handleChange}/>
                        </div>
                        <div className="form_control">
                            <label htmlFor="event_date">Date</label>
                            <input type="date" name="event_date" id="event_date"  value={value.event_date} onChange={handleChange}/>
                        </div>
                        <div className="form_control">
                            <label htmlFor="event_time">Heure</label>
                            <input type="time" name="event_time" id="event_time" value={value.event_time} onChange={handleChange}/>
                        </div>
                    </form>
                </Modal>
            }
            {
                //Vue modal d'un event crée
                state.selectedEvent &&
                    <Modal
                        title={state.selectedEvent.event_name}
                        canCancel
                        canConfirm
                        onCancel={modalCancelHandler}
                        onConfirm={modalCancelHandler}
                    >
                        <h2>{state.selectedEvent.event_name}</h2>
                        <h3>{new Date(state.selectedEvent.event_date).toLocaleDateString()}</h3>
                        <p>{state.selectedEvent.event_desc}</p>
                    </Modal>
            }


            {
                context.token &&
                    //Si connecter afficher la création d'évent
                    <div className="events-control">
                        <p>Créez Votre Event !!!</p>
                        <Fab color="primary" aria-label="add" onClick={() => openModal({creating: true})}>
                            <AddIcon/>
                        </Fab>
                    </div>
            }
            {/*affichage de la barre des tags*/}
            <Autocomplete/>
            <section>
                {
                    loading ?
                        <CircularProgress/> 
                    :
                        error ?
                            <p>{JSON.stringify(error)}</p> 
                        :
                            <EventList
                                events={data.events}
                                authUserId={context.playload.userId}
                                onViewDetail={showDetailHandler}
                                deleteEvent={deleteEvent}
                                openModal={openModal}

                            />
                }
            </section>
        </div>
    )
}
