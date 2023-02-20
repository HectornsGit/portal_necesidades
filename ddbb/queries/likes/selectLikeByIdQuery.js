const getConnection = require("../../getConnection");
const { generateError } = require("../../../helpers");

const selectLikeByIdQuery = async (idLike) => {
  let connection;
  try {
    connection = await getConnection;

    //Seleccionamos la valoración segun su id.
    const [likes] = await connection.query(
      `SELECT id, user_id, comment_id, creation_date
       FROM likes WHERE id = ?`,
      [idLike]
    );

    //Verificamos si la valoración existe.
    if (likes.length < 1) {
      throw generateError("No se ha encontrado ningun comentario", 404);
    }

    //devuelve la valoración.
    return likes;
  } finally {
    if (connection) connection.release();
  }
};
module.exports = selectLikeByIdQuery;
