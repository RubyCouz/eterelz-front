import { 
    ApolloClient, 
    createHttpLink, 
    InMemoryCache
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
  

  const httpLink = createHttpLink({
    uri: 'http://localhost:8080/api',
  });

  const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = window.localStorage.getItem('token')
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      }
    }
  })


  export const graphqlConfig = new ApolloClient({
    link: authLink.concat(httpLink),
    //link: httpLink,
    cache: new InMemoryCache()
   /* headers: {
      authorization: localStorage.getItem('token'),
      'client-name': 'WidgetX Ecom [web]',
      'client-version': '1.0.0'
    }*/
  })