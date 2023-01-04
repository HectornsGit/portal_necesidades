const getConnection = require("../../getConnection");

const insertPhotoQuery = async (photo, idEntry) => {
  let connection;

  try {
    connection = await getConnection;

    await connection.query(
      `INSERT INTO entries (file_name, id, creation_date) VALUES (?, ?, ?)`,
      [photo, idEntry, new Date()]
    );
  } finally {
    if (connection) connection.release();
  }
};

module.exports = insertPhotoQuery;
