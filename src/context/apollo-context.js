import { 
    ApolloClient, 
    InMemoryCache
} from '@apollo/client'

  export const graphqlConfig = new ApolloClient({
    uri: 'http://localhost:8080/api',
    credentials: 'include',
    cache: new InMemoryCache(),
  })