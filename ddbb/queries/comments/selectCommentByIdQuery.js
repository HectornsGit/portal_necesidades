const getConnection = require("../../getConnection");
const { generateError } = require("../../../helpers");

const selectCommentByIdQuery = async (idComment) => {
  let connection;
  try {
    connection = await getConnection;
    const [comments] = await connection.query(
      `SELECT user_id, entry_id, text, file_name, creation_date
       FROM comments WHERE id = ?`,
      [idComment]
    );
    if (comments.length < 1) {
      throw generateError("No se ha encontrado ningun comentario", 404);
    }
    return comments;
  } finally {
    if (connection) connection.release();
  }
};
module.exports = selectCommentByIdQuery;
