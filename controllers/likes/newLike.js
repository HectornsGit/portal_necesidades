const selectCommentByIdQuery = require("../../ddbb/queries/comments/selectCommentByIdQuery");
const insertLikeQuery = require("../../ddbb/queries/comments/insertLikeQuery");

const { generateError } = require("../../helpers");
const selectUserByIdQuery = require("../../ddbb/queries/users/selectUserByIdQuery");

const newLike = async (req, res, next) => {
  try {
    //Obtenemos la información necesaria de nuestra request.
    const { idComment } = req.params;

    //Seleccionamos el comentario.
    const [comment] = await selectCommentByIdQuery(idComment);

    //Restringimos el auto-voto
    if (comment.user_id === req.user.id) {
      throw generateError("No puedes valorar tu propio comment", 400);
    } else {
      //Valoramos la entrada
      const message = await insertLikeQuery(req.user.id, idComment);

      //Seleccionamos el comentario.
      const [updatedComment] = await selectCommentByIdQuery(idComment);
      const userData = await selectUserByIdQuery(updatedComment.user_id);

      res.send({
        status: "ok",
        message,
        data: {
          id: idComment,
          entry_id: updatedComment.entry_id,
          user_id: updatedComment.user_id,
          text: updatedComment.text,
          file_name: updatedComment.fileName,
          creation_date: updatedComment.creation_date,
          likes: updatedComment.likes,
          avatar: userData.avatar,
          username: userData.username,
        },
      });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = newLike;
