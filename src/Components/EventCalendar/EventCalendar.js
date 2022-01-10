import React, {useEffect, useState} from 'react'
import {Calendar, dateFnsLocalizer} from 'react-big-calendar'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import {HOMEEVENT} from '../../Queries/EventQueries'
import {useQuery} from '@apollo/client'
import './EventCalendar.css'

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

const initEvents = (data) => {
    let allEvents = []
    data.events.map((event, key) => {
        const eventDate = {
            title: event.event_name,
            allDay: event.event_allDay,
            start: new Date(event.event_start),
            end: new Date(event.event_end)
        }
        allEvents.push(eventDate)
        return allEvents
    })
    return allEvents
}

export default function EventCalendar() {
    const [events, setEvents] = useState([])
    const {data} = useQuery(HOMEEVENT)
    useEffect(() => {
        if(data !== undefined) {
            const init = initEvents(data)
            setEvents(init)
        }
    },
        [data])
    return (
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                popup={true}
                showMultiDayTimes={true}
                className="eventCalendar"
            />
    )
}