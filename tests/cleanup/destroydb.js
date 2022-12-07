const mysql = require("mysql");

module.exports = function () {
  return new Promise((res, rej) => {
    const conn = mysql.createConnection({
      host: "localhost",
      user: process.env.TEST_DB_USER,
      password: process.env.TEST_DB_PASSWORD,
    });

    conn.connect(function (err) {
      if (err) rej(err);
      conn.query(
        `DROP DATABASE IF EXISTS ${process.env.TEST_DB_NAME}`,
        function (err) {
          if (err) return rej(err);
          conn.end();
          res();
        }
      );
    });
  });
};
