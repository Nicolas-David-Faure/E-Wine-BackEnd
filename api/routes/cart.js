const express = require("express");
const router = express.Router();

const {
  getAllCarts,
  addCartPrice,
  deleteCart,
} = require("../controllers/cartController");
const { Cart, User } = require("../models");

// Ruta para mostrar los productos del carrito
router.get("/:email", getAllCarts);
// Ruta para agregar un producto al carrito
router.post("/:wineId", addCartPrice);
// Ruta para eliminar un producto del carrito
router.delete("/:wineId/:email", deleteCart);
// Ruta para actualizar estado del carrito
router.put("/:wineId", async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ where: { email } });

  const carrito = await Cart.findAll({
    where: { userId: user.id, state: false },
  });
  carrito.forEach(async (cart) => {
    await cart.update({ state: true });
  });
  console.log(carrito);

  res.send(carrito);
});

module.exports = router;
