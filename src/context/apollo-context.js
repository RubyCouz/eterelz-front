import {
    ApolloClient,
    InMemoryCache
} from '@apollo/client'
import {HOST} from '../config'
export const graphqlConfig = new ApolloClient({
    uri: `${HOST}/api`,
    credentials: 'include',
    cache: new InMemoryCache(),
    fetchOptions: {
        mode: 'no-cors',
    },
})