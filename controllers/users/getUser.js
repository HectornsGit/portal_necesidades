const selectUserByIdQuery = require("../../ddbb/queries/users/selectUserByIdQuery");

const { generateError } = require("../../helpers");

const getUser = async (req, res, next) => {
  try {
    //Obtenemos el id del user de los path params.
    const { idUser } = req.params;

    //Llamamos a la función que selecciona al user y lo guardamos en una variable.
    const user = await selectUserByIdQuery(idUser);

    /* if (!user.active) {
      throw generateError("Usuario no encontrado", 404); */

    //Guardamos en un objeto la información que queremos mostrar.
    const userInfo = {
      username: user.username,
      avatar: user.avatar,
      bio: user.bio,
      registration_date: user.registration_date,
      email: user.email,
    };

    res.send({
      status: "ok",
      data: {
        user: userInfo,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = getUser;
