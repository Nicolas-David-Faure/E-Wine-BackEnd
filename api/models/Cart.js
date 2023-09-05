const S = require("sequelize");
const db = require("../db/index");

class Cart extends S.Model {}

Cart.init(
  {
    date: {
      type: S.DATE,
    },
    state: {
      type: S.BOOLEAN,
      defaultValue: false,
    },
    amount: {
      type: S.DECIMAL,
    },
  },
  { sequelize: db, modelName: "carts" }
);

module.exports = Cart;
