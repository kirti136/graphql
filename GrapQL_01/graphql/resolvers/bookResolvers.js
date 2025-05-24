const { ensureAuth } = require("../../middlewares/authorization");
const Book = require("../../models/Book");

const bookResolvers = {
  Query: {
    getBooks: async () => await Book.find(),
    getBook: async (_, { id }) => await Book.findById(id),
  },

  Mutation: {
    createBook: async (_, { title, coverPage, year }, context) => {
      const user = ensureAuth(context);

      if (user.role !== "Author") {
        throw new Error("User not authorized to create books");
      }

      const newBook = new Book({
        title,
        author: user.id,
        coverPage,
        year,
      });

      return await newBook.save();
    },

    deleteBook: async (_, { id }, context) => {
      const user = ensureAuth(context);
      const book = await Book.findById(id);
      if (!book) {
        throw new Error("Book not found");
      }

      if (user.role === "Admin") {
        await Book.findByIdAndDelete(id);
        return "Book deleted by admin";
      }

      if (user.role === "Author" && book.author.toString() === user.id) {
        await Book.findByIdAndDelete(id);
        return "Book deleted by author";
      }

      throw new Error("Not authorized to delete this book");
    },
  },
};

module.exports = bookResolvers;
