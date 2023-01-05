const getConnection = require("../../getConnection");

const insertEntryQuery = async (
  title,
  description,
  file_name,
  category,
  idUser
) => {
  let connection;

  try {
    connection = await getConnection;

    const [newEntry] = await connection.query(
      `
        INSERT INTO entries (title, description, file_name, category, creation_date,user_id)
        VALUES (?, ?, ?, ?, ?,?)
        `,
      [title, description, file_name, category, new Date(), idUser]
    );

    return newEntry.insertId;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = insertEntryQuery;
