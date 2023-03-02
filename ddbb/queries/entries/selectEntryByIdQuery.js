const getConnection = require("../../getConnection");
const { generateError } = require("../../../helpers");

const selectEntryByIdQuery = async (idEntry) => {
  let connection;
  try {
    connection = await getConnection;

    const query = `
    SELECT 
      E.id, 
      U.username, 
      E.title, 
      E.description, 
      E.file_name, 
      E.category, 
      E.solved,
      E.creation_date, 
      E.user_id, 
      U.avatar, 
      COUNT(C.entry_id) as commentCount
    FROM entries E
    LEFT JOIN comments C ON C.entry_id = E.id
    LEFT JOIN users U ON U.id= E.user_id
    WHERE E.id=?
    GROUP BY E.id`;

    //Seleccionamos la entry segun su id
    const [entries] = await connection.query(query, [idEntry]);

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
