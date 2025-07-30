import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  username: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true }, // Store hashed password
  xp: { type: Number, default: 0 },
  level: { type: Number, default: 1 },
  totalGamesPlayed: { type: Number, default: 0 },
  sessions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Session' }],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('User', userSchema);
