const getConnection = require("../../getConnection");

const deleteEntryQuery = async (idEntry) => {
  let connection;

  try {
    connection = await getConnection;

    //Borramos de la base de datos toda la información de la valoración deseada.
    await connection.query(`DELETE  FROM entries WHERE id = ? `, [idEntry]);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = deleteEntryQuery;
