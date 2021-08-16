import React from 'react'
import './EventList.css'
import EventItem from './EventItem/EventItem'

export default function EventList(props) {
    return (
        <ul
            className = "events__list"
        >
           {
                props.events.map(event => 
                    <EventItem
                        key = {event._id}
                        eventId = {event._id}
                        event_date = {event.event_date}
                        event_name = {event.event_name}
                        userId = {props.authUserId}
                        creatorId = {event.event_creator._id}
                        onDetail = {props.onViewDetail}
                        deleteEvent={props.deleteEvent}
                    />
                )
           }
        </ul>
    )
}
