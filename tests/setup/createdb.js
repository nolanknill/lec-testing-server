const mysql = require("mysql");
require("dotenv").config();

module.exports = function () {
  const dbName = "test_" + Math.floor(Math.random() * 10000);
  process.env.TEST_DB_NAME = dbName;

  return new Promise((res, rej) => {
    const conn = mysql.createConnection({
      host: "localhost",
      user: process.env.TEST_DB_USER,
      password: process.env.TEST_DB_PASSWORD,
    });

    conn.connect(function (err) {
      if (err) rej(err);
      conn.query(`CREATE DATABASE ${dbName}`, function (err) {
        if (err) return rej(err);
        conn.end();
        res();
      });
    });
  });
};
