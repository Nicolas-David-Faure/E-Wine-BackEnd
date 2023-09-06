const express = require("express");
const router = express.Router();
const { checkEmail } = require("../middleware/checkDuplicateEmail");
const {
  getAllUsers,
  updateUser,
  deleteUser,
  addUser,
} = require("../controllers/adminController");

router.get("/", getAllUsers);

router.put("/:id", updateUser);

router.delete("/:id", deleteUser);

router.post("/add", [checkEmail], addUser);
module.exports = router;
