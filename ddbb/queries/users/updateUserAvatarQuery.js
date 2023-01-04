const getConnection = require("../../getConnection");

const updateUserAvatarQuery = async (avatar, idUser) => {
  let connection;

  try {
    connection = await getConnection;

    await connection.query(`UPDATE users SET avatar = ? WHERE id = ?`, [
      avatar,
      idUser,
    ]);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = updateUserAvatarQuery;
