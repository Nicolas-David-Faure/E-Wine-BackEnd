const { User } = require("../models");
const tokens = require("../config/tokens");
const { validateUser } = require("../middleware/auth");

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email } });
  if (!user) return res.status(401).send("Email no registrado");
  const isValid = await user.validatePassword(password);
  if (!isValid) return res.status(401).send("Contraseña incorrecta");

  const { name, lastname } = user;
  const payload = { email, name, lastname };
  const token = tokens.generateToken(payload);

  res.cookie("token", token);
 
  res.send(payload);
};
exports.persistence = async (req, res) => {
  res.send(req.user);
};
exports.logout = async (req, res) => {
  res.clearCookie("token");
  res.sendStatus(204);
};
