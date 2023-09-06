const express = require("express");
const router = express.Router();

const winesAdmRoute = require("./winesAdm");

router.use("/wines", winesAdmRoute);

module.exports = router;
