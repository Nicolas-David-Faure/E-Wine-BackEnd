const { Wine } = require("../models");
const { Op } = require("sequelize");

async function getWinesByFilter(query, option) {
  const categoryWine = await Wine.findAll({
    where: { [query]: { [Op.iLike]: `%${option}%` } },
  });
  if (categoryWine.length === 0)
    throw new Error(
      "No se encontraron vinos que coincidan con los parámetros de búsqueda"
    );
  if (!categoryWine) throw new Error("Error al buscar por categoria");
  return categoryWine;
}

async function getCategoryByName() {
  const wines = await Wine.findAll();
  if (!wines) throw new Error("Error al obtener categoria");
  if (wines.length === 0)
    throw new Error(
      "No se encontraron vinos que coincidan con los parámetros de búsqueda"
    );

  const categories = {};
  const categoriesArr = ["winery", "wine_type", "grape"];

  categoriesArr.forEach((element) => {
    const category = wines.map((wine) => wine[element]);
    const allCategory = category.filter((a, b, c) => c.indexOf(a) === b);
    categories[element] = allCategory;
  });

  return categories;
}

module.exports = { getWinesByFilter, getCategoryByName };
