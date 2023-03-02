const getConnection = require("../../getConnection");
const { generateError } = require("../../../helpers");
const { request } = require("express");

const selectAllCommentsFromEntryQuery = async (idEntry, requestUser) => {
  console.log(requestUser);
  let connection;
  try {
    connection = await getConnection;

    //Si el usuario está loggeado comprobará los likes que ha hecho en esos comentarios, si no, no.
    const query = requestUser
      ? `
      SELECT 
        C.id, 
        C.user_id,
        U.username,
        U.avatar, 
        C.entry_id, 
        C.text, 
        C.file_name, 
        C.creation_date, 
        COUNT(L.id) as likes,
        (SELECT COUNT(likes.id) FROM likes WHERE likes.comment_id = C.id AND likes.user_id = ?) as userLike
      FROM comments C
      INNER JOIN entries E on E.id = C.entry_id
      LEFT JOIN likes L on L.comment_id = C.id
      INNER JOIN users U on U.id = C.user_id
      WHERE E.id = ?
      GROUP BY C.id
      ORDER BY likes DESC`
      : `
      SELECT 
        C.id, 
        C.user_id,
        U.username,
        U.avatar, 
        C.entry_id, 
        C.text, 
        C.file_name, 
        C.creation_date, 
        COUNT(L.id) as likes
      FROM comments C
      INNER JOIN entries E on E.id = C.entry_id
      LEFT JOIN likes L on L.comment_id = C.id
      INNER JOIN users U on U.id = C.user_id
      WHERE E.id = ?
      GROUP BY C.id
      ORDER BY likes DESC`;

    //Seleccionamos los comentarios segun el id de la entry a la  que pertenecen.
    const [comments] = await connection.query(
      query,
      requestUser ? [requestUser.id, idEntry] : [idEntry]
    );

    //devuelve los comentarios.
    return comments;
  } finally {
    if (connection) connection.release();
  }
};
module.exports = selectAllCommentsFromEntryQuery;
