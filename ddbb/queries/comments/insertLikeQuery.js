const getConnection = require("../../getConnection");

const { generateError } = require("../../../helpers");

const insertLikeQuery = async (idUser, idComment) => {
  let connection;

  try {
    connection = await getConnection;

    //comprobamos si el usuario ya dio a me gusta.
    const [likes] = await connection.query(
      `SELECT id FROM likes WHERE user_id = ? AND comment_id = ?`,
      [idUser, idComment]
    );

    //Si lo hizo se borra el me gusta.
    if (likes.length > 0) {
      await connection.query(
        `DELETE FROM likes
          WHERE id = ? `,
        [likes[0].id]
      );
      return "Like eliminado";
    }
    //insertamos el me gusta.
    await connection.query(
      `INSERT INTO likes ( user_id, comment_id, creation_date)
    VALUES(?,?,?)`,
      [idUser, idComment, new Date()]
    );
    return "Like añadido";
  } finally {
    if (connection) connection.release();
  }
};

module.exports = insertLikeQuery;
