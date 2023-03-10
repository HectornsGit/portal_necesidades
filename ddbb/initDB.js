require("dotenv").config();
const { generateError } = require("../helpers");
const getConnection = require("./getConnection");

const main = async () => {
  let connection;

  try {
    //Entablamos una conexión con la base de datos.
    connection = await getConnection;

    console.log("Borrando tablas...");
    //Código para borrar las tablas si es que ya existiesen.
    await connection.query(`DROP TABLE IF EXISTS likes`);
    await connection.query(`DROP TABLE IF EXISTS comments`);
    await connection.query(`DROP TABLE IF EXISTS entries`);
    await connection.query(`DROP TABLE IF EXISTS users`);

    console.log("Creando tablas...");

    //Creamos la tabla users.
    await connection.query(`CREATE TABLE IF NOT EXISTS users(
      id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
      email VARCHAR(100) NOT NULL UNIQUE,
      password VARCHAR(100) NOT NULL,
      username VARCHAR(30) NOT NULL,
      bio VARCHAR(200),
      avatar VARCHAR(200) DEFAULT "default_avatar.png",
      registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )`);

    //Creamos la tabla entries.
    await connection.query(`CREATE TABLE IF NOT EXISTS entries(
      id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
      user_id int UNSIGNED NOT NULL,
      FOREIGN KEY(user_id) REFERENCES users(id),
      title VARCHAR(40) NOT NULL,
      description TEXT NOT NULL,
      file_name VARCHAR(200),
      solved BOOLEAN DEFAULT false,
      category ENUM("Matemáticas","Traducciones","Modelado 3D","Ilustración","Audio","Otros") DEFAULT "Otros",
      creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )`);

    //Creamos la tabla comments.
    await connection.query(`CREATE TABLE IF NOT EXISTS comments(
      id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
      user_id int UNSIGNED NOT NULL,
      FOREIGN KEY(user_id) REFERENCES users(id),
      entry_id int UNSIGNED NOT NULL,
      FOREIGN KEY(entry_id) REFERENCES entries(id),
      text TEXT,
      file_name VARCHAR(200),
      creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )`);

    //Creamos la tabla likes.
    await connection.query(`CREATE TABLE IF NOT EXISTS likes(
      id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
      user_id int UNSIGNED NOT NULL,
      FOREIGN KEY(user_id) REFERENCES users(id),
      comment_id int UNSIGNED NOT NULL,
      FOREIGN KEY(comment_id) REFERENCES comments(id),
      creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(comment_id,user_id)
      )`);

    console.log("Tablas creadas");
  } catch (err) {
    throw generateError("Error al iniciar la base de datos");
  } finally {
    //Cerramos la conexión con la base de datos si es que existe.
    if (connection) {
      connection.release();
      process.exit();
    }
  }
};

main();
