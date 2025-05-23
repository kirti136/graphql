const { gql } = require("apollo-server");
const { mergeTypeDefs } = require("@graphql-tools/merge");

const userTypeDefs = require("./typeDefs/userTypeDefs");
const bookTypeDefs = require("./typeDefs/bookTypeDefs");

const rootTypeDef = gql`
  type Query
  type Mutation
`;

module.exports = mergeTypeDefs([rootTypeDef, userTypeDefs, bookTypeDefs]);
