const getConnection = require("../../getConnection");
const { generateError } = require("../../../helpers");

const deleteLikeQuery = async (idLike) => {
  let connection;
  try {
    connection = await getConnection;

    //Seleccionamos y borramos la valoración segun su id.
    await connection.query(`DELETE FROM likes WHERE id = ?`, [idLike]);
  } finally {
    if (connection) connection.release();
  }
};
module.exports = deleteLikeQuery;
