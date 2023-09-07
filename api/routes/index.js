const express = require("express");
const router = express.Router();

const winesAdmRoute = require("./winesAdm");
const adminUser = require("./AdminUser");
const user = require("./User");
const cart = require("./cart");

router.use("/admin", adminUser);
router.use("/user", user);
router.use("/wines", winesAdmRoute);
router.use("/cart", cart);

module.exports = router;
