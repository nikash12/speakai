import React, { useState } from 'react';

// Daily Challenge Component
const DailyChallenge: React.FC = () => {
  const [progress, setProgress] = useState(1);
  return (
    <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-6 text-white">
      <h3 className="text-lg font-bold mb-4">🔥 Today's Challenge</h3>
      <div className="bg-white/20 rounded-xl p-4">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-2xl">💪</span>
          <div>
            <div className="font-bold">Monday Motivation</div>
            <div className="text-sm">Complete 2 interviews today</div>
          </div>
        </div>
        
        <div className="mb-3">
          <div className="bg-white/30 rounded-full h-2">
            <div className="bg-white rounded-full h-2 w-1/2" />
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-xs">🎁 50 XP + Badge</span>
          <button className="bg-white/30 px-3 py-1 rounded-full text-xs">
            1/2 Done
          </button>
        </div>
      </div>
    </div>
  );
};

// Leaderboard Component
const WeeklyLeaderboard: React.FC = () => {
  const leaders = [
    { rank: 1, name: "Alex Chen", score: 2850, avatar: "👑" },
    { rank: 2, name: "Sarah Kim", score: 2720, avatar: "🔥" },
    { rank: 3, name: "You", score: 2680, avatar: "⭐", isUser: true },
    { rank: 4, name: "Mike Ross", score: 2540, avatar: "💎" }
  ];

  return (
    <div className="bg-white/95 rounded-2xl p-6">
      <h3 className="text-lg font-bold mb-4">🏆 Weekly Champions</h3>
      <div className="space-y-2">
        {leaders.map((leader) => (
          <div key={leader.rank} className={`flex items-center gap-3 p-3 rounded-lg ${
            leader.isUser ? 'bg-purple-100 border border-purple-300' : 'bg-gray-50'
          }`}>
            <span className="text-xl">{leader.avatar}</span>
            <div className="flex-1">
              <div className="font-medium">{leader.name}</div>
              <div className="text-sm text-gray-600">{leader.score} XP</div>
            </div>
            <div className="font-bold">#{leader.rank}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Rewards Shop Component
const RewardsShop: React.FC = () => {
  const rewards = [
    { name: "Golden Badge", cost: 500, icon: "🏆" },
    { name: "Custom Avatar", cost: 300, icon: "🎭" },
    { name: "Streak Shield", cost: 200, icon: "🛡️" },
    { name: "Boss Unlock", cost: 800, icon: "⚔️" }
  ];

  return (
    <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl p-6 text-white">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold">💎 Rewards Shop</h3>
        <div className="bg-white/20 px-3 py-1 rounded-full text-sm">
          🪙 1,250
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        {rewards.map((reward, index) => (
          <div key={index} className="bg-white/20 rounded-lg p-3 text-center">
            <div className="text-xl mb-1">{reward.icon}</div>
            <div className="text-xs font-bold mb-1">{reward.name}</div>
            <div className="text-xs">🪙 {reward.cost}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Main Advanced Dashboard
export const AdvancedDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-600 to-purple-800 p-8">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-white mb-4">
          🎮 Advanced Features
        </h1>
        <p className="text-xl text-white/80">
          Challenges, rewards, and competition!
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid gap-8">
        
        {/* Row 1: Challenge + Leaderboard */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <DailyChallenge />
          <WeeklyLeaderboard />
        </div>

        {/* Row 2: Rewards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <RewardsShop />
          
          {/* Live Activity */}
          <div className="bg-white/10 rounded-2xl p-6 text-white">
            <h3 className="text-lg font-bold mb-4">🔴 Live Activity</h3>
            <div className="space-y-2 text-sm">
              <div>💼 Sarah completed Professional - 95%!</div>
              <div>🔥 Mike achieved 10-day streak!</div>
              <div>⚔️ Emma unlocked Boss Level!</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
