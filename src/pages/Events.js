import React, {useState, useContext, useEffect} from 'react'
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
} from "@apollo/client";


const LIST_EVENTS = gql`
    query{
        events{
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
    }
`;

const CREATE_EVENTS = gql`
    mutation CreateEvent($event_name: String!, $event_date: String!, $event_desc: String!) {
        createEvent(eventInput: {
            event_name: $event_name
            event_date: $event_date
            event_desc: $event_desc
        })
        {
            _id
        }
    }
`;

function EventsPage(props) {
    const context = useContext(AuthContext)


    const [state, setState] = useState({
        creating: false,
        events: [],
        isLoading: false,
        selectedEvent: null
    })
  
    const { loading, error, data } = useQuery(LIST_EVENTS)

    const modalCancelHandler = () => {
        setState({
            creating: false,
            selectedEvent: null
        })
    }

    const startCreateEventHandler = () => {
        setState({...state , creating: true})
    }

    const showDetailHandler = eventId => {
        const selectedEvent = data.events.find(e => e._id === eventId)
        setState({...state, selectedEvent: selectedEvent})
    }

    const [input, setInput] = useState({
        event_name: "",
        event_desc: "",
        event_date: ""
    })
    
    function inputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.id;
        setInput({ ...input, [name]: value });
    }

    const [modalConfirmHandler, { dataCreateEvent }] = useMutation(
        CREATE_EVENTS,{
            variables:{
                ...input

            } 
        }
        
    );

    return ( 
        <>
            <h1>Liste des Events</h1>
            {(state.creating || state.selectedEvent) && <BackDrop/>}
            {state.creating &&
                <Modal
                    title="Création d'un event"
                    canCancel
                    canConfirm
                    onCancel={modalCancelHandler}
                    onConfirm={() => modalConfirmHandler()}
                    confirmText="Confirm"
                >
                    <form action="">
                        <div className="form_control">
                            <label htmlFor="event_name">Nom de l'event</label>
                            <input type="text" id="event_name" value={input.event_name} onChange={inputChange} />
                        </div>
                        <div className="form_control">
                            <label htmlFor="event_desc">Description</label>
                            <textarea name="event_desc" id="event_desc" cols="10" rows="4" value={input.event_desc} onChange={inputChange}/>
                        </div>
                        <div className="form_control">
                            <label htmlFor="event_date">Date et Heure</label>
                            <input type="datetime-local" id="event_date" value={input.event_date} onChange={inputChange}/>
                        </div>

                    </form>
                </Modal>
            }
            {state.selectedEvent && (
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
            )}
            {context.token && (
                <div className="events-control">
                    <p>Créez Votre Event !!!</p>
                    <button className="btn" onClick={startCreateEventHandler}>Création d'event</button>
                </div>
            )}
            <section>
                 { loading ?
                        <Spinner/>:
                        error ?
                        <p>{JSON.stringify(error)}</p>
                        :<EventList
                            events={data.events}
                            authUserId={context.playload ? context.playload.userId : null}
                            onViewDetail={showDetailHandler}
                        />
                    }
            </section>
        </>
        )
}

export default EventsPage