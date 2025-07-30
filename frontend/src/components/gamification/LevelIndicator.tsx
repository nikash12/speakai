import React from 'react';
import type { UserProgress } from '../../types/gamification';

interface Props { 
  userProgress: UserProgress; 
}

export const LevelIndicator: React.FC<Props> = ({ userProgress }) => {
  const nextLevelPct = (userProgress.xp / (userProgress.xp + userProgress.xpToNextLevel)) * 100;
  const circumference = 440;
  const offset = circumference - (circumference * nextLevelPct) / 100;

  return (
    <div className="text-center space-y-6">
      <div className="relative mx-auto w-40 h-40">
        <svg width={160} height={160} className="-rotate-90">
          <circle 
            cx="80" cy="80" r="70" 
            stroke="#e5e7eb" strokeWidth="12" 
            fill="none" 
          />
          
          <circle
            cx="80" cy="80" r="70"
            stroke="url(#progressGradient)" strokeWidth="12"
            fill="none" strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="transition-all duration-1000 ease-out"
          />

          <defs>
            <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8B5CF6" />
              <stop offset="50%" stopColor="#EC4899" />
              <stop offset="100%" stopColor="#06B6D4" />
            </linearGradient>
          </defs>
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
            {userProgress.level}
          </div>
          <div className="text-sm font-semibold text-gray-600">LEVEL</div>
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="text-2xl font-bold">
          <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            {userProgress.xp}
          </span>
          <span className="text-gray-400 mx-2">/</span>
          <span className="bg-gradient-to-r from-gray-600 to-gray-700 bg-clip-text text-transparent">
            {userProgress.xp + userProgress.xpToNextLevel}
          </span>
          <span className="text-gray-500 text-lg ml-1">XP</span>
        </div>
        
        <div className="text-sm text-gray-600 font-medium">
          {userProgress.xpToNextLevel} XP to Level {userProgress.level + 1}
        </div>

        <div className="w-40 h-3 bg-gray-200 rounded-full overflow-hidden mx-auto">
          <div
            className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-full transition-all duration-1000 ease-out"
            style={{ width: `${nextLevelPct}%` }}
          />
        </div>
      </div>
    </div>
  );
};
