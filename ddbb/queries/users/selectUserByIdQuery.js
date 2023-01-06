const getConnection = require("../../getConnection");

const { generateError } = require("../../../helpers");

const selectUserByIdQuery = async (idUser) => {
  let connection;

  try {
    connection = await getConnection;
    //Seleccionamos al usuario segun su id en la base de datos.
    const [users] = await connection.query(
      `SELECT id, email,avatar, password,username,registration_date FROM users WHERE id = ?`,
      [idUser]
    );
    //Lanzamos un error si no se encuentra al usuario con ese id
    if (users.length > 1) {
      throw generateError("Usuario no encontrado 😔", 404);
    }

    //Devuelve al usuario seleccionado segun su id.
    return users[0];
  } finally {
    if (connection) connection.release();
  }
};

module.exports = selectUserByIdQuery;
