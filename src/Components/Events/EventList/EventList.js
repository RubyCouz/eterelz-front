import React from 'react'
import './EventList.css'
import EventItem from './EventItem/EventItem'
const eventList = props => {
    const events = props.events.map(event => {
        return (
            <EventItem
                key={event._id}
                eventId={event._id}
                event_date={event.event_date}
                event_name={event.event_name}
                userId={props.authUserId}
                creatorId={event.event_creator._id}
                onDetail={props.onViewDetail}
            />
        )
    })

    return (
        <ul className="events__list">
            {events}
        </ul>
    )
}

export default eventList