const mongoose = require('mongoose');

const caseFeedbackSchema = new mongoose.Schema({
  lawyerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  caseType: {
    type: String,
    enum: ['contract', 'constitutional'],
    required: true
  },
  searchQuery: {
    cause_of_action: String,
    subject_matter: String,
    key_facts: String
  },
  isHappy: {
    type: Boolean,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('CaseFeedback', caseFeedbackSchema);