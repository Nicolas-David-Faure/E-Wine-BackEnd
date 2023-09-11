const { User } = require("../models");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send("Error al obtener los usuarios");
  }
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  try {
    const userUpdate = await User.findByPk(id);
    await userUpdate.update(req.body);
    res.status(200).send(userUpdate);
  } catch (error) {
    res.status(400).send("Error al intentar modificar el usuario"); //ver mensaje;
  }
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await User.destroy({ where: { id } });
    res.status(200).send("Usuario eliminado");
  } catch (error) {
    res.status(400).send("Error al intentar eliminar el usuario"); //ver mensaje;
  }
};

exports.addUser = async (req, res) => {
  try {
    User.create(req.body);
    res.sendStatus(201);
  } catch (error) {
    res.status(400).send("Error en la creacion del usuario"); //ver mensaje;
  }
};
