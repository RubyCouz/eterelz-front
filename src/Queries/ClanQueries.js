import {gql} from '@apollo/client'

/**
 * création d'un clan
 */
export const CREATECLAN = gql`
mutation CREATECLAN($createClan: ClanInput) {
    createClan(clanInput: $createClan) {
        _id
        clan_banner
    }
}`
/**
 * données d'un clan
 */
export const CLANQUERY = gql`
fragment ClanQuery on Clan {
    _id
    clan_name,
    clan_desc, 
    clan_banner,
    clan_discord,
    clan_population,
    clan_recrut,
    clan_activity,
    clan_creator {
        user_login
    },
    createdAt, 
    updatedAt
}`
/**
 * liste des clans
 */
export const LISTCLANS = gql`
${CLANQUERY}
query {
    clans {
        ...ClanQuery
    }
}`
/**
 * Modif clan
 */
export const UPDATECLAN = gql`
mutation UpdateClan($id: ID!, $update: UpdateClanInput) {
    updateClan(id: $id, updateClanInput: $update) {
        _id
    }
}`
/**
 * suppression d'un clan
 * @type {DocumentNode}
 */
export const DELETECLAN = gql`
mutation deleteClan($id: ID!) {
    deleteClan(id: $id) {
        _id
    }
}
`