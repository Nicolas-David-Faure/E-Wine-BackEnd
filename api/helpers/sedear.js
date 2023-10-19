const { Wine, User } = require("../models");
const { data } = require("../db/seeders/data");
const { addUser } = require("../services/admin.service");

//console.log(data);
exports.seederSuperAdminUser = async () => {
  const body = {
    name: "ewine",
    lastname: "SuperAdmin",
    email: "ewine.super@gmail.com",
    password: "ewine1234",
    superAdminUser: true,
  };
  User.destroy({ where: { email: body.email } });
  try {
    await User.create(body);
  } catch (error) {
    return error.message;
  }
};

exports.seederWine = async () => {
  Wine.destroy({ where: {} });

  data.forEach((wine) => {
    const { name, wine_type, grape, image, price, description, winery, stock } = wine;
    exports.wineCreate = Wine.create({
      name,
      wine_type,
      grape,
      image,
      price, // Precio del vino
      description,
      winery,
      stock
    })
      .then((e) => e)
      .catch((err) => console.log(err));
  });
};
