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

// Update an event
exports.updateEvent = async (req, res) => {
  const { title, date, description, clientIds } = req.body;
  const { id } = req.params;
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
    const event = await Event.findOne({ _id: id, createdBy: req.user.userId });
    if (!event) return res.status(404).json({ message: "Event not found" });
    event.title = title;
    event.date = date;
    event.description = description;
    event.clients = clients.map((c) => c._id);
    await event.save();
    await event.populate("clients", "_id name email");
    res.json({ event });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Delete an event
exports.deleteEvent = async (req, res) => {
  const { id } = req.params;
  try {
    const event = await Event.findOneAndDelete({
      _id: id,
      createdBy: req.user.userId,
    });
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.json({ message: "Event deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
