const express = require("express");
const router = express.Router();

const {
  getAddress,
  postAddress,
  getPayment,
  postPayment,
  deleteAddress,
  deletePayment,
} = require("../controllers/checkoutController");

router.get("/address/:email", getAddress);

router.post("/address/:email", postAddress);
router.delete("/address/:id", deleteAddress);

router.get("/payment/:email", getPayment);

router.post("/payment/:email", postPayment);
router.delete("/payment/:id", deletePayment);
module.exports = router;
