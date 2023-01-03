"use strict";

const mysql = require("mysql2/promise");
const { MYSQL_HOST, MYSQL_USER, MYSQL_PASS, MYSQL_DDBB } = process.env;
let pool;

async function getConnection() {
  try {
    if (!pool) {
      pool = mysql.createPool({
        connectionLimit: 10,
        host: MYSQL_HOST,
        user: MYSQL_USER,
        password: MYSQL_PASS,
        database: MYSQL_DDBB,
        timezone: "Z",
      });
    }
    return await pool.getConnection();
  } catch (err) {
    console.error(err);
  }
}

module.exports = getConnection();
