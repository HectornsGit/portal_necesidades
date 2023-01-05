const insertCommentQuery = require("../../ddbb/queries/comments/insertCommentQuery");

const newComment = async (req, res, next) => {
  try {
    const { file_name, text } = req.body;
    const { idEntry } = req.params;
    if (!file_name) {
      throw generateError("Faltan campos", 400);
    }

    const comment = insertCommentQuery(req.user.id, idEntry, file_name, text);

    //TEMPORAL
    if (req.files?.length == 1) {
      const photoName = await savePhoto(req.files, 1);
      await insertPhotoQuery(photoName, idEntry);
    }

    res.send({
      status: "ok",
      message: "Comment creado",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = newComment;
