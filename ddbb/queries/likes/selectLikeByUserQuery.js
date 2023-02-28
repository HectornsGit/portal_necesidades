const getConnection = require("../../getConnection");
const { generateError } = require("../../../helpers");

const selectLikeByUserQuery = async (user_id) => {
  let connection;
  try {
    connection = await getConnection;

    //Seleccionamos la valoración segun el id del dueño.
    const [likes] = await connection.query(
      `SELECT id, user_id, comment_id, creation_date
       FROM likes WHERE user_id = ?`,
      [user_id]
    );

    //Verificamos si la valoración existe.
    if (likes.length < 1) {
      return [];
    }

    //devuelve la valoración.
    return likes;
  } finally {
    if (connection) connection.release();
  }
};
module.exports = selectLikeByUserQuery;
