const { User } = require("../models");
const tokens = require("../config/tokens");

async function loginUser(email, password, adminUser, superAdminUser) {
  const user = await User.findOne({ where: { email } });
  if (!user) throw new Error("Email no registrado");

  const isValid = await user.validatePassword(password);
  if (!isValid) throw new Error("Contraseña incorrecta");

  const { name, lastname } = user;
  const payload = { email, name, lastname, adminUser, superAdminUser };
  const token = tokens.generateToken(payload);

  return { token, user: payload };
}

module.exports = { loginUser };
