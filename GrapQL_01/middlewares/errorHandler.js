module.exports = (error) => {
  return {
    message: error.message,
    code: error.extensions?.code || "INTERNAL_SERVER_ERROR",
  };
};
