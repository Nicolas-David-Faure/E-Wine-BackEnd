const S = require("sequelize");
const db = require("../db/index");

class Wine extends S.Model {}

Wine.init(
  {
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
    rating: {
      type: S.DECIMAL, // chequear
    },
    winery: {
      type: S.STRING,
      allowNull: false,
    },
    review: {
      //esto es un array
      type: S.TEXT,
    },
  },
  { sequelize: db, modelName: "wines" }
);

module.exports = Wine;
