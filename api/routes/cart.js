const express = require("express");
const router = express.Router();
const { User, Wine, Cart } = require("../models");

// Ruta para agregar un producto al carrito
router.post("/:email/:wineId", async (req, res) => {
  const { email, wineId } = req.params;

  User.findOne({ where: { email } }).then((user) => {
    Cart.findOne({
      where: { userId: user.id, wineId: wineId },
    }).then((wineCart) => {
      if (wineCart) {
        console.log("Hay info");
        wineCart.increment("count", { by: 1 }).then(() => res.sendStatus(200));
      } else {
        console.log("no hay info");
        Wine.findByPk(wineId).then((wine) => {
          Cart.create({
            userId: user.id,
            wineId: wineId,
            amount: wine.price
          }).then(() => res.sendStatus(201));
        });
      }
    });
  });
});

// Ruta para eliminar un producto del carrito

// Ruta para modificar cantidad de producto del carrito

module.exports = router;
