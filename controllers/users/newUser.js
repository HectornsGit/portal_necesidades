require("dotenv").config();
const insertUserQuery = require("../../ddbb/queries/users/insertUserQuery");

const newUser = async (req, res, next) => {
  try {
    //Extraemos del body la información necesaria para crear el usuario
    const { username, email, password } = req.body;

    //Comprobamos que estén todos los campos necesarios
    if (!username || !email || !password) {
      throw generateError("Faltan campos", 400);
    }
    //LLamamos a la función que inserta el nuevo usuario.
    await insertUserQuery(username, email, password);

    //Enviamos la respuesta l
    res.send({
      status: "ok",
      message: "Usuario creado.",
    });
  } catch (err) {
    next(err);
  }
};
module.exports = newUser;
