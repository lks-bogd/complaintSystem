const { Sequelize } = require("sequelize");

require("dotenv").config();

const sequelize = new Sequelize({
  dialect: "postgres",
  database: process.env.DB_NAME || "",
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 5432,
  username: process.env.DB_USERNAME || "postgres",
  password: process.env.DB_PASSWORD || "",
});

module.exports = sequelize;
