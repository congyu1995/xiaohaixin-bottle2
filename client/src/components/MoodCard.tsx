import React, { useState } from 'react';
import { Mood } from '../types/mood';
import { formatTime, getCategoryColor, getCategoryBgColor } from '../utils/dataUtils';

interface MoodCardProps {
  mood: Mood;
  hasResonanced: boolean;
  hasReported: boolean;
  onToggleResonance: () => void;
  onReport: () => void;
}

export const MoodCard: React.FC<MoodCardProps> = ({
  mood,
  hasResonanced,
  hasReported,
  onToggleResonance,
  onReport,
}) => {
  const [showConfirmReport, setShowConfirmReport] = useState(false);

  const handleReport = () => {
    if (hasReported) return;
    setShowConfirmReport(true);
  };

  const confirmReport = () => {
    onReport();
    setShowConfirmReport(false);
  };

  const categoryColor = getCategoryColor(mood.category);
  const categoryBgColor = getCategoryBgColor(mood.category);

  return (
    <div className="mood-card">
      <div className="mood-header">
        <span className="mood-nickname">{mood.nickname}</span>
        <span className="mood-time">{formatTime(mood.createdAt)}</span>
      </div>
      
      <div className="mood-content">
        {mood.content}
      </div>
      
      <div className="mood-footer">
        <div className="mood-meta">
          <span 
            className="mood-category" 
            style={{ 
              backgroundColor: categoryBgColor, 
              color: categoryColor 
            }}
          >
            {mood.category}
          </span>
          <span className="mood-stats">
            共鸣 {mood.resonanceCount} · 浏览 {mood.viewCount}
          </span>
          {mood.isReported && (
            <span className="reported-tag">已举报</span>
          )}
        </div>
        
        <div className="mood-actions">
          <button
            className={`resonance-btn ${hasResonanced ? 'active' : ''}`}
            onClick={onToggleResonance}
          >
            {hasResonanced ? '❤️' : '🤍'} 共鸣 {mood.resonanceCount}
          </button>
          
          <button
            className={`report-btn ${hasReported ? 'disabled' : ''}`}
            onClick={handleReport}
            disabled={hasReported}
          >
            {hasReported ? '已举报' : '举报'}
          </button>
        </div>
      </div>

      {/* 举报确认弹窗 */}
      {showConfirmReport && (
        <div className="confirm-modal">
          <div className="confirm-content">
            <p>确定举报此内容吗？</p>
            <p className="confirm-hint">我们会尽快处理</p>
            <div className="confirm-actions">
              <button 
                className="cancel-btn"
                onClick={() => setShowConfirmReport(false)}
              >
                取消
              </button>
              <button 
                className="confirm-btn"
                onClick={confirmReport}
              >
                确定
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
