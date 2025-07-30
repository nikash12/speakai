import type {
  UserProgress,
  Achievement,
  InterviewScore
} from '../types/gamification';

export function checkAchievements(
  user: UserProgress,
  current: Achievement[],
  scores: InterviewScore[]
): { achievements: Achievement[]; newUnlocks: Achievement[] } {
  const updated = current.map(a => {
    if (a.id === 'streak_master' && user.streak >= 7 && !a.unlocked) {
      return { ...a, unlocked: true, unlockedAt: new Date() };
    }
    if (a.id === 'level_up' && user.level >= 5 && !a.unlocked) {
      return { ...a, unlocked: true, unlockedAt: new Date() };
    }
    if (a.id === 'boss_slayer' && user.totalInterviews >= 10 && !a.unlocked) {
      return { ...a, unlocked: true, unlockedAt: new Date() };
    }
    return a;
  });

  const newUnlocks = updated.filter(
    a => a.unlocked && !current.find(c => c.id === a.id)?.unlocked
  );

  return { achievements: updated, newUnlocks };
}

export function getRecommendations(
  user: UserProgress,
  skills: { [k: string]: number }
): string[] {
  const rec: string[] = [];
  if (user.streak < 3) rec.push('🔥 Try to keep a 3-day streak for bonus XP');
  if (skills.communication < 75) rec.push('💬 Communication is below 75 – practice behavioral questions');
  if (skills.technical < 80) rec.push('💻 Technical skills need work – try coding challenges');
  if (user.level < 5) rec.push('📈 Level up by completing more interviews');
  if (rec.length === 0) rec.push('🚀 Great work! Keep the momentum going!');
  return rec;
}

export function getPerformanceTrend(scores: InterviewScore[]) {
  if (scores.length < 2) return 'stable';
  const last = scores[scores.length - 1].overall;
  const prev = scores[scores.length - 2].overall;
  if (last > prev + 5) return 'improving';
  if (last < prev - 5) return 'declining';
  return 'stable';
}
