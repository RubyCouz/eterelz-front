import {gql} from '@apollo/client'

/**
 * création d'un event
 */
export const CREATEEVENT = gql`
    mutation CREATEEVENT($createEvent: EventInput!) {
        createEvent(eventInput: $createEvent) {
            _id
        }
    }
`
/**
 * données d'un event
 */
export const EVENTQUERY = gql`
    fragment EventQuery on Event {
        _id
        event_name,
        event_desc,
        event_date,
        event_creator {
            user_login
        },
        createdAt,
        updatedAt,
        event_score,
        event_winner
    }`

/**
 * Liste des events
 */
export const LISTEVENT = gql`
    ${EVENTQUERY}
    query {
        events {
            ...EventQuery
        }
    }`

/**
 * modification event
 * @type {DocumentNode}
 */
export const UPDATEEVENT = gql`
    mutation UpdateEvent($id: ID!, $update: UpdateEventInput) {
        updateEvent(id: $id, updateEventInput: $update) {
            _id
        }
    }`
/**
 * suppression d'un event
 * @type {DocumentNode}
 */
export const DELETEEVENT = gql`
    mutation deleteEvent($id: ID!) {
        deleteEvent(id: $id) {
            _id
        }
    }`