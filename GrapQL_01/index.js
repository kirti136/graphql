require("dotenv").config();
const { ApolloServer } = require("apollo-server");
const { connectDB } = require("./config/db");
const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");
const authenticate = require("./middlewares/authentication");
const formatError = require("./middlewares/errorHandler");

const startServer = async () => {
  connectDB();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
      const user = await authenticate(req);
      return { user };
    },
    formatError,
  });

  const PORT = process.env.PORT || 4000;
  server.listen({ port: PORT }).then(({ url }) => {
    console.log(`Server running at ${url}`);
  });
};

startServer();
