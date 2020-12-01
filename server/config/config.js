require("dotenv").config();

module.exports = {
  development: {
    port: process.env.MYSQL_PORT,
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    host: process.env.DB_HOST,
    dialect: "mysql",
    define: {
      underscored: true,
      paranoid: true,
    },
    logging: false,
  },
  test: {
    port: process.env.MYSQL_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_TEST,
    host: process.env.DB_HOST,
    dialect: "mysql",
    define: { underscored: true },
    logging: false,
  },
  production: {
    port: process.env.MYSQL_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_PRODUCTION,
    host: process.env.DB_HOST,
    dialect: "mysql",
    define: {
      underscored: true,
      paranoid: true,
    },
  },
};
