import {
    ApolloClient,
    InMemoryCache
} from '@apollo/client'



export const graphqlConfig = new ApolloClient({
    // uri: 'https://rubycouz.cc/api',
    uri: 'http://localhost:5000/api',
    credentials: 'include',
    cache: new InMemoryCache(),
    headers: {
        'Access-Control-Allow-Origin': '*'
    }
})