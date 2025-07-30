import React, { useState, useMemo } from 'react';
import type { GamificationState } from '../../types/gamification';

// Simple components with zero animations
const StatCard: React.FC<{
  icon: string;
  value: string | number;
  label: string;
  color: string;
}> = ({ icon, value, label, color }) => (
  <div className={`${color} rounded-lg p-4 text-center text-white`}>
    <div className="text-2xl mb-1">{icon}</div>
    <div className="text-xl font-bold">{value}</div>
    <div className="text-xs uppercase">{label}</div>
  </div>
);

const SimpleProgressBar: React.FC<{
  current: number;
  total: number;
  label: string;
  color: string;
}> = ({ current, total, label, color }) => {
  const percentage = Math.min((current / total) * 100, 100);
  
  return (
    <div className="mb-4">
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <span className="text-sm text-gray-600">{Math.round(percentage)}%</span>
      </div>
      <div className="bg-gray-200 rounded-full h-2">
        <div 
          className={`${color} h-2 rounded-full`}
          style={{width: `${percentage}%`}}
        />
      </div>
    </div>
  );
};

const AchievementCard: React.FC<{
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
}> = ({ title, description, icon, unlocked }) => (
  <div className={`p-4 rounded-lg border ${
    unlocked 
      ? 'bg-white border-green-200' 
      : 'bg-gray-100 border-gray-200 opacity-60'
  }`}>
    <div className="flex items-center gap-3">
      <span className="text-2xl">{unlocked ? icon : '🔒'}</span>
      <div>
        <div className="font-medium text-gray-800">{title}</div>
        <div className="text-xs text-gray-600">{description}</div>
      </div>
    </div>
  </div>
);

export const GameificationDashboard: React.FC = () => {
  const [state] = useState<GamificationState>({
    userProgress: { level: 3, xp: 2750, xpToNextLevel: 250, totalInterviews: 15, streak: 5 },
    achievements: [
      {
        id: 'first_interview', title: 'First Steps', description: 'Complete your first interview',
        icon: '🎯', unlocked: true, unlockedAt: new Date(), category: 'milestone', rarity: 'common'
      },
      {
        id: 'streak_master', title: 'Streak Master', description: 'Maintain a 7-day streak',
        icon: '🔥', unlocked: false, category: 'streak', rarity: 'rare'
      },
      {
        id: 'boss_slayer', title: 'Boss Slayer', description: 'Complete Boss Level interview',
        icon: '⚔️', unlocked: true, unlockedAt: new Date(), category: 'milestone', rarity: 'epic'
      }
    ],
    recentScores: [
      { technical: 85, communication: 78, problemSolving: 92, overall: 85, timestamp: new Date() },
      { technical: 90, communication: 85, problemSolving: 88, overall: 88, timestamp: new Date() }
    ],
    streakData: [],
    skillProgress: { technical: 82, communication: 70, problemSolving: 88 }
  });

  const avgScore = useMemo(() => 
    Math.round(state.recentScores.reduce((a, s) => a + s.overall, 0) / state.recentScores.length),
    [state.recentScores]
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-600 to-purple-800 p-6">
      
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-white mb-3">
          🎮 Your Journey
        </h1>
        <p className="text-lg text-white/80 mb-6">
          Level up your interview skills!
        </p>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <StatCard icon="🏆" value={state.userProgress.level} label="Level" color="bg-yellow-500" />
          <StatCard icon="🎯" value={`${avgScore}%`} label="Avg Score" color="bg-green-500" />
          <StatCard icon="🔥" value={state.userProgress.streak} label="Streak" color="bg-red-500" />
          <StatCard icon="📊" value={state.userProgress.totalInterviews} label="Interviews" color="bg-blue-500" />
        </div>
      </div>


      {/* Main Content */}
      <div className="grid gap-6 max-w-5xl mx-auto">
        
        {/* Skills */}
        <div className="bg-white/95 rounded-lg p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">🎯 Skills Progress</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: 'Technical', value: state.skillProgress.technical, icon: '💻', color: 'bg-blue-500' },
              { name: 'Communication', value: state.skillProgress.communication, icon: '💬', color: 'bg-green-500' },
              { name: 'Problem Solving', value: state.skillProgress.problemSolving, icon: '🧠', color: 'bg-purple-500' }
            ].map(skill => (
              <div key={skill.name} className="text-center">
                <div className="text-3xl mb-2">{skill.icon}</div>
                <div className="text-lg font-bold text-gray-800">{skill.value}%</div>
                <div className="text-sm text-gray-600">{skill.name}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Progress Bars */}
        <div className="bg-white/95 rounded-lg p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">📈 Goals</h3>
          <SimpleProgressBar 
            current={state.userProgress.streak} 
            total={7} 
            label="Weekly Streak" 
            color="bg-orange-500"
          />
          <SimpleProgressBar 
            current={state.userProgress.totalInterviews} 
            total={20} 
            label="Monthly Target" 
            color="bg-green-500"
          />
        </div>

        {/* Achievements */}
        <div className="bg-white/95 rounded-lg p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">🏆 Achievements</h3>
          <div className="grid gap-3">
            {state.achievements.map((achievement) => (
              <AchievementCard
                key={achievement.id}
                title={achievement.title}
                description={achievement.description}
                icon={achievement.icon}
                unlocked={achievement.unlocked}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="text-center mt-10">
        <button className="px-10 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-lg rounded-full hover:scale-105 transition-transform">
          🚀 Start Challenge
        </button>
      </div>
    </div>
  );
};
