const sendEmail = require("../helpers/sendEmail");
const { User, Cart, History, Wine } = require("../models");

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
async function PutCartMoveHistory(req) {
  const { email } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user) throw new Error("No se encontro usuario"); //return res.status(404).send("No se encontro usuario");
  const carrito = await Cart.findAll({
    where: { userId: user.id, state: false },
  });
  if (!carrito) throw new Error("No se encontro producto del carrito"); //return res.status(404).send("No se encontro producto del carrito");
  carrito.forEach(async (cart) => {
    const cartUpdate = await cart.update({ state: true });
    if (!cartUpdate) throw new Error("No se pudo realizar el put"); //return res.status(404).send("No hay actualizacion");

    const { state, amount, num_cart, count, userId, wineId } = cartUpdate;
    const { name, wine_type, grape, image, price, description, winery } =
      await Wine.findByPk(wineId);

    const createHistory = await History.create({
      state,
      amount,
      num_cart,
      count,
      userId,
      wineId,
      name,
      wine_type,
      grape,
      image,
      price,
      description,
      winery,
    });

    if (!createHistory) throw new Error("No se creo historial de carrito"); //return res.status(401).send("No se creo historial de carrito");
    const destroyCart = await Cart.destroy({
      where: {
        userId,
        wineId,
        num_cart,
      },
    });
    if (destroyCart != 1) throw new Error("No se elimino el carrito"); //return res.status(400).send("No elimino nada");
  });
  let final_amount = 0;
  let correo = "";
  let name_user = "";

  const info = await Promise.all(
    carrito.map(async (cart) => {
      const { name } = await cart.getWine();
      const user_data = await cart.getUser();
      correo = user_data.email;
      name_user = user_data.name;

      const { count, amount } = cart;
      final_amount += Number(amount);
      return `
      <li>Producto: ${name}</li>
      <li>Cantidad: ${count}</li>
      <li>Precio: $${amount}</li>
      <hr/>
      `;
    })
  );
  info.push(`<li>Total: $${final_amount}</li>`);

  const body_email = info.join("\n").replace(",", "\n");

  sendEmail(body_email, name_user, correo);

  return carrito;
}

async function PostCartCreatedUpDown(req) {
  const { wineId } = req.params;
  const { email, price, operation = true } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user) throw new Error("Error al obtener el usuario");
  const carts = await History.findAll({
    where: {
      userId: user.id,
      state: true,
    },
  });
  if (!carts) throw new Error("Error al obtener el historial");
  //console.log(carts);
  const sort = carts.sort((a, b) => a.num_cart - b.num_cart);
  const num_cart = carts.length == 0 ? 1 : sort[sort.length - 1].num_cart + 1;
  console.log(num_cart);

  const usuario = await Cart.findOrCreate({
    where: {
      userId: user.id,
      wineId: wineId,
    },
    defaults: {
      amount: price,
      num_cart,
    },
  });
  if (!usuario) throw new Error("Error al buscar o crear un nuevo carrito"); //return res.sendStatus(400);

  const [page, status] = usuario;
  if (!status) {
    if (operation) {
      const task = await page.increment({
        count: 1,
        amount: price,
      });
      if (!task) throw new Error("No va a incrementar, error");
      return "increment";
    } else {
      if (page.count > 1) {
        const task = await page.decrement({
          count: 1,
          amount: price,
        });
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
  PutCartMoveHistory,
};
