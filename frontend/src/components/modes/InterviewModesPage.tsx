import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Mode {
  id: string;
  title: string;
  description: string;
  icon: string;
  difficulty: 'easy' | 'medium' | 'hard' | 'expert';
  difficultyLevel: number;          /* 1-5 dots */
  estimatedTime: string;
  xpMultiplier: number;
  unlocked: boolean;
  requiredLevel?: number;
}

const modes: Mode[] = [
  {
    id: 'friendly',
    title: 'Friendly Chat',
    description: 'Gentle beginner questions',
    icon: '😊',
    difficulty: 'easy',
    difficultyLevel: 1,
    estimatedTime: '15 min',
    xpMultiplier: 1,
    unlocked: true
  },
  {
    id: 'pro',
    title: 'Professional',
    description: 'Real interview scenario',
    icon: '💼',
    difficulty: 'medium',
    difficultyLevel: 2,
    estimatedTime: '30 min',
    xpMultiplier: 1.5,
    unlocked: true
  },
  {
    id: 'boss',
    title: 'Boss Level',
    description: 'Only for the brave',
    icon: '🔥',
    difficulty: 'expert',
    difficultyLevel: 5,
    estimatedTime: '60 min',
    xpMultiplier: 3,
    unlocked: false,
    requiredLevel: 5
  }
];

/* card */
const Card: React.FC<{ m: Mode; onStart: () => void }> = ({ m, onStart }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="relative bg-gradient-to-br from-gray-900 to-gray-800
               p-6 rounded-2xl shadow-lg text-white space-y-3">
    {/* lock overlay */}
    {!m.unlocked && (
      <div className="absolute inset-0 bg-black/60 rounded-2xl flex flex-col
                      items-center justify-center text-center text-sm">
        <div className="text-4xl mb-2">🔒</div>
        Level {m.requiredLevel} required
      </div>
    )}

    <div className="text-4xl">{m.icon}</div>
    <h3 className="text-xl font-bold">{m.title}</h3>
    <p className="text-sm text-white/70">{m.description}</p>

    {/* difficulty dots */}
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className={`w-2 h-2 rounded-full
                      ${i < m.difficultyLevel ? 'bg-yellow-400' : 'bg-white/20'}`}
        />
      ))}
    </div>

    <div className="flex justify-between text-xs text-white/70">
      <span>⏱ {m.estimatedTime}</span>
      <span>⚡ {m.xpMultiplier}× XP</span>
    </div>

    <button
      disabled={!m.unlocked}
      onClick={onStart}
      className={`w-full mt-3 py-2 rounded-lg font-medium
                  ${m.unlocked
                    ? 'bg-purple-600 hover:bg-purple-700'
                    : 'bg-gray-600 cursor-not-allowed'}`
      }>
      {m.unlocked ? 'Start' : 'Locked'}
    </button>
  </motion.div>
);

export const InterviewModesPage: React.FC = () => {
  const [search, setSearch] = useState('');

  const list = useMemo(
    () =>
      modes.filter(
        m =>
          m.title.toLowerCase().includes(search.toLowerCase()) ||
          m.description.toLowerCase().includes(search.toLowerCase())
      ),
    [search]
  );

  return (
    <div className="min-h-screen bg-gradient-to-br
                    from-slate-900 via-purple-900 to-slate-900 p-8">
      <div className="max-w-4xl mx-auto">
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search modes..."
          className="w-full mb-8 px-5 py-3 rounded-2xl
                     bg-white/10 backdrop-blur-md text-white
                     placeholder-white/60 focus:outline-none"
        />

        <AnimatePresence mode="popLayout">
          {list.length ? (
            <motion.div
              layout
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {list.map(m => (
                <Card
                  key={m.id}
                  m={m}
                  onStart={() => console.log('start', m.id)}
                />
              ))}
            </motion.div>
          ) : (
            <motion.p
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-white/80">
              No modes found
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
