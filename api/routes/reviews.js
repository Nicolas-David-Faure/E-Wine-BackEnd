const express = require("express");
const { Reviews, User, Wine } = require("../models");
const { addReview, getReviews } = require("../controllers/reviewController");
/* const { getHistory } = require("../controllers/historyController"); */
const router = express.Router();

router.get("/:wineId", getReviews);
router.post("/add", addReview);

module.exports = router;
