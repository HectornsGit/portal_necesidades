const getConnection = require("../../getConnection");
const { generateError } = require("../../../helpers");

const selectEntryByIdQuery = async (idEntry) => {
  let connection;
  try {
    connection = await getConnection;
    const [entries] = await connection.query(
      `SELECT id, title, description, file_name, category
       FROM entries WHERE id = ?`,
      [idEntry]
    );
    if (entries.length < 1) {
      throw generateError("No se ha encontrado ninguna entrada", 404);
    }
    return entries;
  } finally {
    if (connection) connection.release();
  }
};
module.exports = selectEntryByIdQuery;
