const express = require("express");
const router = express.Router();
const wineController = require("../controllers/wineController");

router.get("/", wineController.getAllWines);
router.get("/:id", wineController.getWineById);
router.post("/add", wineController.addWine);
router.delete("/:id", wineController.deleteWine);
router.put("/:id", wineController.updateWine);

module.exports = router;
