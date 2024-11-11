const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const resolvers = {
  Query: {
    getUsers: async (_, __, { user }) => {
      if (user && user.role === "Admin") {
        return await User.find();
      }
      throw new Error("Not authorized to view all users");
    },

    getUser: async (_, { id }, { user }) => {
      if (user && (user.role === "Admin" || user.role === "Author")) {
        return await User.findById(id);
      }
      throw new Error("Not authorized to view user");
    },
  },

  Mutation: {
    createUser: async (_, { name, email, password, role = "Reader", age }) => {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({
        name,
        email,
        password: hashedPassword,
        role,
        age,
      });
      return await user.save();
    },

    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error("Invalid credentials");
      }
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        throw new Error("Invalid credentials");
      }
      const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "1h" }
      );
      return { token, user };
    },

    deleteUser: async (_, { id }, { user }) => {
      if (user && user.role === "Admin") {
        await User.findByIdAndDelete(id);
        return "User deleted";
      }
      throw new Error("Not authorized to delete user");
    },
  },
};

module.exports = resolvers;