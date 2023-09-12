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
      // monto total
      type: S.INTEGER,
      allowNull: false,
    },
    depto_piso: {
      type: S.STRING,
      allowNull: false,
    },
    postal_code: {
      type: S.INTEGER,
      allowNull: false,
    },
    localidad: {
      type: S.STRING,
      allowNull: false,
    },
    provincia: {
      type: S.STRING,
      allowNull: false,
    },
    info_adicional: {
      type: S.TEXT,
      allowNull: false,
    },
  },
  { sequelize: db, modelName: "address" }
);

module.exports = Address;
