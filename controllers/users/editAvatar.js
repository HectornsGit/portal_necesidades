const selectUserByIdQuery = require("../../ddbb/queries/users/selectUserByIdQuery");
const updateUserAvatarQuery = require("../../ddbb/queries/users/updateUserAvatarQuery");

const { generateError, savePhoto, deletePhoto } = require("../../helpers");
const editAvatar = async () => {
  try {
    if (!req.files?.avatar) {
      throw generateError("Faltan campos", 400);
    }

    const user = await selectUserByIdQuery(req.user.id);

    if (user.avatar) {
      await deletePhoto(user.avatar);
    }

    const avatar = await savePhoto(req.files.avatar);

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
