const {
  getAllUsers,
  updateUser,
  deleteUser,
  addUser,
} = require("../services/admin.service");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await getAllUsers();
    res.status(200).send(users);
  } catch (error) {
    switch (error.message) {
      case "Error al obtener los usuarios":
        res.status(404).send(error.message);
        break;
      default:
        res.sendStatus(500);
        break;
    }
  }
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const userData = req.body;
  try {
    const userUpdate = await updateUser(id, userData);
    res.status(200).send(userUpdate);
  } catch (error) {
    switch (error.message) {
      case "Usuario no encontrado":
        res.status(404).send(error.message);
        break;
      case "Error al modificar el usuario":
        res.status(400).send(error.message);
        break;
      default:
        res.sendStatus(500);
        break;
    }
  }
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await deleteUser(id);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.addUser = async (req, res) => {
  try {
    const newUser = await addUser(req.body);
    res.status(201).send(newUser);
  } catch (error) {
    switch (error.message) {
      case "Error en la creación del usuario":
        res.status(400).send(error.message);
        break;
      default:
        res.sendStatus(500);
        break;
    }
  }
};
