const getConnection = require("../../getConnection");
const { generateError } = require("../../../helpers");

const selectEntryByIdQuery = async (idEntry) => {
  let connection;
  try {
    connection = await getConnection;

    //Seleccionamos la entry segun su id
    const [entries] = await connection.query(
      `SELECT id, user_id, title, description, file_name, category, solved
       FROM entries WHERE id = ?`,
      [idEntry]
    );

    //Lanzamos un error si no encontramos ninguna entrada con el id seleccionado
    if (entries.length < 1) {
      throw generateError("No se ha encontrado ninguna entrada", 404);
    }

    //Devuelve la entrada correspondiente al id seleccionado.
    return entries;
  } finally {
    if (connection) connection.release();
  }
};
module.exports = selectEntryByIdQuery;
