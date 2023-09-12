const express = require("express");
const router = express.Router();
const { User, Address, Payment } = require("../models");
const { findOne } = require("../models/User");

router.get("/address/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      res.status(404).send("Usuario no encontrado");
    }

    const allAddress = await Address.findAll({ where: { userId: user.id } });
    res.status(200).send(allAddress);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.post("/address/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const address = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      res.status(404).send("Usuario no encontrado");
    }

    const createAddress = await Address.create(address);
    if (!createAddress) {
      res.status(400).send("Error al crear Address");
    }

    const userAddress = await createAddress.setUser(user);
    if (!userAddress) {
      res.status(400).send("Error al establecer relacion");
    }

    res.status(201).send(userAddress);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get("/payment/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      res.status(404).send("Usuario no encontrado");
    }

    const allPayments = await Payment.findAll({ where: { userId: user.id } });
    res.status(200).send(allPayments);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.post("/payment/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const payment = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      res.status(404).send("Usuario no encontrado");
    }

    const createPayment = await Payment.create(payment);
    if (!createPayment) {
      res.status(400).send("Error al crear payment");
    }

    const userPayment = await createPayment.setUser(user);
    if (!userPayment) {
      res.status(400).send("Error al establecer relacion");
    }
    res.status(201).send(userPayment);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
