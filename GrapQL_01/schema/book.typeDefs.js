const bookTypeDefs = `#graphql
  type Book {
    id: ID!
    title: String!
    author: String!
    coverPage: String!
    year: Int!
  }

  type Query {
    getBooks: [Book]
    getBook(id: ID!): Book
  }

  type Mutation {
    createBook(title: String!, author: String!, coverPage: String!, year: String): Book
    deleteBook(id: ID!): String
  }
`;

module.exports = bookTypeDefs;
