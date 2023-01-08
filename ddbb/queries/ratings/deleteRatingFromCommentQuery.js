const getConnection = require("../../getConnection");

const deleteRatingQuery = async (idRating) => {
  let connection;

  try {
    connection = await getConnection;

    //Borramos de la base de datos toda la información de la valoración deseada.
    await connection.query(`DELETE  FROM ratings WHERE id = ? `, [idRating]);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = deleteRatingQuery;
