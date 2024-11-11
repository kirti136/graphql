const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["Admin", "Author", "Reader"],
    default: "Reader",
  },
  age: { type: Number, required: true },
  token: { type: String }
});

module.exports = mongoose.model("User", userSchema);
