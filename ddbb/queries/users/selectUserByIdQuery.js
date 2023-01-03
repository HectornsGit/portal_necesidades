const getConnection = require("../../getConnection");

const { generateError } = require("../../../helpers");

const selectUserByEmailQuery = async (idUser) => {
  let connection;

  try {
    connection = await getConnection();

    const [users] = await connection.query(
      `SELECT id, email, password,username,registration_date FROM users WHERE id = ?`,
      [idUser]
    );

    if (users.length > 1) {
      throw generateError("Usuario no encontrado 😔", 404);
    }

    return users[0];
  } finally {
    if (connection) connection.release();
  }
};

module.export = selectUserByEmailQuery;
