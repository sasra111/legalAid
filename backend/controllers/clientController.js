const User = require("../models/User");
const bcrypt = require("bcryptjs");

// Get all clients (for lawyer)
exports.getClients = async (req, res) => {
  try {
    const clients = await User.find(
      { role: "client" },
      "_id name email status"
    );
    res.json({ clients });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
// Edit a client (name, email, status)
exports.editClient = async (req, res) => {
  const { id } = req.params;
  const { name, email, status } = req.body;
  try {
    const client = await User.findOneAndUpdate(
      { _id: id, role: "client" },
      { $set: { name, email, status } },
      { new: true, runValidators: true }
    );
    if (!client) return res.status(404).json({ message: "Client not found" });
    res.json({
      client: {
        _id: client._id,
        name: client.name,
        email: client.email,
        status: client.status,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Delete a client
exports.deleteClient = async (req, res) => {
  const { id } = req.params;
  try {
    const client = await User.findOneAndDelete({ _id: id, role: "client" });
    if (!client) return res.status(404).json({ message: "Client not found" });
    res.json({ message: "Client deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Hold/Unhold a client (set status)
exports.holdClient = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body; // should be "hold" or "active"
  if (!["hold", "active"].includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }
  try {
    const client = await User.findOneAndUpdate(
      { _id: id, role: "client" },
      { $set: { status } },
      { new: true }
    );
    if (!client) return res.status(404).json({ message: "Client not found" });
    res.json({
      client: {
        _id: client._id,
        name: client.name,
        email: client.email,
        status: client.status,
      },
    });
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
