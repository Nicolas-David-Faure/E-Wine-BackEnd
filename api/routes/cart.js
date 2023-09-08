const express = require("express");
const router = express.Router();

const {
  getAllCarts,
  addCartPrice,
  deleteCart,
} = require("../controllers/cartController");

// Ruta para mostrar los productos del carrito
router.get("/", getAllCarts);
// Ruta para agregar un producto al carrito
router.post("/:wineId", addCartPrice);
// Ruta para eliminar un producto del carrito
router.delete("/:wineId", deleteCart);

module.exports = router;
