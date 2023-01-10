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

    //Insertamos los datos necesarios para crear una nueva entrada (incluyendo archivos)
    const [newEntry] = await connection.query(
      `
        INSERT INTO entries (title, description, file_name, category, creation_date,user_id)
        VALUES (?, ?, ?, ?, ?,?)
        `,
      [title, description, file_name, category, new Date(), idUser]
    );

    //Devuelve la nueva entrada junto a su id correspondiente.
    return newEntry.insertId;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = insertEntryQuery;
