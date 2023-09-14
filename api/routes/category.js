const express = require("express");
const {
  categoryWines,
  categoryNames,
} = require("../controllers/categoryController");
const { Wine } = require("../models");
const router = express.Router();

router.get("/:query/:option", categoryWines);
router.get("/all", categoryNames);

module.exports = router;
