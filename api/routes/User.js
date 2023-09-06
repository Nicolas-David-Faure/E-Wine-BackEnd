const express = require("express");
const router = express.Router();
const { checkEmail } = require("../middleware/checkDuplicateEmail");
const { updateUser, addUser } = require("../controllers/adminController");

const { validateUser } = require("../middleware/auth");
const {
  loginUser,
  persistence,
  logout,
} = require("../controllers/userController");

router.put("/:id", updateUser);

router.post("/add", [checkEmail], addUser);

router.post("/login", loginUser);

router.get("/me", validateUser, persistence);

router.post("/logout", logout);

module.exports = router;
