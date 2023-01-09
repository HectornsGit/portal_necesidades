const getConnection = require("../../getConnection");
const { generateError } = require("../../../helpers");

const toggleSolvedQuery = async (Entry) => {
  let connection;
  try {
    const { id, solved } = Entry;
    connection = await getConnection;
    if (!solved) {
      connection.query(`UPDATE entries SET solved = ? WHERE id = ? `, [
        true,
        id,
      ]);
    }
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
