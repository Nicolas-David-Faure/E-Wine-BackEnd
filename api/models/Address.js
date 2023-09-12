const S = require("sequelize");
const db = require("../db/index");

class Address extends S.Model {}

Address.init(
  {
    address: {
      type: S.STRING,
      allowNull: false,
    },
    addressNum: {
      type: S.INTEGER,
      allowNull: false,
    },
    apartment: {
      type: S.STRING,
      allowNull: true,
    },
    postal_code: {
      type: S.INTEGER,
      allowNull: false,
    },
    city: {
      type: S.STRING,
      allowNull: false,
    },
    province: {
      type: S.STRING,
      allowNull: false,
    },
    more_data: { // por ejemplo si quiere detallar algo extra
      type: S.TEXT,
      allowNull: true,
    },
  },
  { sequelize: db, modelName: "address" }
);

module.exports = Address;
