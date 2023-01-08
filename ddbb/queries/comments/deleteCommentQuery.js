const getConnection = require("../../getConnection");

const deleteCommentQuery = async (idComment) => {
  let connection;

  try {
    connection = await getConnection;

    //Borramos de la base de datos toda la información del comentario deseado.
    await connection.query(`DELETE  FROM comments WHERE id = ? `, [idComment]);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = deleteCommentQuery;
