const { Wine } = require("../models");
const { data } = require("../db/seeders/data");

//console.log(data);

exports.seeder = async () => {
  Wine.destroy({ where: {} });

  data.forEach((wine) => {
    const { name, wine_type, grape, image, price, description, winery } = wine;
    exports.wineCreate = Wine.create({
      name,
      wine_type,
      grape,
      image,
      price, // Precio del vino
      description,
      winery,
    })
      .then((e) => e)
      .catch((err) => console.log(err));
  });
};
