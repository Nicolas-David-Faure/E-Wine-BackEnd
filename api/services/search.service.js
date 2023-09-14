const { Wine } = require("../models");
const { Op } = require("sequelize");

async function searchWinesByName(query) {
  try {
    const wines = await Wine.findAll({
      where: {
        name: {
          [Op.iLike]: `%${query}%`,
        },
      },
    });
    return wines;
  } catch (error) {
    throw new Error("Error al buscar vinos.");
  }
}

module.exports = { searchWinesByName };
