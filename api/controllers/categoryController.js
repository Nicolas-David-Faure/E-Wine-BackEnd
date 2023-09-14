const {
  getWinesByFilter,
  getCategoryByName,
} = require("../services/category.service");

exports.categoryWines = async (req, res) => {
  try {
    const { query, option } = req.params;
    const wines = await getWinesByFilter(query, option);
    res.status(200).send(wines);
  } catch (error) {
    switch (error.message) {
      case "No se encontraron vinos que coincidan con los parámetros de búsqueda":
        res.status(404).send(error.message);
        break;
      case "Error al buscar por categoria":
        res.status(404).send(error.message);
        break;
      default:
        res.sendStatus(500);
        break;
    }
  }
};

exports.categoryNames = async (req, res) => {
  try {
    const filter = await getCategoryByName();
    res.status(200).send(filter);
  } catch (error) {
    switch (error.message) {
      case "No se encontraron vinos que coincidan con los parámetros de búsqueda":
        res.status(404).send(error.message);
        break;
      case "Error al obtener categoria":
        res.status(404).send(error.message);
        break;
      case "Categoria no encontrada":
        res.status(404).send(error.message);
        break;
      default:
        res.sendStatus(500);
        break;
    }
  }
};
