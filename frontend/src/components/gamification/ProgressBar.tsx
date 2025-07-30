import React from 'react';

interface Props {
  current: number;
  total: number;
  label: string;
  color?: string;
}

export const ProgressBar: React.FC<Props> = ({
  current,
  total,
  label,
  color = 'bg-green-500'
}) => {
  const pct = Math.min((current / total) * 100, 100);
  const isComplete = pct === 100;

  return (
    <div className="relative">
      <div className="flex justify-between items-center mb-3">
        <span className="text-sm font-bold text-gray-700">{label}</span>
        <span className={`text-sm font-bold ${isComplete ? 'text-green-600' : 'text-gray-600'}`}>
          {Math.round(pct)}%{isComplete && ' ✨'}
        </span>
      </div>
      
      <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden shadow-inner">
        <div 
          className={`h-full rounded-full ${color} transition-all duration-1000 ease-out`}
          style={{ width: `${pct}%` }}
        />
        
        <div
          className="absolute top-1/2 w-3 h-3 bg-white rounded-full shadow-lg transform -translate-y-1/2 border-2 border-gray-300 transition-all duration-1000 ease-out"
          style={{ left: `calc(${pct}% - 6px)` }}
        />
      </div>
      
      <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
        <span>{current}</span>
        <span>{total}</span>
      </div>
    </div>
  );
};
