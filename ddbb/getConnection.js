"use strict";

const mysql = require("mysql2/promise");
//Obtenemos las variables de entorno de nuestro .env
const { MYSQL_HOST, MYSQL_USER, MYSQL_PASS, MYSQL_DDBB } = process.env;

//Declaramos la variable donde se guardará nuestra pool de conexiones.
let pool;

async function getConnection() {
  try {
    //Si no hay una pool creada, creamos una.
    if (!pool) {
      pool = mysql.createPool({
        connectionLimit: 10, //Límite de conexiones simultáneas con la base de datos.
        host: MYSQL_HOST, //Host donde está alojado nuestro servidor.
        user: MYSQL_USER, //Usuario del MYSQL Workbench.
        password: MYSQL_PASS, //Contraseña del MYSQL Workbench.
        database: MYSQL_DDBB, //Nombre de la base de datos.
        timezone: "Z", //Huso Horario.
      });
    }
    return await pool.getConnection(); //Devuelve la conexión.
  } catch (err) {
    console.error(err);
  }
}

module.exports = getConnection();
