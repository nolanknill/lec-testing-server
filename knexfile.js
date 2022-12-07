require("dotenv").config();
// Update with your config settings.

const envs = {
  development: {
    client: "mysql",
    connection: {
      host: process.env.DEV_DB_HOST,
      database: process.env.DEV_DB_NAME,
      user: process.env.DEV_DB_USER,
      password: process.env.DEV_DB_PASSWORD,
    },
  },
  test: {
    client: "mysql",
    connection: {
      host: "127.0.0.1",
      host: process.env.TEST_DB_HOST,
      database: process.env.TEST_DB_NAME,
      user: process.env.TEST_DB_USER,
      password: process.env.TEST_DB_PASSWORD,
    },
  },
};

module.exports = envs[process.env.NODE_ENV || "development"];
