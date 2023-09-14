const { User, History, Wine } = require("../models");

async function getHistoryByUser(req) {
  const { email } = req.params;

  const user = await User.findOne({ where: { email } });
  if (!user) throw new Error("Usuario no encontrado");
  const histories = await History.findAll({ where: { userId: user.id } });
  //console.log(histories);
  const historyWines = await Promise.all(
    histories.map(async (history) => {
      const {
        amount,
        count,
        num_cart,
        name,
        wine_type,
        grape,
        image,
        price,
        description,
        winery,
      } = history;
      const obj = {
        name,
        wine_type,
        grape,
        image,
        price,
        description,
        winery,
        amount,
        count,
        num_cart,
      };

      return obj;
    })
  );
  return historyWines;
}

module.exports = { getHistoryByUser };
