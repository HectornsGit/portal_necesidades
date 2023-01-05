const selectCommentByIdQuery = require("../../ddbb/queries/comments/selectCommentByIdQuery");
const insertVoteQuery = require("../../ddbb/queries/entries/insertVoteQuery");

const { generateError } = require("../../helpers");

const voteComment = async (req, res, next) => {
  try {
    const { idComment } = req.params;

    const { value } = req.body;
    const comment = await selectCommentByIdQuery(idComment);

    //Restringimos el auto-voto
    if (comment.idUser === req.user.id) {
      throw generateError("No puedes valorar tu propio comment", 400);
    }
    //Array con valoraciones validas
    const validVotes = [1, 2, 3, 4, 5];

    //voto no valido
    if (!validVotes.includes(value)) {
      throw generateError("Valoracion no valida", 400);
    }

    //Valoramos la entrada
    await insertVoteQuery(value, req.user.id, idComment);

    res.send({
      status: "ok",
      message: "Valoracion enviada",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = voteComment;
