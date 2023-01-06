const getConnection = require("../../getConnection");

const insertCommentQuery = async (idUser, idEntry, text, file) => {
  let connection;

  try {
    connection = await getConnection;

    //Insertamos en la base de datos los valores correspondientes.
    const [newComment] = await connection.query(
      `
        INSERT INTO comments (user_id, entry_id, text, file_name, creation_date)
        VALUES (?, ?, ?, ?,?)
        `,
      [idUser, idEntry, text, file, new Date()]
    );
    //Devolvemos el id del nuevo comentario.
    return newComment.insertId;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = insertCommentQuery;
