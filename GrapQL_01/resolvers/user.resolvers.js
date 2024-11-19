const bcrypt = require("bcrypt");
const User = require("../models/User");

const userResolvers = {
  Query: {
    getUsers: async (_, __, { user }) => {
      console.log("USER USER USER", user);
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
      try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
          name,
          email,
          password: hashedPassword,
          role,
          age,
        });
        return await user.save();
      } catch (error) {
        console.error(error);
      }
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
