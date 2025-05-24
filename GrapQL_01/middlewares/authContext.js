const jwt = require("jsonwebtoken");

const getAuthContext = (req) => {
  const token = req.headers.authorization || "";
  if (token) {
    const decoded = jwt.verify(
      token.replace("Bearer ", ""),
      process.env.JWT_SECRET_KEY
    );
    return { user: decoded };
  }
  return {};
};

module.exports = getAuthContext;
