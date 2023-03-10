const selectUserByIdQuery = require("../../ddbb/queries/users/selectUserByIdQuery");
const updateUserQuery = require("../../ddbb/queries/users/updateUserQuery");
const Joi = require("@hapi/joi");
const { generateError, saveAvatar, deleteFile } = require("../../helpers");

const editUser = async (req, res, next) => {
  try {
    //Guardamos cada campo en una variable
    let { email, avatar, bio, username } = req.body;

    //Obtenemos la información del usuario.
    const user = await selectUserByIdQuery(req.user.id);

    //Si en la request no tenemos un campo lo rellenamos con los datos de la base de datos.
    email = email || user.email;
    avatar = avatar || user.avatar;
    bio = bio || user.bio;
    username = username || user.username;
    const registration_date = user.registration_date;

    //Definimos los esquemas para verificar que se cumplan las especificaciones en cada campo.
    const emailSchema = Joi.string().email().max(100).required();
    const usernameSchema = Joi.string().min(3).max(30).required();
    const bioSchema = Joi.string().max(200).required();

    //Comprobacion de cada esquema
    const emailValidation = emailSchema.validate(email);
    const usernameValidation = usernameSchema.validate(username);
    const bioValidation = bioSchema.validate(bio);

    //Los agregamos a un arreglo para luego iterarlos.
    const validations = [emailValidation, usernameValidation, bioValidation];

    //Si la verificacion de esquemas diera algun error lo generamos.
    for (let validation of validations) {
      if (validation.error) {
        throw generateError(validation.error.message);
      }
    }

    //Si hay una foto la guardamos.
    if (req.files?.avatar) {
      //Si existe una foto ya establecida que no sea la por defecto la borramos.
      if (user.avatar != "default_avatar.png") {
        await deleteFile(user.avatar);
      }
      avatar = await saveAvatar(req.files.avatar);
    }

    //Actualizamos en la base de datos.
    await updateUserQuery(email, username, bio, avatar, req.user.id);

    res.send({
      status: "ok",
      message: `Usuario ${req.user.id} actualizado`,
      data: { email, username, bio, avatar, registration_date },
    });
  } catch (err) {
    next(err);
  }
};
module.exports = editUser;
