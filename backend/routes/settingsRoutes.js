const express = require("express");
const router = express.Router();
const settingsController = require("../controllers/settingsController");
const auth = require("../middleware/auth");

// Change password
router.post("/change-password", auth, settingsController.changePassword);
// Change email
router.post("/change-email", auth, settingsController.changeEmail);

module.exports = router;
