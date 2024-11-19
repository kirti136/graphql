const authTypeDefs = `#graphql
  type AuthPayload {
    message: String
    user: User
  }

  type Mutation {
  login(email: String!, password: String!): AuthPayload
  logout: AuthPayload
}
`;

module.exports = authTypeDefs;
