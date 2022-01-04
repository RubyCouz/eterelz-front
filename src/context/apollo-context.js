import {
    ApolloClient,
    InMemoryCache
} from '@apollo/client'

export const graphqlConfig = new ApolloClient({
    uri: 'https://rubycouz.cc/api',
    // uri: 'https://api.rubycouz.xyz/api',
    credentials: 'include',
    cache: new InMemoryCache(),
})