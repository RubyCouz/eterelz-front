import React, {Component} from 'react'
import AuthContext from '../context/auth-context'
import Spinner from '../Components/Spinner/Spinner'
import Modal from '../Components/Modal/Modal'
import BackDrop from '../Components/Backdrop/Backdrop'
import EventList from '../Components/Events/EventList/EventList'
import './Events.css'

class EventsPage extends Component {
    state = {
        creating: false,
        events: [],
        isLoading: false,
        selectedEvent: null
    }

    isActive = true

    static contextType = AuthContext

    constructor(props) {
        super(props)
        this.event_nameElRef = React.createRef()
        this.event_dateElRef = React.createRef()
        this.event_descElRef = React.createRef()
    }

    componentDidMount() {
        this.fetchEvents()
    }

    startCreateEventHandler = () => {
        this.setState({creating: true})
    }

    modalCancelHandler = () => {
        this.setState({
            creating: false,
            selectedEvent: null
        })
    }

    modalConfirmHandler = () => {
        console.log('check')
        this.setState({creating: false})
        const event_name = this.event_nameElRef.current.value
        const event_date = this.event_dateElRef.current.value
        const event_desc = this.event_descElRef.current.value

        if (event_name.trim().length === 0 ||
            event_date.trim().length === 0 ||
            event_desc.trim().length === 0) {
            return
        }
        const event = {event_desc, event_date, event_name}
        console.log(event)

        const requestBody = {
            query: `
                mutation CreateEvent($event_name: String!, $event_date: String!, $event_desc: String!) {
                    createEvent(eventInput: {
                    event_name: $event_name,
                    event_date: $event_date,
                    event_desc: $event_desc
                    })
                    {
                        _id
                        event_name
                        event_desc
                        event_date
                    }
                }
            `,
            variables: {
                event_name: event_name,
                event_desc: event_desc,
                event_date: event_date
            }
        }

        const token = this.context.token
console.log(token)
        fetch('http://localhost:8080/api', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'Application/json',
                'Authorization': 'Bearer ' + token
            }
        })
            .then(res => {
                if (res.status !== 200 && res.status !== 201) {
                    throw new Error('Failed')
                }
                return res.json()
            })
            .then(resData => {

                console.log(resData)
                // this.setState(prevState => {
                //     const updatedEvents = [...prevState.events]
                //     updatedEvents.push({
                //          _id: resData.data.createEvent._id,
                //         event_name: resData.createEvent.event_name,
                //         event_desc: resData.createEvent.event_desc,
                //         event_date: resData.createEvent.event_date,
                //         creator: {
                //             _id: this.context.userId
                //         }
                //     })
                //     return {events: updatedEvents}
                // })
            })
            .catch(err => {
                console.log(err)
            })
    }

    fetchEvents = () => {
        this.setState({isLoading: true})
        const requestBody = {
            query: `
                query {
                    events {
                        _id
                        event_name
                        event_desc
                        event_date
                        createdAt
                        event_creator {
                            _id
                            user_email
                        }
                    }
                }
            `
        }

        const token = this.context.token
        fetch('http://localhost:8080/api', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                if (res.status !== 200 && res.status !== 201) {
                    throw new Error('failed')
                }
                return res.json()
            })
            .then(resData => {
                const events = resData.data.events
                if (this.isActive) {
                    this.setState({events: events, isLoading: false})
                }
            })
            .catch(err => {
                console.log(err)
                if (this.isActive) {
                    this.setState({isLoading: false})
                }
            })
    }

    showDetailHandler = eventId => {
        this.setState(prevState => {
            const selectedEvent = prevState.events.find(e => e._id === eventId)
            return {selectedEvent: selectedEvent}
        })
    }

    componentWillUnmount() {
        this.isActive = false
    }

    render() {
        return (
            <React.Fragment>
                <h1>Liste des Events</h1>
                {(this.state.creating || this.state.selectedEvent) && <BackDrop/>}
                {this.state.creating &&
                <Modal
                    title="Création d'un event"
                    canCancel
                    canConfirm
                    onCancel={this.modalCancelHandler}
                    onConfirm={this.modalConfirmHandler}
                    confirmText="Confirm"
                >
                    <form action="">
                        <div className="form_control">
                            <label htmlFor="event_name">Nom de l'event</label>
                            <input type="text" id="event_name" ref={this.event_nameElRef}/>
                        </div>
                        <div className="form_control">
                            <label htmlFor="event_desc">Description</label>
                            <textarea name="event_desc" id="event_desc" cols="10" rows="4" ref={this.event_descElRef}/>
                        </div>
                        <div className="form_control">
                            <label htmlFor="event_date">Date et Heure</label>
                            <input type="datetime-local" id="event_date" ref={this.event_dateElRef}/>
                        </div>
                    </form>
                </Modal>}
                {this.state.selectedEvent && (
                    <Modal
                        title={this.state.selectedEvent.event_name}
                        canCancel
                        canConfirm
                        onCancel={this.modalCancelHandler}
                        onConfirm={this.modalCancelHandler}
                    >
                        <h2>{this.state.selectedEvent.event_name}</h2>
                        <h3>{new Date(this.state.selectedEvent.event_date).toLocaleDateString()}</h3>
                        <p>{this.state.selectedEvent.event_desc}</p>
                    </Modal>
                )}
                {this.context.token && (
                    <div className="events-control">
                        <p>Créez Votre Event !!!</p>
                        <button className="btn" onClick={this.startCreateEventHandler}>Création d'event</button>
                    </div>
                )}
                <section>
                    {this.state.isLoading ?
                        <Spinner/> :
                        <EventList
                            events={this.state.events}
                            authUserId={this.context.userId}
                            onViewDetail={this.showDetailHandler}
                        />
                    }

                </section>
            </React.Fragment>
        )
    }
}

export default EventsPage