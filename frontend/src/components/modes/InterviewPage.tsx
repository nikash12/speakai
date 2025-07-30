import { indexSchema, questions } from '@/recoil';
import generateGameQuestions from '@/utils/generateGameQuestions';
import React, { useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

interface Mode {
  id: string;
  title: string;
  description: string;
  icon: string;
  difficulty: 'easy' | 'medium' | 'hard' | 'expert';
  difficultyLevel: number;
  estimated: string;
  xp: number;
  unlocked: boolean;
  required?: number;
  features: string[];
  popularity: number;
  completions: number;
}

const modes: Mode[] = [
  {
    id: 'friendly',
    title: 'Friendly Chat',
    description: 'Perfect for beginners! Gentle questions with helpful hints.',
    icon: '😊',
    difficulty: 'easy',
    difficultyLevel: 1,
    estimated: '15-20 min',
    xp: 1,
    unlocked: true,
    features: ['Hints', 'Encouragement', 'Relaxed pace', 'Basic questions'],
    popularity: 92,
    completions: 15420
  },
  {
    id: 'professional',
    title: 'Professional',
    description: 'Real-world interview experience with industry questions.',
    icon: '💼',
    difficulty: 'medium',
    difficultyLevel: 2,
    estimated: '25-35 min',
    xp: 1.5,
    unlocked: true,
    features: ['Industry questions', 'Professional tone', 'Real scenarios', 'Detailed feedback'],
    popularity: 96,
    completions: 8750
  },
  {
    id: 'strict',
    title: 'Strict Examiner',
    description: 'Challenge yourself with demanding questions.',
    icon: '🎯',
    difficulty: 'hard',
    difficultyLevel: 4,
    estimated: '35-45 min',
    xp: 2,
    unlocked: true,
    required: 3,
    features: ['Challenging questions', 'Follow-up probing', 'High standards', 'No hints'],
    popularity: 87,
    completions: 3210
  },
  {
    id: 'boss',
    title: 'Boss Level',
    description: 'The ultimate test for interview masters.',
    icon: '🔥',
    difficulty: 'expert',  
    difficultyLevel: 5,
    estimated: '45-60 min',
    xp: 3,
    unlocked: false,
    required: 5,
    features: ['Expert questions', 'Time pressure', 'Complex scenarios', 'Zero mercy'],
    popularity: 94,
    completions: 890
  }
];

// Memoized components to prevent unnecessary re-renders
const ModeCard = React.memo<{
  mode: Mode;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onStart: (mode: Mode) => void;
}>(({ mode, isSelected, onSelect, onStart }) => {
  // Memoized difficulty color calculation
  const diffColor = useMemo(() => {
    const colors = {
      easy: 'bg-green-500',
      medium: 'bg-yellow-500', 
      hard: 'bg-orange-500',
      expert: 'bg-red-500'
    };
    return colors[mode.difficulty];
  }, [mode.difficulty]);
  const navigate = useNavigate()
  const setQuestion = useSetRecoilState(questions);
  const setIndex = useSetRecoilState(indexSchema);
  const [loading,setLoading] = useState(false)
  // Stable callback references
  const handleSelect = useCallback(() => onSelect(mode.id), [mode.id, onSelect]);
  const handleStart = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    const data = {
      mode:mode.id
    }
    setLoading(true)
    generateGameQuestions({data}).then((res)=>{
      console.log(res);
      setQuestion(res)
      setIndex(0)
    }
    ).then(()=>navigate('/live'))
    .finally(()=>setLoading(false))
  

    onStart(mode);
  }, [mode, onStart]);

  return (
    <div
      className={`relative cursor-pointer transition-transform duration-200 ${
        isSelected ? 'scale-105' : 'hover:scale-102'
      } ${!mode.unlocked ? 'opacity-70' : ''}`}
      onClick={handleSelect}
    >
      <div className={`bg-gray-800 rounded-2xl p-6 border-2 ${
        isSelected ? 'border-purple-400' : 'border-gray-700'
      } transition-colors duration-200`}>
        
        {/* Lock overlay - simplified */}
        {!mode.unlocked && (
          <div className="absolute inset-0 bg-black/70 rounded-2xl flex flex-col items-center justify-center">
            <div className="text-4xl mb-2">🔒</div>
            <div className="text-lg font-bold">Level {mode.required} Required</div>
          </div>
        )}

        {/* Header - simplified */}
        <div className="flex items-center gap-4 mb-4">
          <span className="text-4xl">{mode.icon}</span>
          <div>
            <h3 className="text-xl font-bold text-white">{mode.title}</h3>
            <div className="flex items-center gap-2 mt-1">
              <div className="flex gap-1">
                {Array.from({ length: 5 }, (_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full ${
                      i < mode.difficultyLevel ? diffColor : 'bg-gray-600'
                    }`}
                  />
                ))}
              </div>
              <span className={`text-xs px-2 py-1 rounded ${diffColor} text-white font-bold uppercase`}>
                {mode.difficulty}
              </span>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-300 text-sm mb-4">{mode.description}</p>

        {/* Basic info */}
        <div className="flex gap-4 text-xs text-gray-400 mb-4">
          <span>⏰ {mode.estimated}</span>
          <span>⚡ {mode.xp}× XP</span>
          <span>👥 {mode.completions.toLocaleString()}</span>
        </div>

        {/* Features - simplified */}
        <div className="grid grid-cols-2 gap-1 text-xs mb-4">
          {mode.features.map((feature, i) => (
            <div key={i} className="flex items-center gap-1 text-gray-300">
              <span className="text-green-400">✓</span>
              {feature}
            </div>
          ))}
        </div>

        {/* Action button */}
        {mode.unlocked && (
          <button
            onClick={handleStart}
            className={`w-full py-3 rounded-lg ${diffColor} text-white font-bold hover:scale-105 transition-transform duration-200`}
          >
            🚀 Start {mode.title}
          </button>
        )}
      </div>
    </div>
  );
});

ModeCard.displayName = 'ModeCard';

// Main component
export const InterviewPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selectedMode, setSelectedMode] = useState<string | null>(null);

  // Debounced search to prevent excessive filtering
  const [debouncedSearch, setDebouncedSearch] = useState('');
  React.useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 300);
    return () => clearTimeout(timer);
  }, [search]);

  // Memoized filtered modes
  const filteredModes = useMemo(() => 
    modes.filter(mode =>
      mode.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      mode.description.toLowerCase().includes(debouncedSearch.toLowerCase())
    ), [debouncedSearch]
  );

  // Stable callback references
  const handleModeSelect = useCallback((id: string) => {
    setSelectedMode(prev => prev === id ? null : id);
  }, []);

  const handleStartInterview = useCallback((mode: Mode) => {
    if (!mode.unlocked) return;
    alert(`Starting ${mode.title} interview! 🚀`);
  }, []);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  }, []);

  const clearSearch = useCallback(() => {
    setSearch('');
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 text-white">
      
      {/* Simplified header */}
      <div className="max-w-5xl mx-auto px-8 pt-20 pb-16 text-center">
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
          Choose Your Challenge
        </h1>
        <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
          Master your interview skills with AI-powered practice sessions.
        </p>

        {/* Simplified features */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          {[
            { icon: '🤖', text: 'AI-Powered' },
            { icon: '📊', text: 'Real-time Feedback' },
            { icon: '🎯', text: 'Skill Tracking' },
            { icon: '🏆', text: 'Gamified XP' }
          ].map((feature, i) => (
            <div key={i} className="bg-white/10 rounded-lg p-4 text-center">
              <div className="text-2xl mb-1">{feature.icon}</div>
              <div className="text-sm font-medium">{feature.text}</div>
            </div>
          ))}
        </div>

        {/* Optimized search */}
        <div className="relative max-w-md mx-auto">
          <input
            type="text"
            placeholder="🔍 Search modes..."
            value={search}
            onChange={handleSearchChange}
            className="w-full px-6 py-3 bg-white/20 border border-white/30 rounded-xl 
                       text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          {search && (
            <button
              onClick={clearSearch}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Modes grid - optimized */}
      <div className="max-w-5xl mx-auto px-8 pb-20">
        {filteredModes.length ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredModes.map(mode => (
              <ModeCard
                key={mode.id}
                mode={mode}
                isSelected={selectedMode === mode.id}
                onSelect={handleModeSelect}
                onStart={handleStartInterview}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-semibold mb-4">No modes found</h3>
            <button
              onClick={clearSearch}
              className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-medium transition-colors"
            >
              Clear Search
            </button>
          </div>
        )}
      </div>

      {/* Simplified CTA */}
      <div className="bg-gradient-to-r from-purple-800/60 to-pink-800/60 py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Start?</h2>
        <p className="text-gray-300 mb-6">Join thousands mastering interviews with AI.</p>
        <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-xl transition-colors">
          🚀 Get Started
        </button>
      </div>
    </div>
  );
};
