const { User } = require("../models/index");

const checkEmail = async (req, res, next) => {
  try {
    const { email } = req.body;
    const existingEmail = await User.findOne({ where: { email } });

    if (existingEmail) return res.status(400).send("Email repetido");
    next();
  } catch (error) {
    res.sendStatus(500);
  }
};

module.exports = { checkEmail };
