import mongoose from 'mongoose';

const sessionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  score: { type: Number },
  feedbackGiven: { type: String, default: false }
});


export default mongoose.model('Session', sessionSchema);
