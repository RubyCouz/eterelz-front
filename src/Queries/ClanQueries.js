import {gql} from '@apollo/client'

/**
 * création d'un clan
 */
export const CREATECLAN = gql`
mutation CREATECLAN($createClan: ClanInput) {
    createClan(clanInput: $createClan) {
        _id
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
export const LISTCLAN = gql`
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
    updateClan(_id: $id, UpdateClanInput: $update) {
        _id
    }
}`