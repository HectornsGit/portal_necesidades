const getConnection = require("../../getConnection");
const { generateError } = require("../../../helpers");

const selectAllLikesFromCommentQuery = async (idComment, del) => {
  let connection;
  try {
    connection = await getConnection;

    //Seleccionamos los me gusta  segun el id del comentario al  que pertenecen.
    const [likes] = await connection.query(
      `SELECT L.id, L.comment_id, L.user_id, L.creation_date
       FROM likes L
       INNER JOIN comments C on C.id = L.comment_id
       WHERE C.id = ?`,
      [idComment]
    );

    //Verificamos la valoración existe.
    if (likes.length < 1) {
      if (del) return false; //Si queremos borrarla y no existe lo ignoramos y devolvemos false.
      throw generateError("No se ha encontrado ninguna valoración", 404);
    }

    //devuelve las valoraciones.
    return likes;
  } finally {
    if (connection) connection.release();
  }
};
module.exports = selectAllLikesFromCommentQuery;
