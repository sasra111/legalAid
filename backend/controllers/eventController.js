const Event = require("../models/Event");
const User = require("../models/User");

// Create a new event
exports.createEvent = async (req, res) => {
  const { title, date, description, clientIds } = req.body;
  if (!title || !date) {
    return res.status(400).json({ message: "Title and date are required" });
  }
  try {
    // Validate clients
    let clients = [];
    if (Array.isArray(clientIds) && clientIds.length > 0) {
      clients = await User.find({ _id: { $in: clientIds }, role: "client" });
      if (clients.length !== clientIds.length) {
        return res.status(400).json({ message: "Some clients not found" });
      }
    }
    const event = new Event({
      title,
      date,
      description,
      clients: clients.map((c) => c._id),
      createdBy: req.user.userId,
    });
    await event.save();
    await event.populate("clients", "_id name email");
    res.status(201).json({ event });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get all events for the logged-in lawyer
exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find({ createdBy: req.user.userId })
      .populate("clients", "_id name email")
      .sort({ date: 1 });
    res.json({ events });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
