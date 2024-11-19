const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { GraphQLError } = require("graphql");

const authenticate = async (req, res) => {
  const authHeader = req.headers.authorization || "";

  if (!authHeader) {
    return null; // Return null if there's no token; allow unauthenticated requests.
  }

  const token = authHeader.split(" ")[1]; // Expecting "Bearer <token>"

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await User.findById(decoded.id);
    return user;
  } catch (err) {
    if (err.name === "TokenExpiredError")
      throw new GraphQLError("Token has been expired", {
        extensions: {
          errorCode: 401,
          code: "TOKEN_EXPIRED",
          http: {
            status: errorStatus,
          },
        },
      });

    if (err.name === "JsonWebTokenError")
      throw new GraphQLError("Invalid token", {
        extensions: {
          errorCode: 401,
          code: "INVALID_TOKEN",
          http: {
            status: errorStatus,
          },
        },
      });

    if (err.message === "Provide authorization headers")
      throw new GraphQLError("Provide authorization headers", {
        extensions: {
          errorCode: 400,
          code: "BAD_REQUEST",
          http: {
            status: errorStatus,
          },
        },
      });

    if (err.message === "Authorization headers must begin with 'Bearer' Keyword")
      throw new GraphQLError("Authorization headers must begin with 'Bearer' Keyword",
        {
          extensions: {
            errorCode: 400,
            code: "BAD_REQUEST",
            http: {
              status: errorStatus,
            },
          },
        }
      );

    if (err.message === "Provide authorization token")
      throw new GraphQLError("Provide authorization token", {
        extensions: {
          errorCode: 400,
          code: "BAD_REQUEST",
          http: {
            status: errorStatus,
          },
        },
      });

    if (err.message === "Invalid user")
      throw new GraphQLError("Invalid user", {
        extensions: {
          errorCode: 403,
          code: "FORBIDDEN",
          http: {
            status: errorStatus,
          },
        },
      });

    return null;
  }
};

module.exports = authenticate;
