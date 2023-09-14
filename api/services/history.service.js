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
        dataValues: { id, name, wine_type, grape, image, price, winery },
      } = await Wine.findOne({
        where: { id: history.wineId },
      });
      
      const { amount, count, num_cart , createdAt } = history;

      const fechaHora = new Date(createdAt);

      // Opciones para formatear la fecha y hora en español
      const opciones = {
        year: 'numeric',
        month: 'long', // 'long' para el nombre completo del mes
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: false, // Formato de 24 horas
        timeZoneName: 'short',
        timeZone: 'America/Argentina/Buenos_Aires' // Ajusta la zona horaria según tu necesidad
      };

      // Crea un formateador de fecha y hora en español
      const formateador = new Intl.DateTimeFormat('es-ES', opciones);

      // Formatea la fecha y hora
      const fechaHoraFormateada = formateador.format(fechaHora);

      const obj = {
        id,
        name,
        wine_type,
        grape,
        image,
        price,
        winery,
        amount,
        count,
        num_cart,
        createdAt: fechaHoraFormateada
      };

      return obj;
    })
  );
  return historyWines;
}

module.exports = { getHistoryByUser };
