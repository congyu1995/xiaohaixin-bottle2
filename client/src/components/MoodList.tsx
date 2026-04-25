import React from 'react';
import { Mood } from '../types/mood';
import { MoodCard } from './MoodCard';

interface MoodListProps {
  moods: Mood[];
  hasResonanced: (moodId: string) => boolean;
  hasReported: (moodId: string) => boolean;
  onToggleResonance: (moodId: string) => void;
  onReport: (moodId: string) => void;
}

export const MoodList: React.FC<MoodListProps> = ({
  moods,
  hasResonanced,
  hasReported,
  onToggleResonance,
  onReport,
}) => {
  return (
    <div className="mood-list">
      {moods.map(mood => (
        <MoodCard
          key={mood.id}
          mood={mood}
          hasResonanced={hasResonanced(mood.id)}
          hasReported={hasReported(mood.id)}
          onToggleResonance={() => onToggleResonance(mood.id)}
          onReport={() => onReport(mood.id)}
        />
      ))}
    </div>
  );
};
