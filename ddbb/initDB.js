require("dotenv").config();
const getConnection = require("./getConnection");

const main = async () => {
  let connection;

  try {
    connection = await getConnection;

    console.log("Borrando tablas...");

    await connection.query(`DROP TABLE IF EXISTS ratings`);
    await connection.query(`DROP TABLE IF EXISTS comments`);
    await connection.query(`DROP TABLE IF EXISTS entries`);
    await connection.query(`DROP TABLE IF EXISTS users`);

    console.log("Creando tablas...");

    await connection.query(`CREATE TABLE IF NOT EXISTS users(
      id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
      email VARCHAR(100) NOT NULL UNIQUE,
      password VARCHAR(100) NOT NULL,
      username VARCHAR(30) NOT NULL,
      bio VARCHAR(200),
      avatar VARCHAR(100),
      registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )`);

    await connection.query(`CREATE TABLE IF NOT EXISTS entries(
      id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
      user_id int UNSIGNED NOT NULL,
      FOREIGN KEY(user_id) REFERENCES users(id),
      title VARCHAR(20) NOT NULL,
      description TEXT NOT NULL,
      file_name VARCHAR(30),
      solved BOOLEAN DEFAULT false,
      category ENUM("Matemáticas","Traducciones","Modelado 3D","Ilustración","Audio","Otros") DEFAULT "Otros",
      creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )`);

    await connection.query(`CREATE TABLE IF NOT EXISTS comments(
      id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
      user_id int UNSIGNED NOT NULL,
      FOREIGN KEY(user_id) REFERENCES users(id),
      entry_id int UNSIGNED NOT NULL,
      FOREIGN KEY(entry_id) REFERENCES entries(id),
      file_name VARCHAR(100),
      creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )`);

    await connection.query(`CREATE TABLE IF NOT EXISTS ratings(
      id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
      user_id int UNSIGNED NOT NULL,
      FOREIGN KEY(user_id) REFERENCES users(id),
      comment_id int UNSIGNED NOT NULL,
      FOREIGN KEY(comment_id) REFERENCES comments(id),
      rating ENUM("1", "2", "3", "4", "5"),
      creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(comment_id,user_id)
      )`);

    console.log("Tablas creadas");
  } catch (err) {
  } finally {
    if (connection) {
      connection.release();
      process.exit();
    }
  }
};

main();
