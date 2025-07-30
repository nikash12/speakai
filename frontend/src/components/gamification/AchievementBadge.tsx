import React, { useState } from 'react';
import { motion } from 'framer-motion';
import type { Achievement } from '../../types/gamification';

interface AchievementBadgeProps {
  achievement: Achievement;
  size?: 'small' | 'medium' | 'large';
}

export const AchievementBadge: React.FC<AchievementBadgeProps> = ({
  achievement,
  size = 'medium'
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const sizeClasses = {
    small: 'p-3',
    medium: 'p-4',
    large: 'p-6'
  };

  const iconSizes = {
    small: 'text-xl',
    medium: 'text-2xl',
    large: 'text-3xl'
  };

  const getRarityGradient = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'from-yellow-400 via-orange-500 to-red-500';
      case 'epic': return 'from-purple-400 via-pink-500 to-purple-600';
      case 'rare': return 'from-blue-400 via-cyan-500 to-blue-600';
      default: return 'from-gray-400 via-gray-500 to-gray-600';
    }
  };

  return (
    <motion.div
      className={`
        relative group cursor-pointer transition-all duration-300 mb-2 rounded-xl overflow-hidden
        ${achievement.unlocked 
          ? `bg-gradient-to-r ${getRarityGradient(achievement.rarity)} shadow-lg` 
          : 'bg-gray-100 opacity-60'
        }
        ${sizeClasses[size]}
      `}
      whileHover={{ 
        scale: 1.05, 
        y: -2,
        rotateY: achievement.unlocked ? 5 : 0
      }}
      whileTap={{ scale: 0.98 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {achievement.unlocked && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-white/20"
          animate={{ 
            x: isHovered ? ['-100%', '100%'] : '-100%'
          }}
          transition={{ 
            duration: 1.5,
            ease: "easeInOut"
          }}
        />
      )}

      {!achievement.unlocked && (
        <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px] rounded-xl flex items-center justify-center">
          <motion.div
            className="text-2xl"
            animate={{ 
              rotate: [0, 10, -10, 0]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            🔒
          </motion.div>
        </div>
      )}

      <div className="flex items-center gap-4 relative z-10">
        <motion.div 
          className={`
            flex items-center justify-center rounded-full bg-white/20 backdrop-blur-sm
            w-12 h-12 ${iconSizes[size]}
          `}
          animate={achievement.unlocked ? { 
            rotate: isHovered ? [0, 15, -15, 0] : 0,
            scale: isHovered ? 1.1 : 1
          } : {}}
          transition={{ duration: 0.5 }}
        >
          <span className="select-none filter drop-shadow-lg">
            {achievement.unlocked ? achievement.icon : '❓'}
          </span>
        </motion.div>
        
        <div className="flex-1 min-w-0">
          <motion.div 
            className={`font-semibold mb-1 truncate ${
              achievement.unlocked ? 'text-white' : 'text-gray-600'
            }`}
            animate={achievement.unlocked ? {
              textShadow: isHovered ? '0 0 8px rgba(255,255,255,0.8)' : '0 0 4px rgba(0,0,0,0.3)'
            } : {}}
          >
            {achievement.title}
          </motion.div>
          
          <div className={`text-sm mb-1 ${
            achievement.unlocked ? 'text-white/90' : 'text-gray-500'
          }`}>
            {achievement.description}
          </div>

          <div className="flex items-center gap-2">
            <span className={`
              px-2 py-1 rounded-full text-xs font-bold uppercase tracking-wide
              ${achievement.unlocked 
                ? 'bg-white/20 text-white' 
                : 'bg-gray-200 text-gray-600'
              }
            `}>
              {achievement.rarity}
            </span>
            
            {achievement.unlocked && achievement.unlockedAt && (
              <motion.div 
                className="text-xs text-white/70"
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered ? 1 : 0.7 }}
              >
                {achievement.unlockedAt.toLocaleDateString()}
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {achievement.unlocked && (
        <motion.div
          className={`
            absolute -inset-1 rounded-xl opacity-50 blur-sm
            bg-gradient-to-r ${getRarityGradient(achievement.rarity)}
          `}
          animate={{
            opacity: isHovered ? 0.8 : 0.3,
            scale: isHovered ? 1.05 : 1
          }}
          style={{ zIndex: -1 }}
        />
      )}
    </motion.div>
  );
};
