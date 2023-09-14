const { Cart, History, User } = require("../models");
const {
  getAllCarts,
  getCartsAll,
  PostCartCreatedUpDown,
  DeleteCart,
  PutCartMoveHistory,
} = require("../services/cart.service");

exports.getAllCarts = async (req, res) => {
  try {
    const carrito = await getAllCarts(req);
    const carts = await getCartsAll(carrito);
    res.status(200).send(carts);
  } catch (error) {
    switch (error.message) {
      case "Email not found":
        res.status(400).send(error.message);
        break;
      case "Error al obtener detalles de los items":
        res.status(404).send(error.message);
        break;
      default:
        res.status(500).send("Internal server error");
        break;
    }
  }
};

exports.addCartPrice = async (req, res) => {
  try {
    const usuario = await PostCartCreatedUpDown(req);
    switch (usuario) {
      case "increment":
        res.status(201).send("Product added and price increased");
        break;
      case "decrement":
        res.status(201).send("Product removed and price reduction");
        break;
      case "created":
        res.status(200).send("Created");
        break;
      default:
        res.status(500).send("Internal server error");
        break;
    }
  } catch (error) {
    switch (error.message) {
      case "Error al obtener el usuario":
        res.status(404).send(error.message);
        break;
      case "Error al buscar o crear un nuevo carrito":
        res.status(400).send(error.message);
        break;
      case "No va a incrementar, error":
        res.status(400).send(error.message);
        break;
      case "No va a decrementar, error":
        res.status(400).send(error.message);
        break;
      case "No va a decrementar, count igual a 0":
        res.status(400).send(error.message);
        break;
      default:
        res.status(500).send("Internal server error");
        break;
    }
  }
};
exports.putCart = async (req, res) => {
  try {
    const cart = await PutCartMoveHistory(req);
    res.send(cart);
  } catch (error) {
    switch (error.message) {
      case "No se encontro usuario":
        res.status(404).send(error.message);
        break;
      case "No se encontro producto del carrito":
        res.status(404).send(error.message);
        break;
      case "No se pudo realizar el put":
        res.status(404).send(error.message);
        break;
      case "No se creo historial de carrito":
        res.status(404).send(error.message);
        break;
      case "No se elimino el carrito":
        res.status(404).send(error.message);
        break;
      default:
        res.status(500).send("Internal server error");
        break;
    }
  }

  /* const { email } = req.body;
  const user = await User.findOne({ where: { email } });

  if (!user) return res.status(404).send("No se encontro usuario");

  const carrito = await Cart.findAll({
    where: { userId: user.id, state: false },
  });

  if (!carrito)
    return res.status(404).send("No se encontro producto del carrito");

  carrito.forEach(async (cart) => {
    const cartUpdate = await cart.update({ state: true });
    if (!cartUpdate) return res.status(404).send("No hay actualizacion");

    const { state, amount, num_cart, count, userId, wineId } = cartUpdate;
    const createHistory = await History.create({
      state,
      amount,
      num_cart,
      count,
      userId,
      wineId,
    });

    if (!createHistory)
      return res.status(401).send("No se creo historial de carrito");
    const destroyCart = await Cart.destroy({
      where: {
        userId,
        wineId,
        num_cart,
      },
    });
    if (destroyCart != 1) return res.status(400).send("No elimino nada");
  });

  res.send(carrito); */
};
exports.deleteCart = async (req, res) => {
  try {
    const action = await DeleteCart(req);
    if (action) res.status(200).send("Cart deleted");
  } catch (error) {
    switch (error.message) {
      case "Mail not found":
        res.status(401).send(error.message);
        break;
      case "There is no elimination":
        res.status(405).send(error.message);
        break;
      default:
        res.status(500).send("Internal server error");
        break;
    }
  }
};
