const getConnection = require("../../getConnection");
const { generateError } = require("../../../helpers");

const selectAllRatingsFromCommentQuery = async (idComment, del) => {
  let connection;
  try {
    connection = await getConnection;

    //Seleccionamos las valoraciones segun el id de la entry a la  que pertenecen.
    const [ratings] = await connection.query(
      `SELECT R.id, R.comment_id, R.user_id, R.rating, R.creation_date
       FROM ratings R
       INNER JOIN comments C on C.id = R.comment_id
       WHERE C.id = ?`,
      [idComment]
    );

    //Verificamos la valoración existe.
    if (ratings.length < 1) {
      if (del) return false; //Si queremos borrarla y no existe lo ignoramos y devolvemos false.
      throw generateError("No se ha encontrado ninguna valoración", 404);
    }

    //devuelve las valoraciones.
    return ratings;
  } finally {
    if (connection) connection.release();
  }
};
module.exports = selectAllRatingsFromCommentQuery;
