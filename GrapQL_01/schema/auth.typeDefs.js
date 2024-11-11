const authTypeDefs = `#graphql
  type AuthPayload {
    token: String
    user: User
  }

  type Mutation {
    login(email: String!, password: String!): AuthPayload
  }
`;

module.exports = authTypeDefs;
