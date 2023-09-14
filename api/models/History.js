const S = require("sequelize");
const db = require("../db/index");

class History extends S.Model {}

History.init(
  {
    state: {
      type: S.BOOLEAN,
    },
    amount: {
      type: S.INTEGER,
    },
    num_cart: {
      type: S.INTEGER,
    },
    count: {
      type: S.INTEGER,
    },
    userId: {
      type: S.INTEGER,
    },
    wineId: {
      type: S.INTEGER,
    },
  },
  { sequelize: db, modelName: "history" }
);

module.exports = History;
