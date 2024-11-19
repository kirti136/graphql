import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const client = new ApolloClient({
  link: new HttpLink({
    uri: "http://localhost:3030/graphql",
    // headers: {
    //   Authorization: `Bearer ${localStorage.getItem('token')}`, // Get the token from localStorage or state
    // },
    // credentials: "include", // This sends cookies with each request
  }),
  cache: new InMemoryCache(),
});

export default client;
