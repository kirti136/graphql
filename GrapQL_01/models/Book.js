const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    coverPage: { type: String, required: true },
    year: { type: Number, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Book = mongoose.model("Book", BookSchema);

module.exports = Book;
