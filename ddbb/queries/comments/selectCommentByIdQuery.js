const getConnection = require("../../getConnection");
const { generateError } = require("../../../helpers");

const selectCommentByIdQuery = async (idComment) => {
  let connection;
  try {
    connection = await getConnection;

    //Seleccionamos el comentario segun su id.
    const [comments] = await connection.query(
      `SELECT id, user_id, entry_id, text, file_name, creation_date
       FROM comments WHERE id = ?`,
      [idComment]
    );

    //Verificamos si el comentario existe.
    if (comments.length < 1) {
      throw generateError("No se ha encontrado ningun comentario", 404);
    }

    //devuelve el comentario.
    return comments;
  } finally {
    if (connection) connection.release();
  }
};
module.exports = selectCommentByIdQuery;
