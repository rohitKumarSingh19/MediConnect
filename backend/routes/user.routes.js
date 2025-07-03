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
router.get("/:id", getUserById);
//Protected Route
router.get('/profile',verifyToken,getUserProfile);
module.exports=router;