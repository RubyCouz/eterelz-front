// import React from 'react'
import {gql} from '@apollo/client'

/**
 * création d'un utilisateur
 * @type {DocumentNode}
 */
export const CREATEUSER = gql`
    mutation CREATEUSER($user_login: String!, $email: String!, $password: String!) {
        createUser(
            userInput: {
                user_login: $user_login, user_email: $email, user_password: $password
            }) {
            _id
            user_email
        }
    }
`
/**
 * connexion
 * @type {DocumentNode}
 */
export const LOGIN = gql`
    query LOGIN($email: String!, $password: String!) {
        login(user_email: $email, user_password: $password) {
            token
        }
    }
`
/**
 * données dd'un utilisateur
 * @type {DocumentNode}
 */
export const USER_QUERY = gql`
    fragment UserQuery on User {
        _id
        user_login
        user_email
        user_role
        user_avatar
        createdAt
        user_isActive
        user_discord
        user_address
        user_zip
        user_city
        user_state
    }
`;
/**
 * liste des utilisateurs
 * @type {DocumentNode}
 */
export const LIST_USERS = gql`
    ${USER_QUERY}
    query {
        users {
            ...UserQuery
        }
    }
`;
/**
 * mise à jour d'un utilisateur
 * @type {DocumentNode}
 */
export const UPDATE_USER = gql`
    mutation UpdateUser($id: ID!, $update: UserUpdateInput!) {
        updateUser(_id: $id, updateUserInput: $update) {
            _id
        }
    }
`;
/**
 * ajout d'utilisateur par admin
 * @type {DocumentNode}
 */
export const CREATEDBYADMIN = gql`
    mutation createdByAdmin($user_email: String!) {
        createdByAdmin(user_email: $user_email) {
            _id
            user_login
            user_email
        }
    }
`
/**
 * suppression d'un utilisateur
 * @type {DocumentNode}
 */
export const DELETEUSER = gql`
mutation deleteUser($id: ID!) {
    deleteUser(id: $id) {
        _id
    }
}`
/**
 * confirmation utilisateur
 * @type {DocumentNode}
 */
export const CONFIRMUSER = gql`
    mutation CONFIRMUSER($token: String!, $pass: String!) {
        confirmUser(token: $token, pass: $pass) {
            token
        }
    }
`

export const USERBYID = gql`
query USER( $id: ID!){
    user(_id: $id ){
      _id
      user_avatar
      user_login
    }
  }
`
