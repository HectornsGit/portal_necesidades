const jwt = require("jsonwebtoken");

const { generateError } = require("../helpers");

const isAuth = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      throw generateError("Falta la cabecera de autentificación", 400);
    }

    let tokenInfo;

    try {
      tokenInfo = jwt.verify(authorization, process.env.SECRET);
    } catch {
      throw generateError("Token incorrecto", 401);
    }

    req.user = tokenInfo;
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = isAuth;
