const getConnection = require("../../getConnection");
const { generateError } = require("../../../helpers");

const selectAllEntriesQuery = async () => {
  let connection;
  try {
    const [entries] =
      await connection.query(`SELECT id, title, description, file_name, category
                                              FROM entries`);
    if (entries.length < 1) {
      throw generateError("No se ha encontrado ninguna entrada", 404);
    }
    return entries;
  } finally {
    if (connection) connection.release();
  }
};
module.exports = selectAllEntriesQuery;
