const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth.middleware");
const checkRole = require("../middleware/role.middleware");
//const doctorController = require("../controller/doctor.controller");
const authenticate = require("../middleware/auth.middleware");
const {
  createOrUpdateProfile,
  getMyDoctorProfile,
  getAllDoctors,
  addSlot,
  bookSlot,
  getDoctorSlots,
} = require("../controller/doctor.controller");

// Doctor-only routes
router.post(
  "/profile",
  verifyToken,
  checkRole("doctor"),
  createOrUpdateProfile
);
router.get("/my-profile", verifyToken, checkRole("doctor"), getMyDoctorProfile);
router.post("/add-slot", verifyToken, checkRole("doctor"), addSlot);
router.get( "/slots", verifyToken,authenticate,checkRole("doctor"),getDoctorSlots);
// Public/User routes
router.get("/all", getAllDoctors);
router.post("/book", verifyToken, checkRole("user"), bookSlot);

module.exports = router;
