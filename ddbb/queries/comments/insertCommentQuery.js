const getConnection = require("../../getConnection");

const insertCommentQuery = async (idUser, idEntry, file_name, text) => {
  let connection;

  try {
    connection = await getConnection;
    const [newComment] = await connection.query(
      `
        INSERT INTO comments (user_id, entry_id, text, file_name, creation_date)
        VALUES (?, ?, ?, ?, ?)
        `,
      [idUser, idEntry, text, file_name, new Date()]
    );

    return newComment.insertId;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = insertCommentQuery;
