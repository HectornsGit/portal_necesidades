const getConnection = require("../../getConnection");
const bcrypt = require("bcrypt");

const { generateError } = require("../../../helpers");

const insertUserQuery = async (username, email, password) => {
  let connection;

  try {
    connection = await getConnection;
    const [users] = await connection.query(
      `SELECT id FROM users WHERE username = ? OR email = ?`,
      [username, email]
    );

    if (users.length > 0) {
      throw generateError("Email o nombre de usuario existente", 403);
    }
    const hashPass = bcrypt.hash(password, 10);

    await connection.query(
      `INSERT INTO users (email, password, username, registration_date)
        VALUES (?, ?, ?, ?)`,
      [username, email, hashPass, new Date()]
    );
  } catch (err) {
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

module.exports = insertUserQuery;
