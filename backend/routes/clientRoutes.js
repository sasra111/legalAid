const express = require("express");
const router = express.Router();
const clientController = require("../controllers/clientController");
const auth = require("../middleware/auth");

// All routes require lawyer role
router.get("/", auth(["lawyer", "admin"]), clientController.getClients);
router.post("/", auth(["lawyer", "admin"]), clientController.addClient);

module.exports = router;
