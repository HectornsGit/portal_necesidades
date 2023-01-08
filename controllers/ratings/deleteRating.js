const selectRatingByIdQuery = require("../../ddbb/queries/ratings/selectRatingByIdQuery");
const deleteRatingFromCommentQuery = require("../../ddbb/queries/ratings/deleteRatingFromCommentQuery");
const { generateError } = require("../../helpers");

const deleteRating = async (req, res, next) => {
  try {
    const { idRating } = req.params;
    //Seleccionamos la valoración
    const [rating] = await selectRatingByIdQuery(idRating);

    //Si no somos el dueño de la valoración dará error.
    if (rating.user_id != req.user.id) {
      throw generateError("No tienes los permisos necesarios.");
    }

    //Borramos la valoración.
    await deleteRatingFromCommentQuery(rating.id);

    res.send({
      status: "ok",
      data: {
        message: "Valoración eliminada",
      },
    });
  } catch (err) {
    next(err);
  }
};
module.exports = deleteRating;
