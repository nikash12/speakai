export interface UserProgress {
  level: number;
  xp: number;
  xpToNextLevel: number;
  totalInterviews: number;
  streak: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: Date;
  category: 'milestone' | 'streak';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export interface InterviewScore {
  technical: number;
  communication: number;
  problemSolving: number;
  overall: number;
  timestamp: Date;
}

export interface GamificationState {
  userProgress: UserProgress;
  achievements: Achievement[];
  recentScores: InterviewScore[];
  streakData: number[];
  skillProgress: { [k: string]: number };
}
