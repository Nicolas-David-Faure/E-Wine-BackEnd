const S = require("sequelize");
const config = require("../config/env");

const db = new S(config.DB_HOST, null, null, {
  host: "localhost",
  dialect: "postgres",
  logging: false,
});

module.exports = db;
