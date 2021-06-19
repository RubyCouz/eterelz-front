import React, {useState, useContext, useRef} from 'react'
import AuthContext from '../context/auth-context'
import Spinner from '../Components/Spinner/Spinner'
import Modal from '../Components/Modal/Modal'
import BackDrop from '../Components/Backdrop/Backdrop'
import EventList from '../Components/Events/EventList/EventList'
import './Events.css'
import {
    gql,
    useQuery,
    useMutation
} from '@apollo/client'

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
const LIST_EVENTS = gql`
    ${EVENT_QUERY}
    query{
        events{
            ...EventQuery
        }
    }
`;

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
`;


export default function EventsPage(props) {
    const context = useContext(AuthContext)

    const [state, setState] = useState({
        creating: false,
        events: [],
        isLoading: false,
        selectedEvent: null
    })
  
    const modalCancelHandler = () => {
        const cancelModal = {creating: false,  selectedEvent: null}
        setState({...state, ...cancelModal})
    }

    const startCreateEventHandler = () => {
        setState({...state , creating: true})
    }

    const showDetailHandler = eventId => {
        const selectedEvent = data.events.find(e => e._id === eventId)
        setState({...state, selectedEvent: selectedEvent})
    }

    const event_name = useRef('')
    const event_desc = useRef('')
    const event_date = useRef('')
    const event_time = useRef('')

    const { loading, error, data } = useQuery(LIST_EVENTS)

    const [modalConfirmHandler] = useMutation(
        CREATE_EVENTS,
        {
            onCompleted: (dataMutationEvent) => {
                if (dataMutationEvent.createEvent !== undefined){
                    let listEvents = state.events

                    listEvents.push(dataMutationEvent.createEvent)
                    setState({...state, events : listEvents})

                    modalCancelHandler()
                }
            }
        }
    )

    return ( 
        <>
            <h1>Liste des Events</h1>
            {
                (state.creating || state.selectedEvent) && 
                    <BackDrop/>
            }
            {   
                state.creating &&
                    <Modal
                        title = "Création d'un event"
                        canCancel
                        canConfirm
                        onCancel = {modalCancelHandler}
                        onConfirm = {
                            () => modalConfirmHandler({
                                variables:{
                                    event_name: event_name.current.value,
                                    event_date: event_date.current.value + "T" + event_time.current.value,
                                    event_desc: event_desc.current.value
                                }
                            })
                        }
                        confirmText = "Confirm"
                    >
                        <form action="">
                            <div className="form_control">
                                <label htmlFor="event_name">Nom de l'event</label>
                                <input type="text" id="event_name" ref={event_name}/>
                            </div>
                            <div className="form_control">
                                <label htmlFor="event_desc">Description</label>
                                <textarea name="event_desc" id="event_desc" cols="10" rows="4" ref={event_desc}/>
                            </div>
                            <div className="form_control">
                                <label htmlFor="event_date">Date</label>
                                <input type="date" id="event_date" ref={event_date} />
                            </div>
                            <div className="form_control">
                                <label htmlFor="event_time">Heure</label>
                                <input type="time" id="event_time" ref={event_time} />
                            </div>

                        </form>
                    </Modal>
            }
            {
                state.selectedEvent &&
                    <Modal
                        title = {state.selectedEvent.event_name}
                        canCancel
                        canConfirm
                        onCancel = {modalCancelHandler}
                        onConfirm = {modalCancelHandler}
                    >
                        <h2>{state.selectedEvent.event_name}</h2>
                        <h3>{new Date(state.selectedEvent.event_date).toLocaleDateString()}</h3>
                        <p>{state.selectedEvent.event_desc}</p>
                    </Modal>
            }
            {
                context.token &&
                    <div className="events-control">
                        <p>Créez Votre Event !!!</p>
                        <button className="btn" onClick={startCreateEventHandler}>Création d'event</button>
                    </div>
            }
            <section>
                { 
                    loading ?
                        <Spinner/>:
                        error ?
                            <p>{JSON.stringify(error)}</p>:
                            <EventList
                                events={state.events.concat(data.events)}
                                authUserId={context.playload ? context.playload.userId : null}
                                onViewDetail={showDetailHandler}
                            />
                }
            </section>
        </>
    )
}
