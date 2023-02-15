const selectCommentByIdQuery = require("../../ddbb/queries/comments/selectCommentByIdQuery");
const insertVoteQuery = require("../../ddbb/queries/comments/insertVoteQuery");

const { generateError } = require("../../helpers");

const newRating = async (req, res, next) => {
  try {
    //Obtenemos la información necesaria de nuestra request.
    const { idComment } = req.params;
    const { value } = req.body;

    //Seleccionamos el comentario.
    const comment = await selectCommentByIdQuery(idComment);

    //Restringimos el auto-voto
    if (comment.idUser === req.user.id) {
      throw generateError("No puedes valorar tu propio comment", 400);
    }
    //Array con las valoraciones validas
    const validVotes = [1, 2, 3, 4, 5];

    //Si el voto no es valido lanzamos un error.
    if (!validVotes.includes(value)) {
      throw generateError("Valoracion no valida", 400);
    }

    //Valoramos la entrada
    await insertVoteQuery(value, req.user.id, idComment);

    res.send({
      status: "ok",
      message: "Valoracion enviada",
      rating: value,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = newRating;
