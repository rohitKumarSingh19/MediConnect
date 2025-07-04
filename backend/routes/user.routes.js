const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUserById,
  getUserProfile
} = require("../controller/user.controller");
const verifyToken = require("../middleware/auth.middleware");
//Routes
router.post("/register", registerUser);
router.post("/login", loginUser);
//Protected Route
router.get('/profile',verifyToken,getUserProfile);
router.get("/:id", getUserById);
module.exports=router;