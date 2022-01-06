import {
    ApolloClient,
    InMemoryCache
} from '@apollo/client'

export const graphqlConfig = new ApolloClient({
    uri: 'https://rubycouz.cc/api',
    // uri: 'https://localhost:5000/api',
    credentials: 'include',
    cache: new InMemoryCache(),
    fetchOptions: {
        mode: 'no-cors',
    },
})