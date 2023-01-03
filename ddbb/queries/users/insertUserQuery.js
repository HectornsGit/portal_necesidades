const getConnection = require("../../getConnection");

const bcrypt = require("bcrypt");

const { generateError } = require("../../../helpers");

const insertUserQuery = async (username, email, password) => {
  let connection;

  try {
    //Conectamos con la base de datos.
    connection = await getConnection;

    //Obtenemos el usuario con el email o username proporcionados.
    const [users] = await connection.query(
      `SELECT id FROM users WHERE username = ? OR email = ?`,
      [username, email]
    );

    //Si sale en los resultados ya existirá y procedemos a envíar un error.
    if (users.length > 0) {
      throw generateError("Email o nombre de usuario existente", 403);
    }
    //Encriptamos la contraseña para mayor seguridad.
    const hashPass = await bcrypt.hash(password, 10);

    //Insertamos el usuario en la base de datos.
    await connection.query(
      `INSERT INTO users (email, password, username, registration_date)
      VALUES (?, ?, ?, ?)`,
      [email, hashPass, username, new Date()]
    );
  } finally {
    //Cerramos la conexión con la base de datos, si hay una.
    if (connection) {
      connection.release();
    }
  }
};

module.exports = insertUserQuery;
