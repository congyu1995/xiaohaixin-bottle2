import React from 'react';
import { Category } from '../types/mood';

interface EmptyStateProps {
  category: Category;
  onPublish: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ category, onPublish }) => {
  const getMessage = () => {
    if (category === '全部') {
      return '大海里还没有任何心情';
    }
    return `大海里还没有${category}的心情`;
  };

  return (
    <div className="empty-state">
      <div className="empty-icon">🌊</div>
      <div className="empty-message">{getMessage()}</div>
      <div className="empty-hint">来投递第一只漂流瓶吧~</div>
      <button className="empty-publish-btn" onClick={onPublish}>
        + 投递心情
      </button>
    </div>
  );
};
