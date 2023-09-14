const { searchWinesByName } = require("../services/search.service");

exports.searchWines = async (req, res) => {
  try {
    const { query } = req.query;
    const wines = await searchWinesByName(query);
    res.status(200).send(wines);
  } catch (error) {
    switch (error.message) {
      case "No se encontraron vinos que coincidan con los parámetros de búsqueda":
        res.status(404).send(error.message);
        break;
      case "Error en la busqueda":
        res.status(404).send(error.message);
        break;
      default:
        res.sendStatus(500);
        break;
    }
  }
};
