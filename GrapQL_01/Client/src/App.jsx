// src/App.js
import React from 'react';
import { useQuery, gql } from '@apollo/client';

// Define the GraphQL query
const GET_USERS = gql`
  query GetUsers {
    getUsers {
      id
      name
      email
    }
  }
`;

function App() {
  // Use Apollo's useQuery hook to fetch data
  const { loading, error, data } = useQuery(GET_USERS);

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Error: {error.message}</h1>;

  return (
    <div>
      <h1>Users List</h1>
      <ul>
        {data.getUsers.map(user => (
          <li key={user.id}>
            {user.name} ({user.email})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;