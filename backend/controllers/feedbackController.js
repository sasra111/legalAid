const CaseFeedback = require('../models/CaseFeedback');


exports.submitCaseFeedback = async (req, res) => {
  try {
    const { caseType, searchQuery, isHappy } = req.body;
    const lawyerId = req.user._id; 
    const feedback = new CaseFeedback({
      lawyerId,
      caseType,
      searchQuery,
      isHappy
    });

    await feedback.save();

    res.status(201).json({
      success: true,
      message: 'Feedback submitted successfully',
      data: feedback
    });
  } catch (error) {
    console.error('Error submitting feedback:', error);
    res.status(500).json({
      success: false,
      message: 'Error submitting feedback',
      error: error.message
    });
  }
};


exports.getFeedbackStats = async (req, res) => {
  try {
    const stats = await CaseFeedback.aggregate([
      {
        $group: {
          _id: null,
          totalFeedback: { $sum: 1 },
          happyCount: {
            $sum: { $cond: ['$isHappy', 1, 0] }
          },
          sadCount: {
            $sum: { $cond: ['$isHappy', 0, 1] }
          }
        }
      }
    ]);

    const result = stats.length > 0 ? stats[0] : {
      totalFeedback: 0,
      happyCount: 0,
      sadCount: 0
    };

    res.status(200).json({
      success: true,
      data: {
        total: result.totalFeedback,
        happy: result.happyCount,
        sad: result.sadCount,
        happyPercentage: result.totalFeedback > 0 
          ? ((result.happyCount / result.totalFeedback) * 100).toFixed(2)
          : 0,
        sadPercentage: result.totalFeedback > 0
          ? ((result.sadCount / result.totalFeedback) * 100).toFixed(2)
          : 0
      }
    });
  } catch (error) {
    console.error('Error fetching feedback statistics:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching feedback statistics',
      error: error.message
    });
  }
};


exports.getAllFeedback = async (req, res) => {
  try {
    const feedback = await CaseFeedback.find()
      .populate('lawyerId', 'name email')
      .sort({ createdAt: -1 })
      .limit(100);

    res.status(200).json({
      success: true,
      count: feedback.length,
      data: feedback
    });
  } catch (error) {
    console.error('Error fetching feedback:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching feedback',
      error: error.message
    });
  }
};