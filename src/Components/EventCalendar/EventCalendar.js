import React from 'react'
import {Calendar, dateFnsLocalizer} from 'react-big-calendar'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import {LISTEVENT} from '../../Queries/EventQueries'
import {useQuery} from '@apollo/client'

const locales = {
    'fr-FR': require('date-fns/locale/fr')
}
const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales
})

// const events = (data) => {
//     let allEvents = []
//     data.events.map((event, key) => {
//         const eventDate = {
//             title: event.event_name,
//             allDay: event.event_allDay,
//             start: event.event_start,
//             end: event.event_end
//         }
//     })
// }

export default function EventCalendar() {
    const {data} = useQuery(LISTEVENT)
    console.log(data)
    return (
        <div>
            <Calendar
                localizer={localizer}
                // events={events}
                startAccessor="start"
                enAccessor="end"
                style={{height: 500, margin: "50px"}}
            />
        </div>
    )
}