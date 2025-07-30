import React, { useState } from 'react';
import { GameificationDashboard } from './GameificationDashboard';
import { AdvancedDashboard } from './AdvancedDashboard';
import { InterviewPage } from '../modes/InterviewPage';

export const GameMain: React.FC = () => {
  const [page, setPage] = useState<'dashboard' | 'advanced' | 'interview'>('dashboard');

  return (
    <div className="min-h-screen">
      {/* Enhanced Navigation */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-black/30 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-white flex items-center gap-2">
              🎙️ <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">SpeakAI</span>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={() => setPage('dashboard')}
                className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                  page === 'dashboard'
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                    : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
                }`}>
                📊 Dashboard
              </button>
              
              <button
                onClick={() => setPage('advanced')}
                className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                  page === 'advanced'
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                    : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
                }`}>
                🎮 More
              </button>
              
              <button
                onClick={() => setPage('interview')}
                className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                  page === 'interview'
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                    : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
                }`}>
                🎯 Interview
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Page Content */}
      <main className="pt-20">
        {page === 'dashboard' && <GameificationDashboard />}
        {page === 'advanced' && <AdvancedDashboard />}
        {page === 'interview' && <InterviewPage />}
      </main>
    </div>
  );
};

export default GameMain;
