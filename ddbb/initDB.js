require("dotenv").config();
const connection = require("mysql2/typings/mysql/lib/Connection");
const getConnection = require("./getConnection");
const main = async () => {
  let connection;

  try {
  } catch (err) {
  } finally {
    if (connection) {
      connection.release();
      process.exit();
    }
  }
};
main();
