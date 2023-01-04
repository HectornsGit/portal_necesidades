const getConnection = require("../../getConnection");

const { generateError } = require("../../../helpers");

const insertVoteQuery = async (value, idUser, idEntry) => {
  let connection;

  try {
    connection = await getConnection;

    //comprobamos si el usuario ya voto
    const [votes] = await connection.query(
      `SELECT id FROM ratings WHERE user_id = ? AND comment_id = ?`,
      [idUser, idEntry]
    );

    if (votes.length > 0) {
      throw generateError("Ya valoraste esta entrada", 403);
    }

    //insertamos el voto
    await connection.query(
      `INSERT INTO retings (rating, user_id, comment_id, creation_date)
    VALUES(?,?,?,?)`,
      [value, idUser, idEntry, new Date()]
    );
  } finally {
    if (connection) connection.release();
  }
};

module.exports = insertVoteQuery;