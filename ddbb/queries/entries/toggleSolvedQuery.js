const getConnection = require("../../getConnection");
const { generateError } = require("../../../helpers");

const toggleSolvedQuery = async (Entry) => {
  let connection;
  try {
    const { id, solved } = Entry;
    connection = await getConnection;
    //Si no está resuelta la marcamos como tal.
    if (!solved) {
      connection.query(`UPDATE entries SET solved = ? WHERE id = ? `, [
        true,
        id,
      ]);
    }
    //Si está resuelta la marcamos como no resuelta.
    if (solved) {
      connection.query(`UPDATE entries SET solved = ? WHERE id = ? `, [
        false,
        id,
      ]);
    }
  } finally {
    if (connection) connection.release();
  }
};
module.exports = toggleSolvedQuery;
