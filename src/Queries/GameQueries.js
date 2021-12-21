import {gql} from '@apollo/client'

/**
 * Création d'un jeu
 * @type {DocumentNode}
 */
export const CREATEGAME = gql`
    mutation CREATEGAME($createGame: GameInput!) {
        createGame(gameInput:$createGame) {
            _id
        }
    }
`
/**
 * données d'un jeu
 */
export const GAMEQUERY = gql`
    fragment GameQuery on Game {
        _id
        game_name
        game_desc
        game_pic
        game_creator {
            user_login
        }
        createdAt
    }`

/**
 * Liste des jeux
 * @type {DocumentNode}
 */
export const LISTGAMES = gql`
    ${GAMEQUERY}
    query {
        games {
            ...GameQuery
        }
    }`

export const UPDATEGAME = gql`
mutation UpdateGame($id: ID!, $update: GameUpdateInput!) {
    updateGame(_id: $id, GameInput: $update) {
        _id
    }
}`