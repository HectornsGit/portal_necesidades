const getConnection = require("../../getConnection");
const { generateError } = require("../../../helpers");

const selectAllEntriesQuery = async () => {
  let connection;
  try {
    //Abrimos una conexión con la base de datos.
    connection = await getConnection;

    //Seleccionamos todas las entries de nuestra base de datos y las guardamos en una lista.
    const [entries] =
      await connection.query(`SELECT E.id, E.title, E.description, E.file_name, E.category, E.solved, COUNT(C.entry_id) as commentCount
                                              FROM entries E
                                              LEFT JOIN comments C ON C.entry_id = E.id
                                              GROUP BY E.id`);
    if (entries.length < 1) {
      //Si no hubiese entradas lanzamos un error.
      throw generateError("No se ha encontrado ninguna entrada", 404);
    }
    return entries;
  } finally {
    if (connection) connection.release;
  }
};
module.exports = selectAllEntriesQuery;
