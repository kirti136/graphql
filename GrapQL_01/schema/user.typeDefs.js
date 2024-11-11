const userTypeDefs = `#graphql
  type User {
    id: ID!
    name: String!
    email: String!
    role: String!
    age: Int!
    token: String
  }

  type Query {
    getUsers: [User]
    getUser(id: ID!): User
  }

  type Mutation {
    createUser(name: String!, email: String!, password: String!, role: String, age: Int!): User
    deleteUser(id: ID!): String
  }
`;

module.exports = userTypeDefs;
