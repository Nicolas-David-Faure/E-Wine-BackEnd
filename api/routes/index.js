const express = require("express");
const router = express.Router();

const winesAdmRoute = require("./winesAdm");
const adminUser = require("./AdminUser");
const user = require("./User");
const cart = require("./cart");
const checkout = require("./checkout");
const history = require("./history");

router.use("/admin", adminUser);
router.use("/user", user);
router.use("/wines", winesAdmRoute);
router.use("/cart", cart);
router.use("/checkout", checkout);
router.use("/history", history);

module.exports = router;
