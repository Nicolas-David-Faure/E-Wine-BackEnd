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
      // monto total
      type: S.DECIMAL,
      defaultValue: 0,
    },
    num_cart: {
      type: S.INTEGER,
      defaultValue: 1,
    },
    count: {
      // cantidad de items
      type: S.INTEGER,
      defaultValue: 1,
    },
  },

  { sequelize: db, modelName: "carts" }
);

module.exports = Cart;
