const { Wine } = require("../models");
const { Op } = require("sequelize");

async function searchWinesByName(query) {
  const wines = await Wine.findAll({
    where: {
      name: {
        [Op.iLike]: `%${query}%`,
      },
    },
  });
  if (wines.length === 0)
    throw new Error(
      "No se encontraron vinos que coincidan con los parámetros de búsqueda"
    );

  if (!wines) throw new Error("Error en la busqueda");

  return wines;
}

module.exports = { searchWinesByName };
