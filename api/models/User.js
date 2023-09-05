const S = require("sequelize");
const db = require("../db/index");

class User extends S.Model {}

User.init(
  {
    name: {
      type: S.STRING,
      allowNull: false,
    },
    lastname: {
      type: S.STRING,
      allowNull: false,
    },
    email: {
      type: S.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: S.STRING,
      allowNull: false,
    },
    salt: {
      type: S.STRING,
    },
    adminUser: {
      type: S.BOOLEAN,
    },
  },
  { sequelize: db, modelName: "users" }
);

module.exports = User;
