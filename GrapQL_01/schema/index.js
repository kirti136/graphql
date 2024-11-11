const { mergeTypeDefs } = require("@graphql-tools/merge");
const userTypeDefs = require("./user.typeDefs.js");
const authTypeDefs = require("./auth.typeDefs.js");

const typeDefs = mergeTypeDefs([userTypeDefs, authTypeDefs]);

module.exports = typeDefs;
