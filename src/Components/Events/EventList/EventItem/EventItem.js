import React from 'react'
import './EventItem.css'

const eventItem = props => (
    <li
        key={props.eventId}
        className="events__list-item"
    >
        <div>
            <h2>{props.event_name}</h2>
            <h3>{new Date(props.event_date).toLocaleString()}</h3>
        </div>
        <div>
            {
                props.userId === props.creatorId ?
                    <p>Your the owner of the event</p> :
                    <button
                        className="btn"
                        onClick={props.onDetail.bind(this, props.eventId)}
                    >
                        View details
                    </button>
            }

        </div>
    </li>
)

export default eventItem