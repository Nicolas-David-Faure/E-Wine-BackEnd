const { Wine } = require("../models");
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
exports.getAllWinesTest = async (req, res) => {
  const { key = "" } = req.params;
  console.log(key);

  const wines = await Wine.findAll();
  if (!wines) return res.status(400).send("No se encontraron vinos");
  if (wines.length == 0) return res.sendStatus(400);
  let num = 0,
    pagination = [],
    obj = {};

  while (wines.length != 0) {
    num++;
    if (num > 20) {
      let data = wines.splice(0, 20);
      pagination.push(data);
      num = 1;
    }
  }
  pagination.forEach((e, i) => (obj[`${i + 1}`] = e));
  const data = obj[key];
  data.push({ total: pagination.length });
  res.send(data);
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
    const wine = await PostaddWine(req);
    res.status(201).send(wine);
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
