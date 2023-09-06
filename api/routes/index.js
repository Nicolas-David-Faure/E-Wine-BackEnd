const express = require("express");
const router = express.Router();

const adminUser = require("./AdminUser");
const user = require("./User");

router.use("/admin", adminUser);
router.use("/user", user);

module.exports = router;
