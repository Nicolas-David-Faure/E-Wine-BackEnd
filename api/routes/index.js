const express = require("express");
const router = express.Router();

const winesAdmRoute = require("./winesAdm");
const adminUser = require("./AdminUser");
const user = require("./User");

router.use("/admin", adminUser);
router.use("/user", user);
router.use("/wines", winesAdmRoute);


module.exports = router;
