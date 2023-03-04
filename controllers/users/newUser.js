require("dotenv").config();
const insertUserQuery = require("../../ddbb/queries/users/insertUserQuery");
const { saveAvatar, generateError, validateInput } = require("../../helpers");
const Joi = require("@hapi/joi");

//Función que registra a nuestros usuarios.
const newUser = async (req, res, next) => {
  try {
    //Extraemos del body la información necesaria para crear el usuario
    const { username, email, password, bio } = req.body;

    //Definimos los esquemas para verificar que se cumplan las especificaciones en cada campo.
    const emailSchema = Joi.string().email().max(100).required();
    const usernameSchema = Joi.string().min(3).max(30).required();
    const passwordSchema = Joi.string().min(6).max(100).required();

    //Comprobacion de cada esquema
    const emailValidation = emailSchema.validate(email);
    const usernameValidation = usernameSchema.validate(username);
    const passwordValidation = passwordSchema.validate(password);

    //Los agregamos a un arreglo para luego iterarlos.
    const validations = [
      emailValidation,
      usernameValidation,
      passwordValidation,
    ];

    //Si la verificacion de esquemas diera algun error lo generamos.
    for (let validation of validations) {
      if (validation.error) {
        throw generateError(validation.error.message);
      }
    }

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
