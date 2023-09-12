const { User } = require("../models");

async function getAllUsers() {
  try {
    const users = await User.findAll();
    return users;
  } catch (error) {
    throw new Error("Error al obtener los usuarios");
  }
}

async function updateUser(id, userData) {
  try {
    const userUpdate = await User.findByPk(id);
    if (!userUpdate) {
      throw new Error("Usuario no encontrado");
    }
    await userUpdate.update(userData);
    return userUpdate;
  } catch (error) {
    throw new Error("Error al modificar el usuario");
  }
}

async function deleteUser(userId) {
  try {
    await User.destroy({ where: { id: userId } });
  } catch (error) {
    throw new Error("Error al intentar eliminar el usuario");
  }
}

async function addUser(userData) {
  try {
    await User.create(userData);
  } catch (error) {
    throw new Error("Error en la creación del usuario");
  }
}

module.exports = { getAllUsers, updateUser, deleteUser, addUser };
