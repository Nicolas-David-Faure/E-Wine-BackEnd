const express = require("express");
const { History, User } = require("../models");
const { getHistory } = require("../controllers/historyController");
const router = express.Router();

router.get("/:email", getHistory);

module.exports = router;
