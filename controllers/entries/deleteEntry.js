const selectEntryByIdQuery = require("../../ddbb/queries/entries/selectEntryByIdQuery");
const selectAllCommentsFromEntryQuery = require("../../ddbb/queries/comments/selectAllCommentsFromEntryQuery");
const deleteCommentQuery = require("../../ddbb/queries/comments/deleteCommentQuery");
const selectAllLikesFromCommentQuery = require("../../ddbb/queries/likes/selectAllLikesFromCommentQuery");
const { deleteFile, generateError } = require("../../helpers");
const deleteLikeQuery = require("../../ddbb/queries/likes/deleteLikeQuery");
const deleteEntryQuery = require("../../ddbb/queries/entries/deleteEntryQuery");

const deleteEntry = async (req, res, next) => {
  try {
    const { idEntry } = req.params;
    //Seleccionamos la entrada.
    const [entry] = await selectEntryByIdQuery(idEntry);
    entry;

    // Si no somos los dueños lanzamos un error.
    if (entry.user_id !== req.user.id) {
      throw generateError("No tienes suficientes permisos", 401);
    }

    //Seleccionamos todos sus comentarios.
    const comments = await selectAllCommentsFromEntryQuery(idEntry, 1);

    //Si hubiese:
    if (comments) {
      //Iteramos sobre cada uno...
      for (let comment of comments) {
        //Seleccionamos todas sus valoraciones...
        const likes = await selectAllLikesFromCommentQuery(comment.id, 1);

        //Si hubiese:
        if (likes) {
          //Iteramos sobre los me gusta y las borramos.
          for (let like of likes) {
            await deleteLikeQuery(like.id);
          }
        }

        //Si hubiese un archivo vinculado al comentario lo borramos.
        if (comment.file_name) {
          await deleteFile(comment.file_name);
        }

        //Borramos el comentario.
        await deleteCommentQuery(comment.id);
      }
    }

    //Borramos el archivo del ordenador y la entrada a continuación.
    if (entry.file_name) {
      await deleteFile(entry.file_name);
    }
    await deleteEntryQuery(idEntry);

    res.send({
      status: "ok",
      data: {
        message: "Entrada eliminada",
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = deleteEntry;
