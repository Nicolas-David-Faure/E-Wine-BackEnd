const express = require("express");
const router = express.Router();
const {
  getAllWines,
  getWineById,
  addWine,
  deleteWine,
  updateWine,
  getAllWinesTest,
} = require("../controllers/wineController");

router.get("/", getAllWines);
router.get("/page/:key", getAllWinesTest);
router.get("/:id", getWineById);
router.post("/add", addWine);
router.delete("/:id", deleteWine);
router.put("/:id", updateWine);

module.exports = router;
