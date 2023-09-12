const S = require("sequelize");
const db = require("../db/index");

class History extends S.Model {}

History.init({}, { sequelize: db, modelName: "history" });

module.exports = History;
