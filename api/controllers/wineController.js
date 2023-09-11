const { Wine } = require("../models");

// Obtener todos los vinos
// Esta ruta se puede usar tanto para Administrador como para los usuarios
exports.getAllWines = async (req, res) => {
  try {
    const wines = await Wine.findAll();
    res.status(200).send(wines);
  } catch (error) {
    res.status(500).send("Error al obtener vinos"); // Esto modificarlo a ingles despues
  }
};

// Obtener vino por Id
// Esta ruta se puede usar tanto para Administrador como para los usuarios
exports.getWineById = async (req, res) => {
  const id = req.params.id;
  try {
    const wines = await Wine.findByPk(id);
    res.send(wines);
  } catch (error) {
    res.status(500).send("Error al obtener un vino"); // Esto modificarlo a ingles despues
  }
};

// Agregar un nuevo vino
exports.addWine = async (req, res) => {
  try {
    Wine.create(req.body);
    res.send(201);
  } catch (error) {
    res.status(500).send("Error en la creación del item"); // modificar a ingles despues
  }
};

// Eliminar un vino
exports.deleteWine = async (req, res) => {
  const id = req.params.id;
  try {
    Wine.destroy({ where: { id } });
    res.send(200);
  } catch (error) {
    res.status(500).send("Error al eliminar el item"); // modificar a ingles despues
  }
};

// Actualizar un vino
exports.updateWine = async (req, res) => {
  const id = req.params.id;
  try {
    const wineToUpdate = await Wine.findByPk(id);
    await wineToUpdate.update(req.body);
    res.status(200).send(wineToUpdate);
  } catch (error) {
    res.status(500).send("Error al intentar modificar el item"); // modificar a ingles despues
  }
};
