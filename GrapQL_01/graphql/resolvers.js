const { mergeResolvers } = require("@graphql-tools/merge");

const userResolvers = require("./resolvers/userResolvers");
const bookResolvers = require("./resolvers/bookResolvers");

module.exports = mergeResolvers([userResolvers, bookResolvers]);
