const {
  getAllWines,
  getWineById,
  PostaddWine,
  deleteWineId,
  updateWineId,
} = require("../services/wine.service");

// Obtener todos los vinos
// Esta ruta se puede usar tanto para Administrador como para los usuarios
exports.getAllWines = async (req, res) => {
  try {
    const wines = await getAllWines();
    res.status(200).send(wines);
  } catch (error) {
    switch (error.message) {
      case "There are no wines":
        res.status(401).send(error.message);
        break;
      default:
        res.status(500).send("Internal server error");
        break;
    }
  }
};

// Obtener vino por Id
// Esta ruta se puede usar tanto para Administrador como para los usuarios
exports.getWineById = async (req, res) => {
  //const id = req.params.id;
  try {
    const wines = await getWineById(req);
    res.send(wines);
  } catch (error) {
    switch (error.message) {
      case "There is no such wine":
        res.status(400).send(error.message);
        break;
      default:
        res.status(500).send("Internal server error");
        break;
    }
  }
};

// Agregar un nuevo vino
exports.addWine = async (req, res) => {
  try {
    PostaddWine(req);
    res.sendStatus(201);
  } catch (error) {
    switch (error.message) {
      case "Error creating item":
        res.status(400).send(error.message);
        break;
      default:
        res.status(500).send("Internal server error");
        break;
    }
  }
};

// Eliminar un vino
exports.deleteWine = async (req, res) => {
  try {
    await deleteWineId(req);
    res.sendStatus(200);
  } catch (error) {
    switch (error.message) {
      case "There is no elimination":
        res.status(405).send(error.message);
        break;
      default:
        res.status(500).send("Internal server error");
        break;
    }
  }
};

// Actualizar un vino
exports.updateWine = async (req, res) => {
  try {
    const wine = await updateWineId(req);
    res.status(200).send(wine);
  } catch (error) {
    switch (error.message) {
      case "Wine not found":
        res.status(405).send(error.message);
        break;
      case "Wine not update":
        res.status(405).send(error.message);
        break;
      default:
        res.status(500).send("Internal server error");
        break;
    }
  }
};
