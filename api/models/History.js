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
    //info del vino
    name: {
      type: S.STRING,
      allowNull: false,
    },
    wine_type: {
      type: S.STRING,
      allowNull: false,
    },
    grape: {
      type: S.STRING,
      allowNull: false,
    },
    image: {
      type: S.STRING,
      allowNull: false, // aca despues ponemos una foto cualquiera
    },
    price: {
      //esto es un decimal
      type: S.INTEGER,
      allowNull: false,
    },
    description: {
      type: S.TEXT,
      allowNull: false,
    },
    winery: {
      type: S.STRING,
      allowNull: false,
    },
  },
  { sequelize: db, modelName: "history" }
);

module.exports = History;
