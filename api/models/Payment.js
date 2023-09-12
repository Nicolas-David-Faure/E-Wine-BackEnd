const S = require("sequelize");
const db = require("../db/index");

class Payment extends S.Model {}

Payment.init(
  {
    fullname: {
      type: S.STRING,
    },
    card_number: {
      type: S.BIGINT,
    },
    expire: {
      type: S.STRING,
    },
    cvv: {
      type: S.INTEGER, // codigo de seguridad
    },
    dni: {
      type: S.INTEGER,
    },
  },
  { sequelize: db, modelName: "payments" }
);

module.exports = Payment;
