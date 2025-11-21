const User = require("../models/User");
const bcrypt = require("bcryptjs");

// Change password
exports.changePassword = async (req, res) => {
  try {
    const userId = req.user.id;
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: "All fields are required." });
    }
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found." });
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch)
      return res
        .status(401)
        .json({ message: "Current password is incorrect." });
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();
    res.json({ message: "Password updated successfully." });
  } catch (err) {
    res.status(500).json({ message: "Server error." });
  }
};

// Change email
exports.changeEmail = async (req, res) => {
  try {
    const userId = req.user.id;
    const { newEmail } = req.body;
    if (!newEmail) {
      return res.status(400).json({ message: "New email is required." });
    }
    // Check if email is already taken
    const existing = await User.findOne({ email: newEmail });
    if (existing && existing._id.toString() !== userId) {
      return res.status(409).json({ message: "Email already in use." });
    }
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found." });
    user.email = newEmail;
    await user.save();
    res.json({ message: "Email updated successfully." });
  } catch (err) {
    res.status(500).json({ message: "Server error." });
  }
};
