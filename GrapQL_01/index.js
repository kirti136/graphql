require("dotenv").config();
const { ApolloServer } = require("apollo-server");
const { connectDB } = require("./config/db");
const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");
const formatError = require("./middlewares/errorHandler");
const getAuthContext = require("./middlewares/authContext");

connectDB();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const user = getAuthContext(req);
    return { user };
  },
  formatError,
});

const PORT = process.env.PORT || 4000;
server.listen({ port: PORT }).then(({ url }) => {
  console.log(`Server running at ${url}`);
});
