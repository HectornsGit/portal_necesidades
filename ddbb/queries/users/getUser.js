const selectUserByIdQuery = require("../../bbdd/queries/users/selectUserIdQuery");

const { generateError } = require("../../helpers");

const getUser = async (req, res, next) => {
  try {
    const { idUser } = req.params;

    //Seleccionamos el user por su id.
    const user = await selectUserByIdQuery(idUser);

    /* if (!user.active) {
      throw generateError("Usuario no encontrado", 404); */

    //Creamos el objeto de userInfo con sus propiedades.
    const userInfo = {
      username: user.username,
      avatar: user.avatar,
      registration_date: user.registration_date,
    };

    if (Number(idUser) === req.user.id) {
      userInfo.email = user.email;
    }

    //Devolvemos la info del usuario.
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
