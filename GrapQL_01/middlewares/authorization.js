const ensureAuth = (context) => {
  if (!context.user) {
    throw new Error("Authentication required");
  }
  return context.user.user;
};

const requireRole = (user, ...allowedRoles) => {
  if (!allowedRoles.includes(user.role)) {
    throw new Error("Access denied: Insufficient permissions");
  }
};

module.exports = { ensureAuth, requireRole };
