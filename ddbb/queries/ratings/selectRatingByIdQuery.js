const getConnection = require("../../getConnection");
const { generateError } = require("../../../helpers");

const selectRatingByIdQuery = async (idRating) => {
  let connection;
  try {
    connection = await getConnection;

    //Seleccionamos la valoración segun su id.
    const [ratings] = await connection.query(
      `SELECT id, user_id, comment_id, rating, creation_date
       FROM ratings WHERE id = ?`,
      [idRating]
    );

    //Verificamos si la valoración existe.
    if (ratings.length < 1) {
      throw generateError("No se ha encontrado ningun comentario", 404);
    }

    //devuelve la valoración.
    return ratings;
  } finally {
    if (connection) connection.release();
  }
};
module.exports = selectRatingByIdQuery;
