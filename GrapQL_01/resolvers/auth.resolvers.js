const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authResolvers = {
  Mutation: {
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

      // Update the user's token field in the database
      user.token = token;
      await user.save();

      return { token, user };
    },
  },
};

module.exports = authResolvers;
