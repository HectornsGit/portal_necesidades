const getConnection = require("../../getConnection");
const { generateError } = require("../../../helpers");

const selectEntryByCategoryQuery = async (category) => {
  let connection;
  try {
    connection = await getConnection;

    //Seleccionamos la Entry segun la categoria establecida.
    const [entries] = await connection.query(
      `SELECT E.id, E.title, E.description, E.file_name, E.category, E.solved, COUNT(C.entry_id) as commentCount
      FROM entries E
      LEFT JOIN comments C ON C.entry_id = E.id
      WHERE category = ?
      GROUP BY E.id
      `,
      [category]
    );

    //Lanzamos un error si no encontramos ninguna entrada con esa categoria.
    if (entries.length < 1) {
      throw generateError("No se ha encontrado ninguna entrada", 404);
    }

    //Devuelve las entries con dicha categorida seleccionada.
    return entries;
  } finally {
    if (connection) connection.release();
  }
};
module.exports = selectEntryByCategoryQuery;
