/**
 * Création d'un "context"
 * récupération de données d'un composant et les rendre accessible
 */
import React from 'react'
/**
 * création du context
 * export => peut être importer ailleurs
 * accessible dans les composants enfants mais pas dans les composants
 * parents
 */
export default React.createContext({
    token: null,
    playload: null,
    login: (token) => {
    },
    logout: () => {
    }
})