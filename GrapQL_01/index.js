require("dotenv").config();
const { ApolloServer } = require("apollo-server");
const typeDefs = require("./schema/typeDefs");
const resolvers = require("./resolvers/resolvers");
const authenticate = require("./middlewares/authentication");
const { connectDB } = require("./config/db");

const startServer = async () => {
  // Connect to MongoDB
  connectDB();

  // Create an Apollo Server instance
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    cors: {
      origin: "*",
      credentials: true,
    },
    context: async ({ req }) => {
      const user = await authenticate(req); // Allow for unauthenticated requests
      return { user }; // Add user to context if authenticated, otherwise null
    },
  });

  // Start the server
  server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
    console.log(`Server running at ${url}`);
  });
};

startServer();
