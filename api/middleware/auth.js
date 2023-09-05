const { validateToken } = require("../config/tokens");

const validateUser = (req, res, next) => {
  const { token } = req.cookies;
  const data = validateToken(token);
  req.user = data;
  if (data) return next();
  res.sendStatus(401);
};

module.exports = { validateUser };
