const getConnection = require("../../getConnection");
const { generateError } = require("../../../helpers");

const selectAllCommentsFromEntryQuery = async (idEntry, del) => {
  let connection;
  try {
    connection = await getConnection;

    //Seleccionamos los comentarios segun el id de la entry a la  que pertenecen.
    const [comments] = await connection.query(
      `SELECT C.id, C.user_id, C.entry_id, C.text, C.file_name, C.creation_date
       FROM comments C
       INNER JOIN entries E on E.id = C.entry_id
       WHERE E.id = ?`,
      [idEntry]
    );

    //Verificamos si el comentario existe.
    if (comments.length < 1) {
      if (del) return false; //Si queremos borrarlos y no existen lo ignoramos y devolvemos false.
      throw generateError("No se ha encontrado ningun comentario", 404);
    }

    //devuelve los comentarios.
    return comments;
  } finally {
    if (connection) connection.release();
  }
};
module.exports = selectAllCommentsFromEntryQuery;
