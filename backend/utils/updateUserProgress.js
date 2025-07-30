import User from '../models/user.model.js';

const XP_PER_POINT = 10; // customize this
const LEVEL_UP_XP = 1000; // XP needed to level up

export const updateUserProgress = async (userId, score) => {
  const user = await User.findById(userId);
  if (!user) return;

  const xpGain = score * XP_PER_POINT;
  user.xp += xpGain;
  user.totalGamesPlayed += 1;

  // Level up logic
  while (user.xp >= user.level * LEVEL_UP_XP) {
    user.level += 1;
  }

  await user.save();
};
