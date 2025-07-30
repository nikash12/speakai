import Session from '../models/session.model.js';
import { updateUserProgress } from '../utils/updateUserProgress.js';

export const endSession = async (req, res) => {
  try {
    const { userId, score } = req.body;

    if (!userId || score == null) {
      return res.status(400).json({ message: 'Missing userId or score' });
    }

    const session = new Session({ user: userId, score });
    await session.save();

    await updateUserProgress(userId, score);

    res.status(201).json({ message: 'Session ended successfully', session });
  } catch (err) {
    console.error('End session error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
