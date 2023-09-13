const {
  getAllCarts,
  getCartsAll,
  PostCartCreatedUpDown,
  DeleteCart,
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
