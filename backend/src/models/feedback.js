import mongoose from "mongoose";

const FeedbackSchema = new mongoose.Schema({
  course: {
    type: String,
    required: true,
  },
  rating: {
    type: String,
    required: true,
  },
  feedback: {
    type: String,
    required: true,
  },
  roll:{
    type:String,
    required:true,
  }
});
 const Feedback = mongoose.model("Feedback", FeedbackSchema);

 export default Feedback;
