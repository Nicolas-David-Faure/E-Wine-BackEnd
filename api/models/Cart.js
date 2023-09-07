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
    count: {
      // cantidad de items
      type: S.INTEGER,
      defaultValue: 1,
    },
  },
  { sequelize: db, modelName: "carts" }
);

Cart.addHook("beforeBulkUpdate", (content) => {
  console.log("ESTOY EN HOOK", content);
  return content.amount + 1000;
});

module.exports = Cart;
