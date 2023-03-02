const { generateError } = require("../helpers");

//Con este middleware comprueba si este usuario está autorizado y genera un error si no lo está.
const isUser = (req, res, next) => {
  if (req.user) return next();

  generateError("No puedes acceder", 401);
};

module.exports = isUser;
