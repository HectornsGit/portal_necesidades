const getConnection = require("../../getConnection");

const updateUserQuery = async (email, username, bio, avatar, idUser) => {
  let connection;

  try {
    connection = await getConnection;

    //Actualizamos en la base de datos el usuario.
    await connection.query(
      `UPDATE users SET email = ?, username = ? , bio = ?, avatar = ? WHERE id = ?`,
      [email, username, bio, avatar, idUser]
    );
  } finally {
    if (connection) connection.release();
  }
};

module.exports = updateUserQuery;
