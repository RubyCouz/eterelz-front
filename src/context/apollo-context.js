import {
    ApolloClient,
    InMemoryCache
} from '@apollo/client'

export const graphqlConfig = new ApolloClient({
    // uri: '178.128.42.251/api',
    uri: 'https://api.rubycouz.xyz/api',
    credentials: 'include',
    cache: new InMemoryCache(),
})