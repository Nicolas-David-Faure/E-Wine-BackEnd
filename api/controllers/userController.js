const { validateUser } = require("../middleware/auth");

const { loginUser } = require("../services/user.service");

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await loginUser(email, password);
    res.cookie("token", result.token);
    res.send(result.user);
  } catch (error) {
    switch (error.message) {
      case "Email no registrado":
        res.status(401).send(error.message);
        break;
      case "Contraseña incorrecta":
        res.status(401).send(error.message);
        break;
      default:
        res.sendStatus(500);
        break;
    }
  }
};

exports.persistence = async (req, res) => {
  res.send(req.user);
};

exports.logout = async (req, res) => {
  res.clearCookie("token");
  res.sendStatus(204);
};
