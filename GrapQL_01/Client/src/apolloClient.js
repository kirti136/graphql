import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'http://localhost:3000/graphql',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`, // Get the token from localStorage or state
    },
  
  }),
  cache: new InMemoryCache(),
});

export default client;
