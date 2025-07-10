const User = require("../models/User");
const bcrypt = require("bcryptjs");

// Get all clients (for lawyer)
exports.getClients = async (req, res) => {
  try {
    const clients = await User.find({ role: "client" }, "_id name email");
    res.json({ clients });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Add a new client (for lawyer)
exports.addClient = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "Client already exists" });
    const hashedPassword = await bcrypt.hash(password, 10);
    user = new User({ name, email, password: hashedPassword, role: "client" });
    await user.save();
    res
      .status(201)
      .json({ client: { _id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
