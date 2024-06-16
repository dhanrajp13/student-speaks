import Feedback from "../models/feedback.js";

export const giveFeedback = async (req, res, next) => {
  const formData = req.body;
  try {
    const feedback = new Feedback(formData);
    await feedback.save();
    res.status(201).json({ message: "feedback submitted" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getFeedbacks = async (req, res) => {
    try {
        // Fetch all feedbacks from the database
        const feedbacks = await Feedback.find({});

        // Respond with the feedbacks
        res.status(200).json(feedbacks);
    } catch (error) {
        console.error('Error fetching feedbacks:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};
