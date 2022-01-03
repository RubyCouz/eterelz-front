import {
    ApolloClient,
    InMemoryCache
} from '@apollo/client'

export const graphqlConfig = new ApolloClient({
    uri: '/api',
    // uri: 'https://api.rubycouz.xyz/api',
    credentials: 'include',
    cache: new InMemoryCache(),
})