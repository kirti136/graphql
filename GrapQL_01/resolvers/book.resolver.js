const { Query, Mutation } = require(".");
const Book = require("../models/Book");

const bookResolvers = {
  Query: {
    getBooks: async () => {},
    getBook: async () => {},
  },
  Mutation: {
    createBook: async (_, { title, author, coverPage, year }) => {
      try {
        const book = await Book.create({
          title,
          author,
          coverPage,
          year,
        });
      } catch (error) {
        console.error(error);
      }
    },
    deleteBook: async () => {},
  },
};

module.exports = bookResolvers;
