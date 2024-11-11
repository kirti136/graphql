const userResolvers = require("./user.resolvers");
const authResolvers = require("./auth.resolvers");

const resolvers = {
  Query: {
    ...userResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...authResolvers.Mutation,
  },
};

module.exports = resolvers;
