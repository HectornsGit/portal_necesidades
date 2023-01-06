const selectUserByEmailQuery = require("../../ddbb/queries/users/selectUserByEmailQuery");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { generateError } = require("../../helpers");

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    //Si falta algún campo lanzamos un error.
    if (!email || !password) {
      throw generateError("Faltan campos", 404);
    }

    //Obtenemos el usuario del body
    const user = await selectUserByEmailQuery(email);

    //Comprobamos contraseña
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      throw generateError("Contrasena incorrecta", 401);
    }

    // Objeto con los datos que queremos guardar en el token.
    const tokenInfo = {
      id: user.id,
    };

    //Creamos token
    const token = jwt.sign(tokenInfo, process.env.SECRET, {
      expiresIn: "30d",
    });
    res.send({
      status: "ok",
      data: { token },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = loginUser;
