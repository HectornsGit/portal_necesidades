const { generateError } = require("../helpers");

const isUser = (req, res, next) => {
  if (req.user) return next();

  generateError("No puedes acceder", 401);
};

module.exports = isUser;
