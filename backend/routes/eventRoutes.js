const express = require("express");
const router = express.Router();
const eventController = require("../controllers/eventController");
const auth = require("../middleware/auth");

// Only lawyers can create, view, update, and delete their events
router.post("/", auth(["lawyer", "admin"]), eventController.createEvent);
router.get("/", auth(["lawyer", "admin"]), eventController.getEvents);
router.put("/:id", auth(["lawyer", "admin"]), eventController.updateEvent);
router.delete("/:id", auth(["lawyer", "admin"]), eventController.deleteEvent);

module.exports = router;
