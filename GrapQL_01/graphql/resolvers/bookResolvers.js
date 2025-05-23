const Book = require("../../models/Book");

const bookResolvers = {
  Query: {
    getBooks: async () => await Book.find(),
    getBook: async (_, { id }) => await Book.findById(id),
  },

  Mutation: {
    createBook: async (_, { title, author, coverPage, year }) => {
      return await new Book({ title, author, coverPage, year }).save();
    },
    deleteBook: async (_, { id }, { user }) => {
      if (user && user.role === "Admin") {
        await Book.findByIdAndDelete(id);
        return "Book deleted";
      }
      throw new Error("Not authorized to delete book");
    },
  },
};

module.exports = bookResolvers;
