const { searchWinesByName } = require("../services/search.service");

exports.searchWines = async (req, res) => {
  try {
    const { query } = req.query;
    const wines = await searchWinesByName(query);
    if (wines.length === 0) {
      return res
        .status(404)
        .send(
          "No se encontraron vinos que coincidan con los parámetros de búsqueda"
        );
    }
    res.status(200).send(wines);
  } catch (error) {
    switch (error.message) {
      case "Error al buscar vinos":
        res.status(404).send(error.message);
        break;
      default:
        res.sendStatus(500);
        break;
    }
  }
};
