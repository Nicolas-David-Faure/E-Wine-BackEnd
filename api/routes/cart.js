const express = require("express");
const router = express.Router();
const { User, Wine, Cart } = require("../models");


// Ruta para agregar un producto al carrito
router.post("/:email/:wineId", async (req, res) => {
  const { email, wineId } = req.params;

  const user = await User.findOne({ where: { email } });
  const wine = await Wine.findByPk(wineId);

  try {
    // Crear un nuevo registro en el carrito o incrementar si ya existe
    await Cart.create({
      userId: user.id,
      wineId: wineId,
      amount: wine.price, // Establece el precio inicial
    });
    return res.status(201).send("Producto agregado al carrito.");
  } catch (error) {
    return res
      .status(400)
      .send("Producto ya existe en el carrito y se ha incrementado en 1.");
  }
});

// Ruta para eliminar un producto del carrito
router.delete("/:email/:wineId", async (req, res) => {
  const { email, wineId } = req.params;
  const user = await User.findOne({ where: { email } });
  const wine = await Wine.findByPk(wineId);
  const wineCart = await Cart.destroy({
    where: { userId: user.id, wineId: wineId },
  }).then(() => res.sendStatus(200));
});

// Ruta para modificar incrementando la cantidad de producto del carrito
router.put("/increment/:email/:wineId", async (req, res) => {
  const { email, wineId } = req.params;
  const user = await User.findOne({ where: { email } });
  const wineCart = await Cart.findOne({
    where: { userId: user.id, wineId: wineId },
  });

  if (wineCart) {
    await wineCart.incrementCount();
    return res.status(200).send(wineCart);
  }
});

// Ruta para modificar decrementando la cantidad de producto del carrito
router.put("/decrement/:email/:wineId", async (req, res) => {
  const { email, wineId } = req.params;
  const user = await User.findOne({ where: { email } });
  const wineCart = await Cart.findOne({
    where: { userId: user.id, wineId: wineId },
  });

  if (wineCart) {
    await wineCart.decrementCount();
    return res.status(200).send(wineCart);
  }
});

module.exports = router;
