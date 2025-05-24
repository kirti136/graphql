const User = require("../../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { ensureAuth, requireRole } = require("../../middlewares/authorization");

const userResolvers = {
  Query: {
    getUsers: async (_, __, context) => {
      const user = ensureAuth(context);
      requireRole(user, "Admin");
      return await User.find();
    },

    getUser: async (_, { id }, context) => {
      const user = ensureAuth(context);

      if (user.role === "Admin") {
        return await User.findById(id);
      }

      if (user.role === "Author") {
        if (user.id !== id) {
          throw new Error("Not authorized to access this user's data");
        }
        return await User.findById(id);
      }

      throw new Error("Not authorized");
    },
  },

  Mutation: {
    createUser: async (_, { name, email, password, role = "Reader", age }) => {
      const existingUser = await User.findOne({ email });
      if (existingUser) throw new Error("User already exists with this email.");

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
        name,
        email,
        password: hashedPassword,
        role,
        age,
      });

      return await newUser.save();
    },

    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new Error("Invalid credentials");
      }

      const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: "1d",
        }
      );

      return { token, user };
    },

    deleteUser: async (_, { id }, context) => {
      const existingUser = await User.findById(id);
      if (!existingUser) throw new Error("User do not exists.");

      const user = ensureAuth(context);
      requireRole(user, "Admin");
      await User.findByIdAndDelete(id);
      return "User deleted";
    },
  },
};

module.exports = userResolvers;
