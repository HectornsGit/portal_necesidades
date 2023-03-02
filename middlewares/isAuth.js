const jwt = require("jsonwebtoken");

const { generateError } = require("../helpers");

const isAuth = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      //Si no hay cabecera de autentificación vamos al siguiente middleware.
      return next();
    }

    let tokenInfo;

    //Si la hay guardamos la información del usuario.
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
