const { User } = require("../models");

async function getAllUsers() {
  const users = await User.findAll();
  if (!users) throw new Error("Error al obtener los usuarios");
  return users;
}

async function updateUser(id, userData) {
  const user = await User.findByPk(id);
  if (!user) throw new Error("Usuario no encontrado");

  const updatedUser = await user.update(userData);
  if (!updatedUser) throw new Error("Error al modificar el usuario");

  return updatedUser;
}

async function deleteUser(userId) {
  const deletedUser = await User.destroy({ where: { id: userId } });
  console.log(deletedUser);
  if (deletedUser != 1)
    throw new Error("Error al intentar eliminar el usuario");
  return "Usuario eliminado";
}

async function addUser(userData) {
  const newUser = await User.create(userData);
  if (!newUser) throw new Error("Error en la creación del usuario");
  return newUser;
}

module.exports = { getAllUsers, updateUser, deleteUser, addUser };
