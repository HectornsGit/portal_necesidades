const selectUserByIdQuery = require("../../ddbb/queries/users/selectUserByIdQuery");

const { generateError } = require("../../helpers");

const getUser = async (req, res, next) => {
  try {
    const { idUser } = req.params;

    const user = await selectUserByIdQuery(idUser);

    /* if (!user.active) {
      throw generateError("Usuario no encontrado", 404); */

    const userInfo = {
      username: user.username,
      avatar: user.avatar,
      registration_date: user.registration_date,
    };

    if (Number(idUser) === idUser) {
      userInfo.email = user.email;
    }

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
