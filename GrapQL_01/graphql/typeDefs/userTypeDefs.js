const { gql } = require("apollo-server");

const userTypeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    role: String!
    age: Int!
  }

  type AuthPayload {
    token: String
    user: User
  }

  extend type Query {
    getUsers: [User]
    getUser(id: ID!): User
  }

  extend type Mutation {
    createUser(
      name: String!
      email: String!
      password: String!
      role: String
      age: Int!
    ): User
    login(email: String!, password: String!): AuthPayload
    deleteUser(id: ID!): String
  }
`;

module.exports = userTypeDefs;
