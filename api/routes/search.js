const express = require("express");
const router = express.Router();
const { searchWines } = require("../controllers/searchController");

router.get("/", searchWines);

module.exports = router;
