const express = require("express");
const router = express.Router();
const clientController = require("../controllers/clientController");
const auth = require("../middleware/auth");

// All routes require lawyer role

// All routes require lawyer or admin role
router.get("/", auth(["lawyer", "admin"]), clientController.getClients);
router.post("/", auth(["lawyer", "admin"]), clientController.addClient);
router.put("/:id", auth(["lawyer", "admin"]), clientController.editClient);
router.delete("/:id", auth(["lawyer", "admin"]), clientController.deleteClient);
router.patch(
  "/:id/hold",
  auth(["lawyer", "admin"]),
  clientController.holdClient
);

module.exports = router;
