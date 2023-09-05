const S = require("sequelize");
const db = require("../db/index");

class Wine extends S.Model {}

Wine.init(
  {
    name: {
      type: S.STRING,
      allowNull: false,
    },
    wineType: {
      type: S.STRING,
      allowNull: false,
    },
    grape: {
      type: S.STRING,
      defaultValue: "",
    },
    image: {
      type: S.STRING,
      defaultValue: "", // aca despues ponemos una foto cualquiera
    },
    price: {
      type: S.INTEGER,
      allowNull: false,
    },
    description: {
      type: S.TEXT,
      defaultValue: "",
    },
    rating: {
      type: S.DECIMAL, // chequear
      defaultValue: 0,
    },
    winery: {
      type: S.STRING,
      defaultValue: "",
    },
    review: {
      type: S.TEXT,
      defaultValue: "",
    },
  },
  { sequelize: db, modelName: "wines" }
);

module.exports = Wine;
