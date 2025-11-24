const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController');
const auth = require("../middleware/auth");

// Lawyer can submit feedback
router.post("/case", auth(["lawyer"]), feedbackController.submitCaseFeedback);

// Admin only routes
router.get('/stats', auth(["admin"]), feedbackController.getFeedbackStats);
router.get('/all', auth(["admin"]), feedbackController.getAllFeedback);
    
module.exports = router;