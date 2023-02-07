const getConnection = require("../../getConnection");
const { generateError } = require("../../../helpers");

const toggleSolvedQuery = async (Entry) => {
  let connection;
  try {
    const { id, solved } = Entry;
    connection = await getConnection;

    //Marcamos como resuelta o no la entry.

    connection.query(`UPDATE entries SET solved = ? WHERE id = ? `, [
      !solved,
      id,
    ]);
  } finally {
    if (connection) connection.release();
  }
};
module.exports = toggleSolvedQuery;
