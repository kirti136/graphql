// src/middlewares/authentication.js
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authenticate = async (req) => {
  const authHeader = req.headers.authorization || "";

  if (!authHeader) {
    return null; // Return null if there's no token; allow unauthenticated requests.
  }

  const token = authHeader.split(" ")[1]; // Expecting "Bearer <token>"
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await User.findById(decoded.id);
    return user; // Attach user to context if token is valid
  } catch (err) {
    console.error(err);
    throw new Error("Invalid or expired token");
  }
};

module.exports = authenticate;
