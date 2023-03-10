const selectCommentByIdQuery = require("../../ddbb/queries/comments/selectCommentByIdQuery");
const deleteCommentQuery = require("../../ddbb/queries/comments/deleteCommentQuery");
const selectAllLikesFromCommentQuery = require("../../ddbb/queries/likes/selectAllLikesFromCommentQuery");
const deleteLikeQuery = require("../../ddbb/queries/likes/deleteLikeQuery");
const { generateError, deleteFile } = require("../../helpers");

const deleteComment = async (req, res, next) => {
  try {
    const { idComment } = req.params;
    //Seleccionamos el comentario.
    const [comment] = await selectCommentByIdQuery(idComment);

    //Si no somos el dueño lanzamos error.
    if (comment.user_id !== req.user.id) {
      throw generateError("No tienes los permisos necesarios.");
    }
    //Seleccionamos los me gusta del comentario.
    const likes = await selectAllLikesFromCommentQuery(comment.id, 1);
    //Si hubiese:
    if (likes) {
      //Iteramos sobre los me gusta y las borramos.
      for (let like of likes) {
        await deleteLikeQuery(like.id);
      }
    }
    //Si hubiese un archivo vinculado al comentario lo eliminamos.
    if (comment.file_name) {
      await deleteFile(comment.file_name);
    }
    //Finalmente eliminamos el comentario.
    await deleteCommentQuery(comment.id);

    res.send({
      status: "ok",
      data: {
        message: "Comentario eliminado",
      },
    });
  } catch (err) {
    next(err);
  }
};
module.exports = deleteComment;
