const User = require('../models/user.model');
const DoctorProfile = require('../models/doctor.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// REGISTER a new user (User or Doctor)
exports.registerUser = async (req, res) => {
  const { name, email, password, role, address, contact } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      address,
      contact
    });

    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// LOGIN
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ message: "User not found" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id,role:user.role }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({ message: "Login successful", token, user });
    
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// GET user by ID
exports.getUserById = async (req, res) => {
  try {
    // const user = await User.findById(req.params.id);
    const user = await User.findById(req.user.id);
    if (!user)
      return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.getUserProfile = async (req, res) => {
  try {
     //console.log("🔍 Incoming decoded user object:", req.user); //
    const user = await User.findById(req.user.id); // `req.user` comes from decoded JWT
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
