const getConnection = require("../../getConnection");

const { generateError } = require("../../../helpers");

const selectUserByEmailQuery = async (email) => {
  let connection;

  try {
    connection = await getConnection;

    //Seleccionamos al usuario segun su email en la base de datos.
    const [users] = await connection.query(
      `
        SELECT id, password FROM users WHERE email = ?
        `,
      [email]
    );

    //Lanzamos un error si el email es incorrector
    if (users.length < 1) {
      throw generateError("Email incorrecto", 404);
    }

    //Mostramos el user correspondiente al id.
    return users[0];
  } finally {
    if (connection) connection.release();
  }
};

module.exports = selectUserByEmailQuery;
