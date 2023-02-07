require("dotenv").config();
const insertUserQuery = require("../../ddbb/queries/users/insertUserQuery");
const { saveAvatar, generateError } = require("../../helpers");

//Función que registra a nuestros usuarios.
const newUser = async (req, res, next) => {
  try {
    //Extraemos del body la información necesaria para crear el usuario
    const { username, email, password, bio } = req.body;

    //Si hay archivos, guardamos el avatar y lo redimensionamos.
    let avatar;
    if (req.files) {
      avatar = await saveAvatar(req.files.avatar);
    }

    //Comprobamos que estén todos los campos obligatorios.
    if (!username || !email || !password) {
      throw generateError("Faltan campos", 400);
    }

    //Insertamos el usuario.

    await insertUserQuery(username, email, password, bio, avatar);
    res.send({
      status: "ok",
      message: "Usuario creado.",
    });

    //---------------------------------------------------------//
  } catch (err) {
    next(err);
  }
};

module.exports = newUser;
