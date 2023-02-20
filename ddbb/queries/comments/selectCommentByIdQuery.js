const getConnection = require("../../getConnection");
const { generateError } = require("../../../helpers");

const selectCommentByIdQuery = async (idComment) => {
  let connection;
  try {
    connection = await getConnection;

    //Seleccionamos el comentario segun su id.
    const [comments] = await connection.query(
      `SELECT C.id, C.user_id, C.entry_id, C.text, C.file_name, C.creation_date, COUNT(L.id) as likes
      FROM comments C
      LEFT JOIN likes L ON L.comment_id = C.id
      WHERE C.id = ?;`,
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
