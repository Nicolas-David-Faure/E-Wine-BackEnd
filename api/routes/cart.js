const express = require("express");
const router = express.Router();

const {
  getAllCarts,
  addCartPrice,
  deleteCart,
  putCart,
} = require("../controllers/cartController");
const { Cart, User, History } = require("../models");

// Ruta para mostrar los productos del carrito
router.get("/:email", getAllCarts);
// Ruta para agregar un producto al carrito
router.post("/:wineId", addCartPrice);
// Ruta para eliminar un producto del carrito
router.delete("/:wineId/:email", deleteCart);
// Ruta para actualizar estado del carrito
router.put("/", putCart);

module.exports = router;
