import {
    ApolloClient,
    InMemoryCache
} from '@apollo/client'

export const graphqlConfig = new ApolloClient({
    uri: 'http://localhost:5000/api',
    // uri: 'https://api.rubycouz.xyz/api',
    credentials: 'include',
    cache: new InMemoryCache(),
})