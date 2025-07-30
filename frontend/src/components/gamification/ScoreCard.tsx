import React from 'react';
import { motion } from 'framer-motion';
import type { InterviewScore } from '../../types/gamification';

interface Props { 
  scores: InterviewScore[]; 
  title: string; 
}

export const ScoreCard: React.FC<Props> = ({ scores, title }) => {
  const last = scores[scores.length - 1];
  const avg = scores.reduce((a, s) => a + s.overall, 0) / scores.length;

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-orange-500';
    return 'text-red-500';
  };

  const getProgressColor = (score: number) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-orange-500';
    return 'bg-red-500';
  };

  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 relative overflow-hidden h-full">
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full -translate-y-16 translate-x-16" />
      
      <motion.h3 
        className="text-lg font-semibold text-gray-800 mb-6 relative z-10"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        {title}
      </motion.h3>
      
      <div className="grid grid-cols-3 gap-4 mb-6">
        <motion.div 
          className="text-center p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl cursor-pointer relative overflow-hidden"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <motion.div 
            className={`text-3xl font-bold mb-2 ${getScoreColor(last?.overall || 0)}`}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            {last?.overall || 0}
          </motion.div>
          <div className="text-xs text-gray-600 uppercase tracking-wide font-medium">Latest Score</div>
        </motion.div>

        <motion.div 
          className="text-center p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl cursor-pointer"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className={`text-3xl font-bold mb-2 ${getScoreColor(avg)}`}>
            {Math.round(avg) || 0}
          </div>
          <div className="text-xs text-gray-600 uppercase tracking-wide font-medium">Average Score</div>
        </motion.div>

        <motion.div 
          className="text-center p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl cursor-pointer"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="text-3xl font-bold mb-2 text-gray-800">
            {scores.length}
          </div>
          <div className="text-xs text-gray-600 uppercase tracking-wide font-medium">Total Interviews</div>
        </motion.div>
      </div>
      
      {last && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <h4 className="text-sm font-medium text-gray-700 mb-3">Skill Breakdown</h4>
          
          {[
            { name: 'Technical', score: last.technical },
            { name: 'Communication', score: last.communication },
            { name: 'Problem Solving', score: last.problemSolving }
          ].map((skill, index) => (
            <motion.div 
              key={skill.name}
              className="flex items-center gap-4 py-3 px-2 rounded-lg hover:bg-gray-50/50 transition-colors"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <span className="min-w-[120px] text-sm font-medium text-gray-700">
                {skill.name}
              </span>
              
              <div className="flex-1 relative">
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div 
                    className={`h-full rounded-full ${getProgressColor(skill.score)} relative`}
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.score}%` }}
                    transition={{ duration: 1, ease: "easeOut", delay: index * 0.1 }}
                  />
                </div>
              </div>
              
              <motion.span 
                className="min-w-[45px] text-right font-bold text-gray-800 text-sm"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                {skill.score}%
              </motion.span>
            </motion.div>
          ))}
        </motion.div>
      )}

      <motion.div
        className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <h4 className="text-sm font-semibold text-gray-800 mb-2">💡 Quick Insight</h4>
        <p className="text-xs text-gray-600">
          {avg >= 80 
            ? "Excellent work! You're consistently performing at a high level. 🌟" 
            : avg >= 60 
            ? "Good progress! Focus on your weaker areas to reach the next level. 📈"
            : "Keep practicing! Every interview is a step towards improvement. 💪"
          }
        </p>
      </motion.div>
    </div>
  );
};
