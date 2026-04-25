import React, { useState } from 'react';
import { Category } from '../types/mood';

interface PublishModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPublish: (content: string, category: '开心' | '焦虑' | '迷茫' | '吐槽') => void;
  canPublish: boolean;
  dailyCount: number;
}

const categories: Array<'开心' | '焦虑' | '迷茫' | '吐槽'> = ['开心', '焦虑', '迷茫', '吐槽'];

export const PublishModal: React.FC<PublishModalProps> = ({
  isOpen,
  onClose,
  onPublish,
  canPublish,
  dailyCount,
}) => {
  const [content, setContent] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'开心' | '焦虑' | '迷茫' | '吐槽'>('开心');
  const [showSuccess, setShowSuccess] = useState(false);

  const maxLength = 200;
  const remainingChars = maxLength - content.length;

  const handlePublish = () => {
    if (!content.trim()) return;
    if (!canPublish) return;

    onPublish(content.trim(), selectedCategory);
    setContent('');
    setSelectedCategory('开心');
    
    // 显示成功提示
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      onClose();
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        {!showSuccess ? (
          <>
            <div className="modal-header">
              <h3>投递心情</h3>
              <button className="close-btn" onClick={onClose}>✕</button>
            </div>
            
            <div className="modal-body">
              <div className="input-wrapper">
                <textarea
                  className="content-input"
                  placeholder="写下你的心情..."
                  value={content}
                  onChange={e => setContent(e.target.value.slice(0, maxLength))}
                  maxLength={maxLength}
                  rows={5}
                />
                <div className={`char-count ${remainingChars < 20 ? 'warning' : ''}`}>
                  {remainingChars}
                </div>
              </div>

              <div className="category-select">
                <label>选择分类：</label>
                <div className="category-options">
                  {categories.map(cat => (
                    <button
                      key={cat}
                      className={`category-option ${selectedCategory === cat ? 'active' : ''}`}
                      onClick={() => setSelectedCategory(cat)}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="modal-footer">
              {!canPublish && (
                <div className="publish-limit">
                  今日发布已达上限（{dailyCount}/10）
                </div>
              )}
              <button
                className="publish-btn"
                onClick={handlePublish}
                disabled={!content.trim() || !canPublish}
              >
                投递 🌊
              </button>
            </div>
          </>
        ) : (
          <div className="success-message">
            <div className="success-icon">🌊</div>
            <p>你的心情已漂向大海~</p>
          </div>
        )}
      </div>
    </div>
  );
};
