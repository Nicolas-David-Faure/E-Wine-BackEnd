const S = require("sequelize");
const db = require("../db/index");

class Reviews extends S.Model {}

Reviews.init(
  {
    review: {
      type: S.STRING,
    },
    rating: {
      type: S.STRING,
      allowNull: false,
    },
  },
  { sequelize: db, modelName: "review" }
);

module.exports = Reviews;
