const User = require("../models/user.model");

const checkRole = (role) => async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    console.log("💡 Role check for:", user?.email, "Role:", user?.role);
    if (!user || user.role !== role) {
      return res.status(403).json({ message: "Access denied" });
    }
    next();
  } catch (error) {
    res.status(500).json({ message: "Role check failed" });
  }
};

module.exports = checkRole;
