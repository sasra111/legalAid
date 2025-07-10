const express = require("express");
const router = express.Router();
const eventController = require("../controllers/eventController");
const auth = require("../middleware/auth");

// Only lawyers can create and view their events
router.post("/", auth(["lawyer", "admin"]), eventController.createEvent);
router.get("/", auth(["lawyer", "admin"]), eventController.getEvents);

module.exports = router;
