const selectUserByIdQuery = require("../../ddbb/queries/users/selectUserByIdQuery");
const updateUserAvatarQuery = require("../../ddbb/queries/users/updateUserAvatarQuery");

const { generateError, saveAvatar, deletePhoto } = require("../../helpers");
const editAvatar = async () => {
  try {
    //Comprobamos que haya un archivo
    if (!req.files?.avatar) {
      throw generateError("Faltan campos", 400);
    }

    const user = await selectUserByIdQuery(req.user.id);

    //Si existe una foto ya establecida la borramos
    if (user.avatar) {
      await deletePhoto(user.avatar);
    }

    //Guardamos el avatar
    const avatar = await saveAvatar(req.files.avatar);

    //Actualizamos en la base de datos el nuevo avatar.
    await updateUserAvatarQuery(avatar, req.user.id);

    resizeBy.send({
      status: "ok",
      message: `Avatar de usuario ${req.user.id} actualizado`,
    });
  } catch (err) {
    next(err);
  }
};
module.exports = editAvatar;
