// src/graphql/mutations.js
import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation CreateUser(
    $name: String!
    $email: String!
    $password: String!
    $age: Int!
  ) {
    createUser(name: $name, email: $email, password: $password, age: $age) {
      id
      name
      email
    }
  }
`;

export const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      message
      user {
        id
        name
        email
      }
    }
  }
`;

export const DELETE_USER = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id)
  }
`;
