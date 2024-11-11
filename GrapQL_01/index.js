require("dotenv").config();
const { ApolloServer } = require("@apollo/server");
const express = require("express");
const { expressMiddleware } = require("@apollo/server/express4");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");
const authenticate = require("./middlewares/authentication");
const { connectDB } = require("./config/db");

const startServer = async () => {
  // Connect to MongoDB
  connectDB();

  // Initialize Express app
  const app = express();

  // Create an Apollo Server instance
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  // Start Apollo Server
  await server.start();

  // Use JSON parsing middleware
  app.use(express.json());

  // Use cookie-parser middleware
  app.use(cookieParser());

  // Set up CORS and Express middleware
  app.use(
    cors({
      origin: "*",
      credentials: true,
    })
  );

  app.use(
    "/graphql",
    expressMiddleware(server, {
      context: async ({ req }) => {
        const user = await authenticate(req);
        return { user };
      },
    })
  );

  // Listen on the specified port
  app.listen(process.env.PORT || 4000, () => {
    console.log(`Server running at http://localhost:${process.env.PORT || 4000}/graphql`);
  });
};

startServer();
