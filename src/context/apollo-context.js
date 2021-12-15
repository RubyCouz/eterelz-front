import { 
    ApolloClient, 
    InMemoryCache
} from '@apollo/client'
import { onError } from '@apollo/client/link/error'



export const graphqlConfig = new ApolloClient({
  uri: 'http://localhost:8080/api',
  credentials: 'include',
  cache: new InMemoryCache(),
})


onError(({ graphQLErrors, networkError, operation, forward }) => {
  if (graphQLErrors) {
    console.log("Florian")
    for (let err of graphQLErrors) {
      switch (err.extensions.code) {
        // Apollo Server sets code to UNAUTHENTICATED
        // when an AuthenticationError is thrown in a resolver
        case 'UNAUTHENTICATED':

          // Modify the operation context with a new token
          //const oldHeaders = operation.getContext().headers;
          console.log("pas co")
          // Retry the request, returning the new observable
          //return forward(operation)      
        }
    }
  }

  // To retry on network errors, we recommend the RetryLink
  // instead of the onError link. This just logs the error.
  if (networkError) {
    console.log(`[Network error]: ${networkError}`)
  }
})