const DoctorProfile = require('../models/doctor.model');
// Create or update doctor profile
exports.createOrUpdateProfile = async (req, res) => {
  const { speciality, fee, clinicAddress, emergencyContact, availableSlots } = req.body;
  const userId = req.user.id;
  try {
    let profile = await DoctorProfile.findOne({ user: userId });

    if (profile) {
      // Update
      profile.speciality = speciality;
      profile.fee = fee;
      profile.clinicAddress = clinicAddress;
      profile.emergencyContact = emergencyContact;
      profile.availableSlots = availableSlots;
      await profile.save();
      return res.status(200).json({ message: "Profile updated", profile });
    }

    // Create
    profile = await DoctorProfile.create({
      user: userId,
      speciality,
      fee,
      clinicAddress,
      emergencyContact,
      availableSlots,
    });

    res.status(201).json({ message: "Profile created", profile });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get logged-in doctor’s profile
exports.getMyDoctorProfile = async (req, res) => {
  try {
    const profile = await DoctorProfile.findOne({ user: req.user.id }).populate("user", "name email");
    if (!profile) return res.status(404).json({ message: "Profile not found" });

    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all doctors
exports.getAllDoctors = async (req, res) => {
  try {
    const doctors = await DoctorProfile.find().populate("user", "name email");
    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a new available time slot
exports.addSlot = async (req, res) => {
  // console.log("📥 Slot request body:", req.body);
  // console.log("👤 Doctor user ID from token:", req.user?.id);
  const { start, end } = req.body;
  try {
    const doctor = await DoctorProfile.findOne({ user: req.user.id });
    if (!doctor) return res.status(404).json({ message: "Doctor profile not found" });
     console.log("❌ Doctor not found for user:", req.user.id);
    doctor.availableSlots.push({ start:req.body.start, end:req.body.end });
    await doctor.save();
      console.log("✅ Slot added successfully");
    res.status(200).json({ message: "Slot added", slots: doctor.availableSlots });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Book an appointment slot (by user)
exports.bookSlot = async (req, res) => {
  const { doctorId, slotId } = req.body;
  try {
    const doctor = await DoctorProfile.findById(doctorId);
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });

    const slot = doctor.availableSlots.id(slotId);
    if (!slot) return res.status(404).json({ message: "Slot not found" });
    if (slot.isBooked) return res.status(400).json({ message: "Slot already booked" });

    slot.isBooked = true;
    await doctor.save();

    res.status(200).json({ message: "Appointment booked successfully", slot });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.getDoctorSlots = async (req, res) => {
  try {
    const doctor = await DoctorProfile.findOne({ user: req.user.id });
    if (!doctor) return res.status(404).json({ message: "Profile not found" });

    const now = new Date();
    const upcoming = doctor.availableSlots.filter(slot => new Date(slot.start) > now);
    const past = doctor.availableSlots.filter(slot => new Date(slot.end) <= now);

    res.status(200).json({ upcoming, past });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

