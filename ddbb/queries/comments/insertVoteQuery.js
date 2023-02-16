const getConnection = require("../../getConnection");

const { generateError } = require("../../../helpers");

const insertVoteQuery = async (value, idUser, idComment) => {
  let connection;

  try {
    connection = await getConnection;

    //comprobamos si el usuario ya votó.
    const [votes] = await connection.query(
      `SELECT id FROM ratings WHERE user_id = ? AND comment_id = ?`,
      [idUser, idComment]
    );

    //Si lo hizo y desea cambiar su valoracion actualizamos la que ya se habia guardado anteriormente.
    if (votes.length > 0) {
      await connection.query(
        `UPDATE ratings
         SET rating = ?
          WHERE id = ? `,
        [value, votes[0].id]
      );
      return;
    }
    //insertamos el voto
    await connection.query(
      `INSERT INTO ratings (rating, user_id, comment_id, creation_date)
    VALUES(?,?,?,?)`,
      [value, idUser, idComment, new Date()]
    );
  } finally {
    if (connection) connection.release();
  }
};

module.exports = insertVoteQuery;
