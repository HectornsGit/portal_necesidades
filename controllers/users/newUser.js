require("dotenv").config();
const getConnection = require("../../ddbb/getConnection");
const insertUserQuery = require("../../ddbb/queries/users/insertUserQuery");
const newUser = async (req, res, next) => {
  let connection;

  try {
    connection = await getConnection;
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      throw generateError("Faltan campos", 400);
    }

    await insertUserQuery(username, email, password);

    res.send({
      status: "ok",
      message: "Usuario creado.",
    });
  } catch (err) {
  } finally {
    if (connection) {
      connection.release();
      process.exit();
    }
  }
};
module.exports = newUser;
