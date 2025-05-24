const { gql } = require("apollo-server");

const bookTypeDefs = gql`
  type Book {
    id: ID!
    title: String!
    author: String!
    coverPage: String!
    year: Int!
  }

  extend type Query {
    getBooks: [Book]
    getBook(id: ID!): Book
  }

  extend type Mutation {
    createBook(
      title: String!
      author: String
      coverPage: String!
      year: Int!
    ): Book
    deleteBook(id: ID!): String
  }
`;

module.exports = bookTypeDefs;
