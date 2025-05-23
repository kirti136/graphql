const User = require("../../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userResolvers = {
  Query: {
    getUsers: async (_, __, { user }) => {
      if (user && user.role === "Admin") return await User.find();
      throw new Error("Not authorized to view all users");
    },
    getUser: async (_, { id }, { user }) => {
      if (user && (user.role === "Admin" || user.role === "Author"))
        return await User.findById(id);
      throw new Error("Not authorized to view user");
    },
  },

  Mutation: {
    createUser: async (_, { name, email, password, role = "Reader", age }) => {
      try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          throw new Error("User already exists with this email.");
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create and save the new user
        const newUser = new User({
          name,
          email,
          password: hashedPassword,
          role,
          age,
        });

        return await newUser.save();
      } catch (error) {
        throw new Error(`Failed to create user: ${error.message}`);
      }
    },
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user || !(await bcrypt.compare(password, user.password)))
        throw new Error("Invalid credentials");

      const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: "1h",
        }
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

module.exports = userResolvers;
