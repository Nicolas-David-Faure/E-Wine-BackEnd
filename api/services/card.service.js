const { User, Cart } = require("../models");

async function getAllCarts(req) {
  const { email } = req.params;
  const user = await User.findOne({ where: { email: email } });
  if (!user) throw new Error("Email not found");
  //console.log(user);
  const carrito = await Cart.findAll({
    where: {
      userId: user.id,
    },
  });

  return carrito;
}

async function getCartsAll(results) {
  try {
    //const results = await Cart.findAll();
    const carts = await Promise.all(
      results.map(async (item) => {
        const { ...info } = await item.getWine();
        const {
          dataValues: { id, image, price, winery, wine_type, grape, name },
        } = info;
        const {
          dataValues: { amount, count },
        } = item;
        const infoCart = {
          id,
          date: item.createdAt,
          image,
          price,
          winery,
          wine_type,
          grape,
          amount,
          count,
          name,
        };
        return infoCart;
      })
    );
    //ordenar
    const order_by = carts.sort((a, b) => {
      return a.date - b.date;
    });
    return order_by;
  } catch (error) {
    throw new Error("Error al obtener detalles de los items");
  }
}

async function PostCartCreatedUpDown(req) {
  const { wineId } = req.params;
  const { email, price, operation = true } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user) throw new Error("Error al obtener el usuario");
  const usuario = await Cart.findOrCreate({
    where: {
      userId: user.id,
      wineId: wineId,
    },
    defaults: {
      amount: price,
    },
  });
  if (!usuario) throw new Error("Error al buscar o crear un nuevo carrito"); //return res.sendStatus(400);
  //console.log(usuario);
  const [page, status] = usuario;
  if (!status) {
    if (operation) {
      const task = await page.increment({ count: 1, amount: price });
      if (!task) throw new Error("No va a incrementar, error");
      return "increment";
    } else {
      if (page.count > 1) {
        const task = await page.decrement({ count: 1, amount: price });
        if (!task) throw new Error("No va a decrementar, error");
        return "decrement";
      } else {
        throw new Error("No va a decrementar, count igual a 0");
      }
    }
  } else {
    return "created";
  }
}

async function DeleteCart(req) {
  const { wineId, email } = req.params;
  const user = await User.findOne({ where: { email } });

  if (!user) throw new Error("Mail not found"); //return res.status(401).send("Mail not found");
  const delete_cart = await Cart.destroy({
    where: { userId: user.id, wineId: wineId },
  });
  if (delete_cart != 1) throw new Error("There is no elimination"); //return res.status(405).send("There is no elimination");
  return true;
}

module.exports = {
  getAllCarts,
  getCartsAll,
  PostCartCreatedUpDown,
  DeleteCart,
};
