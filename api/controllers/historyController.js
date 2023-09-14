const { getHistoryByUser } = require("../services/history.service");

exports.getHistory = async (req, res) => {
  try {
    const histories = await getHistoryByUser(req);
    res.status(200).send(histories);
  } catch (error) {
    switch (error.message) {
      case "Usuario no encontrado":
        res.status(404).send(error.message);
        break;
      default:
        res.status(500).send("Internal server error");
        break;
    }
  }
};
